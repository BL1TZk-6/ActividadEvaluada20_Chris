import express from "express"
import teacherController from "../controller/teacherController.js"

const router = express.Router();

router.route("/").get(teacherController.getTeacher);
router.route("/:id").put(teacherController.updateTeacher)
.delete(teacherController.deleteTeacher);

export default router;