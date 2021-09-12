import express from "express";
import EquipmentController from "../controllers/equipments.controller.js";
const router = express.Router();

router.route("/").get(EquipmentController.apiGetEquipment);

export default router;
