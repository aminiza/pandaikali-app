import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize("pandaikali", "remote_pandaikali", "kalipandai2k242k24", {
    host: "",
    port: 35789,
    dialect: "mysql", 
});

export default db;