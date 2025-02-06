import express from "express";
import { getSensorJarak, addSensorJarak, getHistorySensorJarak } from "../controllers/SensorJarak.js";
const router = express.Router();


router.get("/data", getSensorJarak);
router.get("/history", getHistorySensorJarak);
router.post("/create-data", addSensorJarak);

export default router;