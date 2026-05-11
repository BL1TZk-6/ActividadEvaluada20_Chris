import express from "express"
import registerStudentController from "../controller/registerStudentController.js"

const router = express.Router();

router.route("/").post(registerStudentController.register);
router.route("/verifyCode").post(registerStudentController.verifyCode);

export default router;