import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import http from "http";
import SensorRoute from "./routes/SensorRoute.js";
// import db from "./config/database.js";
import {logout} from "./controllers/Users.js";
import { Server } from "socket.io";
import SensorJarak from "./models/modelSensor.js";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());

app.use(UserRoute);
app.use(SensorRoute);
app.post('/logout', logout);

let sensorData = [];

setInterval( async() => {
    try {
        const sensorJarak = await SensorJarak.findAll();
    
        if (sensorJarak && sensorJarak.length > 0) {
            const newData = sensorJarak[sensorJarak.length - 1];
            io.emit('sensorUpdate', newData);
        }
    } catch (error) {
        console.error("Error saving data", error);
    }
}, 5000);

io.on('connection', (socket) => {
    console.log("User connected", socket.id);

    //kirim data awal saat client terhubung
    socket.emit("initialData", sensorData);

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    })
})

// const syncDatabase = async() => {
//     try {
//         await db.sync();
//         console.log("Database synced");
//     } catch (error) {
//         console.log(error);
//     }
// }

// syncDatabase();

// (async () => {
//     try {
//         await db.models.Sensor.drop();
//         console.log("table berhasil dihapus");
//     } catch (error) {
//         console.error("Error saat hapus table" ,error);
//     }
// })();

app.listen(process.env.APP_PORT, () => console.log("Server up and running..."));