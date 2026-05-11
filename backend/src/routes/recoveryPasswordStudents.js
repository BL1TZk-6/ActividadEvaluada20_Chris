import express from "express";
import recoveryPasswordControllerStudents from "../controller/recoveryPasswordControllerStudents.js";

const router = express.Router();

router.route ("/requestCode").post(recoveryPasswordControllerStudents.requestCode);
router.route ("/verifyCode").post(recoveryPasswordControllerStudents.verifyCode);
router.route ("/newPassword").post(recoveryPasswordControllerStudents.newPassword);

export default router;