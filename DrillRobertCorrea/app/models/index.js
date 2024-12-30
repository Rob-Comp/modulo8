import {dbConfig} from '../config/db.config.js'
import {Sequelize} from 'sequelize';


// 3# ajustando términos para conectar ds.config.js a este archivo
const database = new Sequelize(
    dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,

        pool: {
            max: dbConfig.max,
            min: dbConfig.min,
            acquire: dbConfig.acquire,
            idle: dbConfig.idle
        }
    });
export default database;