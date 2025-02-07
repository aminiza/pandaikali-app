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
import { getSensorJarak } from "./controllers/SensorJarak.js";
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

io.on('connection', async(socket) => {
    console.log("User connected", socket.id);

    try {
        const sensorData = await getSensorJarak();
        socket.emit("initialData", sensorData);
    } catch (error) {
        console.error("Error fetching data", error);
    }

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});


setInterval( async() => {
    try {
        const sensorData = await getSensorJarak();
            io.emit('sensorUpdate', sensorData);
    } catch (error) {
        console.error("Error fetching sensor data", error);
    }
}, 5000);


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

server.listen(process.env.APP_PORT, () => console.log("Server up and running..."));