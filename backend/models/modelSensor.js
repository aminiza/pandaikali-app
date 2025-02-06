import db from "../config/database.js";
import { Sequelize, DataTypes } from "sequelize";


const SensorJarak = db.define("SensorJarak", {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }    
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            isDate: true
        }    
    },
    site: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 10]
        }    
    },
    Rssi: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }    
    },
    jarak: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true,
        }    
    },
}, {
    freezeTableName: true
})

export default SensorJarak;