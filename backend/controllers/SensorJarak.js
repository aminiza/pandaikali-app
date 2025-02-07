import SensorJarak from "../models/modelSensor.js";

export const getSensorJarak = async (req, res) => {
    try {
        const sensorJarak = await SensorJarak.findAll();

        res.status(200).json({message: "Success get data", sensorJarak});
    } catch (error) {
        res.status(500).json({message: "Terjadi kesalahan server", error: error.message});
    }
}

export const getHistorySensorJarak = async (req, res) => {
    try {
        const HistorySensorJarak = await SensorJarak.findAll();
        res.status(200).json({message: "Success get data", HistorySensorJarak});
    } catch (error) {
        res.status(500).json({message: "Terjadi kesalahan server", error: error.message});
    }
}

export const addSensorJarak = async (req, res) => {
    try {
        const {timestamp, site, Rssi, jarak} = req.body;
        if (!timestamp || !site || !Rssi || !jarak) {
            return res.status(400).json({message: "All fields are required"});
        }
        const sensorJarak = await SensorJarak.create({timestamp, site, Rssi, jarak});
        res.status(201).json({message: "Success add data", sensorJarak});
    } catch (error) {
        res.status(500).json({message: "Terjadi kesalahan server", error: error.message});
    }
}