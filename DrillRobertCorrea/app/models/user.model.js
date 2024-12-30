import {DataTypes} from "sequelize";
import database from "./index.js";
import BootcampModel from "./bootcamp.model.js";

const UserModel = database.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

UserModel.belongsToMany(BootcampModel, {
    through: "user_bootcamp",
    as: "bootcamps",
    foreignKey: "user_id",
});
BootcampModel.belongsToMany(UserModel, {
    through: "user_bootcamp",
    as: "students",
    foreignKey: "bootcamp_id",
});
export default UserModel;