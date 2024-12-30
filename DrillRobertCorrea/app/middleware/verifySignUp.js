import UserModel from "../models/user.model.js";

// TODO: verificar si el correo ya se encuentra en la base de datos y lanzar un error al inscribirse ✓✓

const verifySignUp = async (email)=>{
    const user = await UserModel.findAll({where : {
        email: email
        }});
return !!user[0];
}
export default verifySignUp;