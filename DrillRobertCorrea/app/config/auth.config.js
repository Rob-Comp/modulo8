// 2# Validación frase secreta para la creación del token
import jwt from "jsonwebtoken";
const {SECRET} = process.env;

const sessionToken = (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id: user.id,
            user: user.firstName,
            email: user.email,
        };
        const options = {
            expiresIn: "10m",
            issuer: "DrillM8"
        }
        jwt.sign(payload, SECRET, options, (err, token) => {
            if (err) reject(err)
            resolve(token)
        });
    })
};
export default sessionToken;