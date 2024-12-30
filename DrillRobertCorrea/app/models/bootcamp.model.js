import {DataTypes} from "sequelize";
import database from "./index.js";

const BootcampModel = database.define('bootcamps', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        isInt: true,
        min: 5,
        max: 20
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default BootcampModel;