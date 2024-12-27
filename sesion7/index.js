import jwtEncode from 'jwt-encode';
import {jwtDecode} from 'jwt-decode';

// Encabezado / el código es la codificación
const header = {
    alg: "HS256"
};
// Sujeto / identificación del usuario - rut o identificador único para el usuario
const payload = {
    sub: 182631531,
    nombre: 'Robert Correa',
    email: 'ranireto@gmail.com',
    admin: true,
    iat: new Date(),
};
//  Clave / debería estar en una variable de entorno
const signature = "SuperClaveSecreta123";
const jwt = jwtEncode(payload, signature, header);
console.log(jwt);
console.log(Date.now());

const token = jwt
const decoded = jwtDecode(token);
console.log(decoded);