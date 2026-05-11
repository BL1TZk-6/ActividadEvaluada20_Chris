import specialitiesModel from "../models/specialitiesModel.js"

const specialitiesController = {};

//Select 
specialitiesController.getSpeciality = async (req, res) => {
    const specialities = await specialitiesModel.find();
    res.json(specialities);
};

//INSERT
specialitiesController.insertSpeciality = async (req, res) => {
  const { specialityName, isAvailable} = req.body;
  const newSpeciality = new specialitiesModel({ specialityName, isAvailable });
  await newSpeciality.save();

  res.json({ message: "Speciality saved" });
};

//Actualizar 
specialitiesController.updateSpeciality = async (req, res) => {
    const {
        specialityName,
        isAvailable
    } = req.body;

    await specialitiesModel.findByIdAndUpdate(
        req.params.id,
        {
        specialityName,
        isAvailable  
        },
        {
            new: true
        },
    );
    res.json ({message: "Speciality updated"});
};

//Eliminar
specialitiesController.deleteSpeciality = async (req, res) => {
  await specialitiesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Speciality deleted" });
};

export default specialitiesController;