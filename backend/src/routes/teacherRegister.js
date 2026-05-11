import express from "express"
import registerTeachersController from "../controller/registerTeacherController.js"

const router = express.Router();

router.route("/").post(registerTeachersController.register);
router.route("/verifyCode").post(registerTeachersController.verifyCode);

export default router;