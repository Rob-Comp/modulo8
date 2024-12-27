import {expressjwt} from "express-jwt";
import jwt from "jsonwebtoken";
import express from "express";
import morgan from "morgan";
import {config} from "dotenv";

config()

const app = express();
const {SERVER_PORT, TOKEN} = process.env;

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Middleware de acceso
const authMiddleware = expressjwt({
    secret: TOKEN,
    algorithms: ["HS256"]
})

// Routes
app.get('/', authMiddleware, (req, res) => {
    res.status(200).json({message: 'Bienvenido al GET de la sesión 8'})
})
// Creando la ruta para el login
app.post('/login', async (req, res) => {
//     Tomar los datos de la base de datos
    try {
        if (req.body.user === 'admin' && req.body.password === "123456") {
            const payload = {
                name: req.body.user,
                exp: Date.now() / 1000 + 60 * 60,
            }
            const token = jwt.sign(payload, TOKEN);
            console.log(token)
            res.status(200).json({message: 'Bienvenido a su portal privado de usuario'})
        } else {
            res.status(401).json({message: 'Usuario o contraseña incorrectos'})
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

// Creando otra ruta segura
app.post('/productos', authMiddleware, async (req, res) => {
    try {
        res.status(200).json({message: 'Bienvenido a su producto'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Server
app.listen(SERVER_PORT, () => {
    console.log(`Servidor a la escucha en --> ${SERVER_PORT}`);
});

