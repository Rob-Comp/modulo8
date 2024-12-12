import morgan from "morgan";
import express from "express";
import {config} from "dotenv";
config()

//Simulando que tenemos datos en la base de datos como JSON
let motos = [
    {
        'id': '1',
        'marca': 'Honda',
        'modelo': 'Trazan 1200cc',
        'color': 'rojo'
    },
    {
        'id': '2',
        'marca': 'Kawasaki',
        'modelo': 'KLR 650cc',
        'color': 'verda'
    },
    {
        'id': '3',
        'marca': 'Suzuki',
        'modelo': 'XR 500cc',
        'color': 'azul'
    }
];

// creando la variable que contiene el puerto
const {SERVER_PORT} = process.env;

const app = express();
// console.log(app)

//Activando middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// Creando las rutas
app.get('/', (req, res)=>{
    try{
    res.status(200).json({message: 'Bievenido al servidor 3001'})
    }catch(error){
        res.status(404).json({message: error.message});
    }
})
// Tener presente los métodos de array: filter - map - reduce - find
// Ruta para encontrar todas las motos registradas
app.get('/motos', (req, res)=>{
    try{
        res.status(200).json({results: motos})
    }catch (error){
        res.status(404).json({message: error.message});
    }
});


// Ruta para crear una nueva moto
app.post('/motos', (req, res)=>{
    try{
        const { id, marca, modelo, color } = req.body;
        const nuevaMoto = {id, marca, modelo, color};
        console.log(nuevaMoto);
        motos.push(nuevaMoto);
        res.status(201).json({results: nuevaMoto});
    }catch(error){
        res.status(404).json({message: error.message});
    }
});

//Activando el servidor
app.listen(SERVER_PORT, console.log(`Servidor activated... http://localhost:3001`))