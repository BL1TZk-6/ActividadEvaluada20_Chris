import express from "express"
import loginStudentController from "../controller/loginStudentController.js";


const router = express.Router();

router.route("/").post(loginStudentController.login);

export default router;