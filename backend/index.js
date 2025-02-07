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