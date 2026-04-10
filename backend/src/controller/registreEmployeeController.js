import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import employeeModel  from "../models/employees.js"

import {config} from "../../config.js"
import { info } from "console";

const registreEmployeeContoller  ={}

//name, lastName, salary, DUI, phone, email, password, idBranch
registreEmployeeContoller.registre = async(req, res)=>{
    const {
        name, lastName, salary, DUI, phone, email, password, idBranch
    } = req.body
    try {
        const existEmployee = await employeeModel.findOne({email});
        if(existEmployee){
            return res.status(400).json({ message: "Employee alredy exits" });
        }
        const passwordHash = await bcryptjs.hash(password, 10)
        const newEmployee = new employeeModel({
            name, lastName, salary, DUI, phone, email, password: passwordHash, idBranch
        })
        await newEmployee.save()
        const verificationCode = crypto.randomBytes(3).toString("hex")
        const tokenCode = jsonwebtoken.sign(
            {email, verificationCode},
            config.JWT.secret,
            {expiresIn: "15m"}
        );
        res.cookie("verificationToken", tokenCode, { maxAge: 15 * 60 * 1000 });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            },
        })
        const mailOptions ={
            from: config.email.user_email,
            to: email,
            subject: "Vereficación de correo",
            text: 
            "Para vereficar su correo por favor ingrese el siguiente código "+
            verificationCode+
            " expira en 15 minutos"
        }

        transporter.sendMail(mailOptions,(error, info) =>{
            if(error){
                console.log("error "+ error)
                return res.status(500).json({
                    message : "Error: Mail can´t be send"
                })
            }
            res.status(200).json({
                message: "Employee registered, verify your email"
            })
        })
    } catch (error) {
        console.log("error "+ error)
        return res.status(500).json({ message: "Internal server error" });
    }
}
registreEmployeeContoller.verifyCode = async (req, res) =>{
    try {
        const {verificationCodeRequest} = req.body;
        const token = req.cookies.vereficationToken;
        console.log(token)

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} =decoded

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({ message: "Invalid code" });
        }
        const customer = await customerModel.findOne({ email });
            customer.isVerified = true;
            await customer.save();
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export default registreEmployeeContoller