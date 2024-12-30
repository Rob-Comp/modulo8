import express from 'express';
import userController from './app/controllers/user.controller.js'
import bootcampController from './app/controllers/bootcamp.controller.js'
import morgan from 'morgan';
import cors from 'cors';
import userRouter from "./app/routes/user.routes.js";
import bootcampRouter from "./app/routes/bootcamp.routes.js";
import database from "./app/models/index.js";
import middlewareAuth from "./app/middleware/index.js";
import apiRouter from "./app/middleware/verifySignUp.js";

const {PORT} = process.env;
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(cors())

const server = async () => {
    try {
        console.log('----> Conexión exitosa ---->')

        await database.authenticate()
        await database.sync({force: true})

        app.use('/', userRouter);
        app.use('/', bootcampRouter);

        console.log('----> A la espera... ---->')
    } catch (error) {
        console.log(error);
    }

}
server();
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});