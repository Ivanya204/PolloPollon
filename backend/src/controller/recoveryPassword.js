import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"
import crypto from "crypto"
import { config } from "../../config.js"
import customerModel from "../models/customers.js"
import HTMLRecoveryEmail from "../utils/sendMailRecovery.js"
const recoveryPasswordController = {}

recoveryPasswordController.requestCode = async (req, res)=>{
    try {
        const {email} =req.body;
        const userFound =await customerModel.findOne({email})
        if(!userFound){
            console.log(email)
            return res.json({message: "User not found"})
            
        } 
        
        
        const code= crypto.randomBytes(3).toString("hex")
        const token =jsonwebtoken.sign(
            //que vamos a guardar
            {email, code, userType: "customer", verify: false},
            //SECRECT KEY
            config.JWT.secret,
            //CUANDO EXPIRA
            {expiresIn: "15m"}
        )
        res.cookie("recoveryCookie", token, {maxAge: 15*60*1000})

        //envia correo electronico 
        //quien lo envia
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })
        const mailOptions ={
            from: config.email.user_email,
            to: email,
            subject: "Correo de recuperacion de contraseña",
            body: "Usa este codigo paa poder recuperar tu contraseña",
            html: HTMLRecoveryEmail(code)
        }
        transporter.sendMail(mailOptions, (error, info)=>{
            if(error){
                console.error("Error al enviar el correo ", error)
                return res.status(500).json({message: "error sending email"})
            }
            return res.status(200).json({message: "email sent"})
        })

    } catch (error) {
        console.log("error "+error)
        return res.status(500).json({message: "Internal server error"})
    }
}
//verificar codigo
recoveryPasswordController.verifiedCode = async (req, res) =>{
            try {
                const {codeRequest} = req.body  
                const token = req.cookies.recoveryCookie
                const decoded =jsonwebtoken.verify(token, config.JWT.secret)
                //comparar lo que el usuaria escribio con lo que esta en el token
                if(codeRequest !== decoded.code){
                    return res.status(400).json({message: "Invalid code"})
                }
                //si lo que escribe esta bien, vamis a colocar en el token la verificacion
                const newToken =jsonwebtoken.sign(
                    {email: decoded.email, userType: "customer", verified: true},
                    config.JWT.secret,
                    {expiresIn: "15m"}
                )
                res.cookie("recoveryCookie", newToken, {maxAge: 15*60*1000})
                return res.status(200).json({message: "Coded verified successfully"})
            } catch (error) {
                console.log("error " + error)
                return res.status(500).json({message: "Internal server error"})
            }
}       

recoveryPasswordController.newPassword = async (req, res)=>{
    try {
        const {newPassword, confirmNewPassword} = req.body;
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({message: "Password doesn´t match "})
        }
        //vamos a verificar token si ya esta confirmado
        const token = req.cookies.recoveryCookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        if(!decoded.verified){
            return res.status(400).json({message: "Coded not verified"})
        }

        //encriptamos la contraseña 
        const passwordHash = await bcrypt.hash(newPassword, 10)
        await customerModel.findOneAndUpdate(
            {email: decode.email},
            {password: passwordHash},
            {new: true}
        )

        res.clearCookie("recoveryCookie")
        return res.status(200).json({message: "Password updated"})
    } catch (error) {
        console.log("error "+ error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default recoveryPasswordController