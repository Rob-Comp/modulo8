import BootcampModel from "../models/bootcamp.model.js";
import UserModel from "../models/user.model.js";
import {Sequelize} from "sequelize";
import express from "express";
const Bootcamp = BootcampModel
const User = UserModel

class bootcampController {
    // Crear y guardar un nuevo bootcamp
    async createBootcamp(bootcamp) {
        return BootcampModel.create({
            title: bootcamp.title,
            cue: bootcamp.cue,
            description: bootcamp.description,
        })
            .then(bootcamp => {
                return bootcamp
            })
            .catch(err => {
                console.log(`>> Error al crear el bootcamp: ${err}`)
            })
    };

// Agregar un Usuario al Bootcamp
    async addUser(bootcampId, userId) {
        return BootcampModel.findByPk(bootcampId)
            .then((bootcamp) => {
                if (!bootcamp) {
                    console.log("No se encontró el Bootcamp!");
                    return null;
                }
                return User.findByPk(userId).then((user) => {
                    if (!user) {
                        console.log("Usuario no encontrado!");
                        return null;
                    }
                    user.addBootcamp([bootcamp])
                    return bootcamp;
                });
            })
            .catch((err) => {
                console.log(">> Error mientras se estaba agregando Usuario al Bootcamp", err);
            });
    };

// buscar el bootcamp por ID
    async findById(Id) {
        return Bootcamp.findByPk(Id, {
            include: [{
                model: User,
                as: "users",
                attributes: ["id", "firstName", "lastName"],
                through: {
                    attributes: [],
                }
            },],
        })
            .then(bootcamp => {
                return bootcamp
            })
            .catch(err => {
                console.log(`>> Error mientras se encontraba el bootcamp: ${err}`)
            })
    };

// obtener todos los Usuarios incluyendo los Bootcamp
    async findAll() {
        return BootcampModel.findAll({
            include: [{
                model: UserModel,
                as: "students",
                attributes: ["id", "firstName", "lastName"],
                through: {
                    attributes: [],
                }
            },],
        }).then(bootcamps => {
            return bootcamps
        }).catch((err) => {
            console.log(">> Error Buscando los Bootcamps: ", err);
        });
    };
}
export default new bootcampController;