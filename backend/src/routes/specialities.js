import express from "express";
import specialitiesController from "../controller/specialitiesController.js";

const router = express.Router();

router.route("/")
.get(specialitiesController.getSpeciality)
.post(specialitiesController.insertSpeciality);

router.route("/:id")
.put(specialitiesController.updateSpeciality)
.delete(specialitiesController.deleteSpeciality);

export default router;
