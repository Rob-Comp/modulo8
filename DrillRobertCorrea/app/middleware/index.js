import verifySignUp from './verifySignUp.js';
import {verifyToken} from "./auth.js";

const middleware = {
    verifySignUp,
    verifyToken,
};
export default middleware;