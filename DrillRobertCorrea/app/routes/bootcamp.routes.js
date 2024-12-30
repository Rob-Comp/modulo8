import express from 'express';
import bootcampController from "../controllers/bootcamp.controller.js";
import middleware from "../middleware/index.js";
import {verifyToken} from "../middleware/auth.js";
import BootcampController from "../controllers/bootcamp.controller.js";
const bootcampRouter = express.Router();

// TODO: #6: Se pueden listar todos los bootcamps --> acceso público ✓✓
bootcampRouter.get("/api/bootcamp", async (req, res) => {
    const bootcampGet = await bootcampController.findAll();
    res.status(200).json({bootcampGet});
});

// TODO: #4: Una ves registrado el usuario puede agregar un Bootcamp ✓✓
// Protegiendo la ruta a través del middleware --> verifyToken
bootcampRouter.post("/api/bootcamp", verifyToken, async (req, res) => {
    console.log(req.headers['authorization']);
    console.log('Aquí -------------->');
    const {title, cue, description} = req.body;
    const bootcamp = {title, cue, description};
    await bootcampController.createBootcamp(bootcamp);

    res.status(201).json({message: 'Bootcamp creado satisfactoriamente.'})
});

// TODO #5: Puede asignar usuarios a los bootcamps, por medio del token, previamente iniciada la sesión ✓✓
bootcampRouter.post("/bootcamps/addUser", verifyToken, async (req, res) => {
    const {bootcamp_id, user_id} = req.body;
    const resultado = await bootcampController.addUser(bootcamp_id, user_id);
    if(!resultado) {
        res.status(400).json({message: 'Usuario o Bootcamp no existe.'})
    }else{
        res.status(201).json({message: 'Estudiante agregado el bootcamp satisfactoriamente.'})
    }
});
// TODO #11: Obtener bootcamp por id y sus estudiantes --> ruta protegida ✓✓
bootcampRouter.get('/api/bootcamps', verifyToken, async (req, res) => {
    const id = req.params.id;
    const bootcamps = await BootcampController.findById(id)
    if(!bootcamps) res.status(404).json({message: 'Bootcamp no existe.'})
    res.status(200).json({bootcamps});
})
export default bootcampRouter