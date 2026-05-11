import express from "express"
import studentsController from "../controller/studentController.js"

const router = express.Router();

router.route("/").get(studentsController.getStudent);
router.route("/:id").put(studentsController.updateStudent)
.delete(studentsController.deleteStudent);

export default router;