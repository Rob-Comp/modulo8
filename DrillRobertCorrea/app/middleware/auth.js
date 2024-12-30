import jwt from 'jsonwebtoken';

// 4# Verificar el token
export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) res.status(400).json({message: 'Postman no tiene el TOKEN'});
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET, (err, payload) => {
            if (err) next(new Error('Los Tokens no son iguales! :o'));

            req.payload = payload;
            next();
        })

    } catch (error) {
        console.log(error);
    }
};