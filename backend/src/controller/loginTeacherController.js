import teachersModel from "../models/teachersModel.js" 
import bcrypt from "bcryptjs";
import  JsonWebTokenError from "jsonwebtoken";
import { config } from "../../config.js";

const loginTeacherController = {}

loginTeacherController.login = async (req, res) => {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "Correo inválido" });
    }
    try {
        const teacherFound = await teachersModel.findOne({email});
        if(!teacherFound){
            return res.status(400).json({message: "Teacher not found"})
        }
        if(teacherFound.timeOut && teacherFound.timeOut > Date.now()){
           return res.status(403).json({message: "Cuenta bloqueada"})
        }
        const isMatch = await bcrypt.compare(password, teacherFound.password)
        if(!isMatch){
            teacherFound.loginAttemps = (teacherFound.loginAttemps || 0) + 1;
            if (teacherFound.loginAttemps >= 5){
                teacherFound.timeOut = Date.now() + 5 * 60 * 1000;
                teacherFound.loginAttemps = 0;
                await teacherFound.save();
                return res.status(403).json({message: "Cuenta bloqueada por multiples intentos fallidos"})
            }
            await teacherFound.save();
            return res.status(400).json({message: "Invalid Password"})
        }

        techerFound.loginAttemps = 0;
        teacherFound.timeOut = null;

        const token = JsonWebTokenError.sign(
            {id: teacherFound._id, userType: "teacher" },
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

export default loginTeacherController;