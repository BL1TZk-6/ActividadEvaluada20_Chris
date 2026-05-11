import studentsModel from "../models/studentsModel.js" 
import bcrypt from "bcryptjs";
import  JsonWebTokenError from "jsonwebtoken";
import { config } from "../../config.js";

const loginStudentController = {}

loginStudentController.login = async (req, res) => {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "Correo inválido" });
    }
    try {
        const studentFound = await studentsModel.findOne({email});
        if(!studentFound){
            return res.status(400).json({message: "Student not found"})
        }
        if(studentFound.timeOut && studentFound.timeOut > Date.now()){
           return res.status(403).json({message: "Cuenta bloqueada"})
        }
        const isMatch = await bcrypt.compare(password, studentFound.password)
        if(!isMatch){
            studentFound.loginAttemps = (studentFound.loginAttemps || 0) + 1;
            if (studentFound.loginAttemps >= 5){
                studentFound.timeOut = Date.now() + 5 * 60 * 1000;
                studentFound.loginAttemps = 0;
                await studentFound.save();
                return res.status(403).json({message: "Cuenta bloqueada por multiples intentos fallidos"})
            }
            await studentFound.save();
            return res.status(400).json({message: "Invalid Password"})
        }

        studentFound.loginAttemps = 0;
        studentFound.timeOut = null;

        const token = JsonWebTokenError.sign(
            {id: studentFound._id, userType: "student" },
            config.JWT.secret,
            {expiresIn: "30d"}
        );

        res.cookie("authCookie", token)
        return res.status(200).json({message: "Login exitoso"})

    } catch (error){
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"})
    }
};

export default loginStudentController;