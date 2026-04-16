import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import customerModel from "../models/customers.js"
import { config } from "../../config.js"

const loginCustomersController ={}

loginCustomersController.login = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const userFound = await customerModel.findOne({email})
        if (!userFound){
            return res.status(400).json({message: "Correo del cliente no encontrado"})
        }
        if(userFound.timeOut && userFound.timeOut > Date.now){
            return res.status(403).json({message: "Cuenta bloqueada"})
        }
        const isMatch = await bcrypt.compare(password, userFound.password)
        if(!isMatch){
            //si se equivoca en la contraseña le vamos a subir uno 
            userFound.loginAttempts = (userFound.loginAttempts || 0) +1
            //bloquear cuenyta despues de 5 intentos fallidos 
            if(userFound.loginAttempts>=5){
                userFound.timeOut = Date.now()+ 15*60*1000
                userFound.loginAttempts =0
                await userFound.save()
                return res.status(403).json({message: "Cuenta bloqueada"})
            }
            await userFound.save()
            return res.status(401).json({message: "Contraseña incorrecta"})
        }
        //si escribe la contraseña bien , hay que borrar los intentos fallidos
        userFound.loginAttempts = 0
        userFound.timeOut = null
        await userFound.save()
        //generar la cookie
        const token = jsonwebtoken.sign(
            //1 que vamos a guardar
            {id: userFound._id, userType: "customer"},
            //2 llave secreta
            config.JWT.secret,
            //3 Cuando expira 
            {expiresIn: "30d"}
        )
        //Guardamos el token en una cookie 
        res.cookie("authCookie", token)
        return res.status(200).json({message: "Login exitoso"})
    } catch (error) {
        console.log("error "+ error)
        return res.status(500).json({message: "Internal server error"})
    }
}
export default loginCustomersController