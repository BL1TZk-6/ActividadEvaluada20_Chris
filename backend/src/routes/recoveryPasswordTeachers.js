import express from "express";
import recoveryPasswordControllerTeachers from "../controller/recoveryPasswordControllerTeachers.js";

const router = express.Router();

router.route ("/requestCode").post(recoveryPasswordControllerTeachers.requestCode);
router.route ("/verifyCode").post(recoveryPasswordControllerTeachers.verifyCode);
router.route ("/newPassword").post(recoveryPasswordControllerTeachers.newPassword);

export default router;