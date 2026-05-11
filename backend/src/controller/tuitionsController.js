import tuitionsModel from "../models/tuitionsModel.js";

const tuitionsController = {};

//Select 
tuitionsController.getTuition = async (req, res) => {
    const tuitions = await tuitionsModel.find();
    res.json(tuitions);
};

//INSERT
tuitionsController.insertTuition = async (req, res) => {
  const { subjectName, teacher_id, isAvailable} = req.body;
  const newTuition = new tuitionsModel({ subjectName, teacher_id, isAvailable });
  await newTuition.save();

  res.json({ message: "Tuition saved" });
};

//Actualizar 
tuitionsController.updateTuition = async (req, res) => {
    const { subjectName, teacher_id, isAvailable } = req.body;

    await tuitionsModel.findByIdAndUpdate(
        req.params.id,
        {
            subjectName, teacher_id, isAvailable
        },
        {
            new: true
        },
    );
    res.json ({message: "Tuition updated"});
};

//Eliminar
tuitionsController.deleteTuition = async (req, res) => {
  await tuitionsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Tuition deleted" });
};

export default tuitionsController;