import express from 'express';
// TODO #3: Los registros se guardan en la base de datos (a través de las query en los controllers) ✓✓
import UserController from '../controllers/user.controller.js'
import middleware from "../middleware/index.js";
import sessionToken from "../config/auth.config.js";
import bcrypt from 'bcrypt';
import UserModel from "../models/user.model.js";
import {verifyToken} from "../middleware/auth.js";


const userRouter = express.Router();

// 4# Creando rutas para usuarios
// TODO #1: un usuario se puede registrar en la API (Acceso Publico) ✓✓
userRouter.post('/api/signup', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const verifyEmail = await middleware.verifySignUp(email);

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({message: 'Debe ingresar todos los campos'});
        } else if (!verifyEmail) {
            const user = {firstName, lastName, email, password};
            await UserController.createUser(user);
            res.status(200).json({message: `Se ha registrado satisfactoriamente.`});
        } else {
            res.status(400).json({message: 'El correo ya está registrado. Por favor use otro.'})
        }
    } catch (error) {
        console.log(error);
    }
});

// TODO #2: Un usuario inicia sesión con email y password (Acceso Publico) ✓✓
userRouter.post('/api/signin', async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            res.status(400).json({message: 'Por favor ingrese el email y su contraseña'})
        }
        // TODO: encontrar el email en la base de datos y si se encuentra, verificar que el password sea correcto ingresado al iniciar sesión ✓✓
        const findUser = await UserModel.findAll({
            where: {email}
        })
        const userData = findUser[0].dataValues;
        if (!findUser) res.status(400).json({message: 'email incorrecto o usuario no existe'});

        if (findUser) {
            const match = await bcrypt.compare(password, userData.password);
            if (match) {
                const token = await sessionToken(userData)
                res.status(200).json({"ingreso exitoso": `${JSON.stringify(findUser[0].dataValues)}`, token});

            } else {
                res.status(401).json({message: "contraseña incorrecta"})
            }
        }
    } catch (error) {
        next(error)
    }
})

userRouter.post('/user', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({message: 'Debe ingresar todos los campos'});
        } else {
            const user = {firstName, lastName, email, password};
            const resultado = await UserController.createUser(user);
            res.status(201).json({message: `Usuario creado satisfactoriamente.`, resultado});
        }
    } catch (error) {
        console.log('Algo pasó:', error);
    }
});

// TODO #7: Listar información del usuario po ID con sesión iniciada --> ruta protegida ✓✓
userRouter.get('/api/user/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserController.findUserById(id)
        if (!user) res.status(400).json({message: 'Usuario no existe'});
        res.status(200).json({user})
    } catch (error) {
        console.log(error);
    }

})

// TODO #8: Listar la info de todos los usuarios y sus bootcamps --> ruta protegida ✓✓
userRouter.get('/api/user', verifyToken, async (req, res) => {
    try {
        const users = await UserController.findAll();
        res.status(200).json({users})
    } catch (error) {
        console.log(error);
    }
})
// TODO #9: Actualizar nombre y apellido de usuario por ID --> ruta protegida ✓✓
userRouter.put('/api/user/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const {firstName, lastName} = req.body;
        if (!firstName || !lastName) res.status(400).json({message: 'Por favor incluya el nombre y apellido para actualizar el usuario'})

        await UserController.updateUserById(id, firstName, lastName);
        const updatedUser = await UserController.findUserById(id)
        res.status(200).json({message: `Usuario actualizado`, updatedUser});

    } catch (error) {
        console.log(error);
    }
})
// TODO#10: Eliminar usuario por id --> ruta protegida ✓✓
userRouter.delete('/api/user/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserController.deleteUserById(id)
        if (!user) res.status(400).json({message: 'Usuario no existe'});
        res.status(200).json({message: 'Usuario eliminado satisfactoriamente.'});
    } catch (error) {
        console.log(error);
    }
})
export default userRouter;