import jsonwebtoken from "jsonwebtoken"; 
import bcrypt from "bcryptjs"; 
import crypto from "crypto"; 
import nodemailer from "nodemailer"; 
import { config } from "../../config.js";
import students from "../models/studentsModel.js";

const recoveryPasswordControllerStudents = {}

recoveryPasswordControllerStudents.requestCode = async (req, res) => {
    try {
        const { email } = req.body;
        const userFound = await students.findOne({ email });
        if(!userFound){
            return res.status(404).json({message: "user not found"})
        }
        const randomCode = crypto.randomBytes(3).toString("hex")
        const token = jsonwebtoken.sign(
            {email, randomCode, userType: "students", verified: false},
            config.JWT.secret,
            {expiresIn: "15m"},
        );

        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 *1000})

         const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
         })

         const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Código de recuperación",
            body: "El código expira en 15 minutos",
            text: "Para cambiar la contraseña usa el código; " + randomCode + " Expira en 15 minutos!"
         }

         transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                return res.status(500).json({message: "Error sending email"})
            }
         }) 

         return res.status(200).json({message: "Email sent"})

    } catch (error) {
        console.log("error" + error)
        return res.status(200).json({message: "Intrnal server error"})
    }
};

recoveryPasswordControllerStudents.verifyCode = async (req, res ) => {
    try {
        const { code } = req.body;
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        if(code !== decoded.randomCode){
            return res.status(400).json({message: "Invalid code"})
        }
        const newToken = jsonwebtoken.sign(
            { email: decoded.email, userType: "student", verified: true },
            config.JWT.secret,
            { expiresIn: "15m" },
        );
        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000});
        return res.status(200).json({message: "Code verified successfully"});

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
};

recoveryPasswordControllerStudents.newPassword = async (req, res) => {

    try {
        const { newPassword, confirmNewPassword } = req.body;

        if(newPassword !== confirmNewPassword){
            return res.stauts(400).json({message: "password doesn't match"})
        }
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        if(!decoded.verified){
            return res.status(400).json({message: "code not verified"})
        }
        //Encriptamos aca bien jaker
        const passwordHash = await bcrypt.hash(newPassword, 10)

        //Actualizamos la contra :O
        await students.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHash},
            {new: true},
        );

        res.clearCookie("recoveryCookie");

        return res.status(200).json({message: "Password update"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}; 

export default recoveryPasswordControllerStudents;