import teacherModel from "../models/teachersModel.js" 

const teacherController = {};

//Select
teacherController.getTeacher = async (req, res) => {
    try {
        const teachers = await teacherModel.find();
        return res.status(200).json(teachers);
    } catch (error) {
        console.log ( "error" + error);
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//Update
teacherController.updateTeacher = async (req, res) => {
    try {
        let {
        name,
        lastName,
        email,
        password,
        hireDate,
        isActive,
        isVerified,
        loginAttemps,
        timeOut
        } = req.body
    
        //validaciones
        name = name?.trim()
        email = email?.trim()

        //Valores requeridos
        if(!name || !email || !password) {
            return res.status(400).json({message: "Fields required"})
        }

        //Validación de fechas
        if(birthdate > new Date || birthdate < new Date("1901-01-01")){
            return res.status(400).json ({message: "Invalid date"})
        }

        const teacherUpdated  = await teacherModel.findByIdAndUpdate (
            req.params.Id,
            {
            name,
            lastName,
            email,
            password,
            hireDate,
            isActive,
            isVerified,
            loginAttemps,
            timeOut
            },
            {
                new: true
            },
        );

        if (!teacherUpdated) {
            return res.status(404).json({message: "Teacher Not Found"})
        }
        return res.status(200).json({message: "Teacher Updated"})
    } catch (error){
        console.log ("error" + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

//Delete
teacherController.deleteTeacher = async (req, res ) => {
    try {
        const deleteTeacher = teacherModel.findByIdAndDelete(req.params.id);
        if(!deleteTeacher){
            return res.status(404).json({message: "Teacher not found"})
        }
        return res.status(200).json({message:"Teacher deleted"})
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({messag: "Internal Server Error"});
    }
};

export default teacherController;

