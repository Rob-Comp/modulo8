import {Sequelize} from "sequelize";
import {config} from 'dotenv';
config();

// 1# CONFIGURACIÓN BASE DE DATOS - NOMBRE BASE DATOS = db_jwtbootcamp
const {USER, PASSWORD, HOST, DATABASE} = process.env;

export const dbConfig =  {HOST, USER, PASSWORD, DATABASE,
    dialect: 'postgres',
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
};
