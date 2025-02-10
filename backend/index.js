import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import SensorRoute from "./routes/SensorRoute.js";
// import db from "./config/database.js";
import {logout} from "./controllers/Users.js";
dotenv.config();

const app = express();

const PORT = process.env.APP_PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

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
    origin: FRONTEND_URL
}));
app.use(express.json());

app.use(UserRoute);
app.use(SensorRoute);
app.post('/logout', logout);

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

app.listen(PORT, () => console.log("Server up and running..."));