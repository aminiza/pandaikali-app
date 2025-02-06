import db from "../config/database.js";
import { Sequelize, DataTypes } from "sequelize";


const Users = db.define("users", {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }    
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [4, 100]
        }    
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }    
    },
}, {
    freezeTableName: true
})

export default Users;