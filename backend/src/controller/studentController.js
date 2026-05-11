import studentsModel from "../models/studentsModel.js" 

const studentsController = {};

//Select
studentsController.getStudent = async (req, res) => {
    try {
        const students = await studentsModel.find();
        return res.status(200).json(students);
    } catch (error) {
        console.log ( "error" + error);
        return res.status(500).json({message: "Internal Server Error"})
    }
};

//Update
studentsController.updateStudent = async (req, res) => {
    try {
        let {
            name,
            lastName,
            email,
            password,
            birthdate,
            speciality_id,
            carnet,
            phone,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body
        //Valores requeridos
        if(!name || !email || !password) {
            return res.status(400).json({message: "Fields required"})
        }

        //Validación de fechas
        if(birthdate > new Date || birthdate < new Date("1901-01-01")){
            return res.status(400).json ({message: "Invalid date"})
        }

        const studentUpdated  = await studentsModel.findByIdAndUpdate (
            req.params.Id,
            {
            name,
            lastName,
            email,
            password,
            birthdate,
            speciality_id,
            carnet,
            phone,
            isVerified,
            loginAttempts,
            timeOut
            },
            {
                new: true
            }
        );

        if (!studentUpdated) {
            return res.status(404).json({message: "Student Not Found"})
        }
        return res.status(200).json({message: "Student Updated"})
    } catch (error){
        console.log ("error" + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
};

//Delete
studentsController.deleteStudent = async (req, res ) => {
    try {
        const deleteStudent = studentsModel.findByIdAndDelete(req.params.id);
        if(!deleteStudent){
            return res.status(404).json({message: "Student not found"})
        }
        return res.status(200).json({message:"Student deleted"})
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({messag: "Internal Server Error"});
    }
};

export default studentsController;

