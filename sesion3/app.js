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
app.get('/', (req, res) => {
    try {
        res.status(200).json({message: 'Bievenido al servidor 3001'})
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})
// Tener presente los métodos de array: filter - map - reduce - find
// Ruta para encontrar todas las motos registradas
app.get('/motos', (req, res) => {
    try {
        res.status(200).json(
            {
                info: {
                    URL: 'http://localhost:3001/motos',
                    method: 'GET',
                    cantidad: motos.length,
                    campos: {
                        id: 'Identificador único',
                        marca: 'Marca de la moto',
                        modelo: 'Modelo de la moto',
                        color: 'Color de la moto'
                    }
                },
                results: motos
            });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// Creando la función para ver detalle de una moto
// Rutas paramétricas
app.get('/motos/:id', (req, res) => {
    try {
        const idBuscar = req.params.id;
        const motoEncontrada = motos.find(moto => moto.id === idBuscar);
        if (motoEncontrada) {
            res.status(200).json({results: motoEncontrada});
        } else {
            res.status(404).json({message: 'La moto no existe'});
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})


// Ruta para crear una nueva moto
app.post('/motos', (req, res) => {
    try {
        const {id, marca, modelo, color} = req.body;
        const nuevaMoto = {id, marca, modelo, color};

        const motoExistente = motos.find(moto => moto.id === id);
        if (motoExistente) {
            res.status(400).json({message: 'La moto ya existe'});
        } else {
            console.log(nuevaMoto);
            motos.push(nuevaMoto);
            res.status(201).json({results: nuevaMoto});
        }
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

// Borrar una moto
app.delete('/motos/:id', (req, res) => {
    try {
        const idEliminar = req.params.id;
        const listaMotos = motos.filter(moto => moto.id !== idEliminar);
        res.status(200).json({listaMotos})
    }catch (error) {
        res.status(404).json({message: error.message});
    }
})

// Modificar una moto
app.put('/motos/:id', (req,res)=>{
    try{
        const idModificar = req.params.id;
        const {marca, modelo, color} = req.body;
        const indexMoto = motos.findIndex(moto => moto.id === idModificar);
        if(indexMoto !== -1){
            motos[indexMoto] = {...motos[indexMoto],marca, modelo, color};
            res.status(201).json({results: motos[indexMoto]});
        }else{
            res.status(404).json({message: 'registro no encontrado'})
        }
    }catch (error) {
        res.status(404).json({message: 'No se encontró la moto'})
    }
    }
)

//Activando el servidor
app.listen(SERVER_PORT, console.log(`Servidor activated... http://localhost:3001`))