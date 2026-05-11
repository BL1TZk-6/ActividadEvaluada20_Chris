import express from "express";
import tuitionsController from "../controller/tuitionsController.js";

const router = express.Router();

router.route("/")
.get(tuitionsController.getTuition)
.post(tuitionsController.insertTuition);

router.route("/:id")
.put(tuitionsController.updateTuition)
.delete(tuitionsController.deleteTuition);

export default router;
