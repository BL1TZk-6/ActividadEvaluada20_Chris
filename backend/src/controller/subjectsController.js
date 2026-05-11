import subjectsModel from "../models/subjectsModel.js"

const subjectsController = {};

//Select 
subjectsController.getSubject = async (req, res) => {
    const subjects = await subjectsModel.find();
    res.json(subjects);
};

//INSERT
subjectsController.insertSubject = async (req, res) => {
  const { subjectName, teacher_id, isAvailable} = req.body;
  const newSubject = new subjectsModel({ subjectName, teacher_id, isAvailable });
  await newSubject.save();

  res.json({ message: "Subject saved" });
};

//Actualizar 
subjectsController.updateSubject = async (req, res) => {
    const { subjectName, teacher_id, isAvailable } = req.body;

    await subjectsModel.findByIdAndUpdate(
        req.params.id,
        {
            subjectName, teacher_id, isAvailable
        },
        {
            new: true
        },
    );
    res.json ({message: "Subject updated"});
};

//Eliminar
subjectsController.deleteSubject = async (req, res) => {
  await subjectsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Subject deleted" });
};

export default subjectsController;