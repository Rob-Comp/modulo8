import UserModel from '../models/user.model.js';
import database from '../models/index.js'
import BootcampModel from "../models/bootcamp.model.js";
import bcrypt from "bcrypt";

const User = UserModel
const Bootcamp = BootcampModel

class UserController {
    // Crear y Guardar Usuarios
    async createUser(user)  {
        const bcryptPassword = await bcrypt.hash(user.password, 1);
        return User.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: bcryptPassword
        })
            .then(user => {
                return user
            })
            .catch(err => {
                console.log(`>> Error al crear el usuario ${err}`)
            })
    }
    // Buscar usuario por ID
    async findUserById(userId) {
        return User.findByPk(userId, {
            include: [{
                model: Bootcamp,
                as: "bootcamps",
                attributes: ["id", "title"],
                through: {
                    attributes: [],
                }
            },],
        })
            .then(users => {
                return users
            })
            .catch(err => {
                console.log(`>> Error mientras se encontraba los usuarios: ${err}`)
            })
    }

// obtener todos los Usuarios incluyendo los bootcamp
    async findAll(){
        return User.findAll({
            include: [{
                model: Bootcamp,
                as: "bootcamps",
                attributes: ["id", "title"],
                through: {
                    attributes: [],
                }
            },],
        }).then(users => {
            return users
        })
    }

// Actualizar usuarios
    async updateUserById(userId, fName, lName){
        return User.update({
            firstName: fName,
            lastName: lName
        }, {
            where: {
                id: userId
            }
        })
            .then(user => {
                return user
            })
            .catch(err => {
                console.log(`>> Error mientras se actualizaba el usuario: ${err}`)
            })
    }

// Eliminar usuarios
    async deleteUserById(userId){
        return User.destroy({
            where: {
                id: userId
            }
        })
            .then(user => {
                return user
            })
            .catch(err => {
                console.log(`>> Error mientras se eliminaba el usuario: ${err}`)
            })
    }
}
export default new UserController();