import nodemailer from "nodemailer"; 
import crypto from "crypto"; 
import jsonwebtoken from "jsonwebtoken"; 
import bcryptjs from "bcryptjs" 
import { config } from "../../config.js";
import studentsModel from "../models/studentsModel.js" 

 const registerStudentController = {};

 registerStudentController.register = async (req, res) => {
    const {
        name,
        lastName,
        email,
        password,
        birthdate,
        speciality_id,
        carnet,
        phone,
        isVerified,
    } = req.body;

    try {
        const exitsStudent = await studentsModel.findOne({ email });
        if (exitsStudent) {
            return res.status(400).json({ message: "Student Already Exists" });
        }
        const passwordHashed = await bcryptjs.hash(password, 10);
        const randomNumber = crypto.randomBytes(3).toString("hex")
        const token = jsonwebtoken.sign(
            {randomNumber,  
            name,
            lastName,
            email,
            password: passwordHashed,
            birthdate,
            speciality_id,
            carnet,
            phone,
            isVerified,  
            },
            config.JWT.secret,
            {expiresIn: "15m"}
        );

        res.cookie("Galleta", token, {maxAge: 15 * 60 * 1000})
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
            subject: "Verificación de cuenta",
            text: "Para verificar tu cuenta, utiliza este código: "
            + randomNumber + " expira en 15 minutos"
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("error " +  error)
                return res.status(500).json({message: "Error sending email"})
            }
            return res.status(200).json({message: "Email sent"})
        })

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
    
 };


 registerStudentController.verifyCode = async (req, res) => {
    try {
        const {verificationCodeRequest } = req.body
        const token = req.cookies.Galleta
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const {
            randomNumber: storedCode,
            name,
            lastName,
            birthdate,
            email,
            password,
            isVerified,
        } = decoded;

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalid code"})
        }

        const NewStudent = new studentsModel({
            name,
            lastName,
            birthdate,
            email,
            password,
            isVerified
        });

        await NewStudent.save();
        
        res.clearCookie("Galleta")

        return res.status(200).json({message: "Student resgistered"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
 };

export default registerStudentController;