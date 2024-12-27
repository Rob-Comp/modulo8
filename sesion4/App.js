import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import {v4 as uuidv4} from "uuid";
import dotenv from "dotenv";

dotenv.config();

// console.log(uuidv4()+'.jpg');
const {SERVER_PORT, UPLOAD_DIR} = process.env;
const app = express();

app.use(morgan('dev'));
app.use(fileUpload({createParentPath: true}));
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.post('/api/upload', (req, res) => {
    try {
        // console.log(req.files);
        if (!req.files) {
            return res.status(400).json({message: 'Debe subir una imagen para continuar'})
        }
        const archivo = req.files.catFile1;
        const extensionesPermitidas = ['jpg', 'jpeg', 'png'];
        const extension = archivo.name.split('.').pop();
        // console.log(archivo.name.split('.').pop());
        if(!extensionesPermitidas.includes(extension.toLowerCase())){
            return res.status(400).json({message: 'Solo se permiten imágenes de tipo jpg, jpeg y png'})
        }
        const nombreUnico = uuidv4() + '.' + extension;

        archivo.mv(UPLOAD_DIR + nombreUnico, (error)=>{
            if(error){
                return res.status(500).json({message: error.message})
            }
            return res.status(200).json({message: 'Imagen subida correctamente'})
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.listen(SERVER_PORT, () => {
    console.log(`Servidor activado en el puerto ${SERVER_PORT}`)
})
