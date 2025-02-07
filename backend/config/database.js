import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize("pandaikali", "remote_pandaikali", "kalipandai2k242k24", {
    host: "103.215.229.78",
    port: 35789,
    dialect: "mysql", 
});

export default db;