import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import customerModel from "../models/customers.js";

import { config } from "../../config.js";

const registreCustomerController = {};

registreCustomerController.register = async (req, res) => {
  const {
    name,
    lastName,
    birthdate,
    email,
    password,
    isVerified,
    loginAttempts,
    timeOut,
  } = req.body;
  try {
    const existCustomer = await customerModel.findOne({ email });
    if (existCustomer) {
      return res.status(400).json({ message: "Customer alredy exits" });
    }
    const passwordHash = await bcryptjs.hash(password, 10);

    const newCustomer = new customerModel({
      name,
      lastName,
      birthdate,
      email,
      password: passwordHash,
      isVerified,
      loginAttempts,
      timeOut,
    });
    await newCustomer.save();
    const verificationCode = crypto.randomBytes(3).toString("hex");
    //generamos un token
    const tokenCode = jsonwebtoken.sign(
      //1 que vamos a guardar
      { email, verificationCode },
      //2 palabra secreta
      config.JWT.secret,
      //3 cuando expira
      { expiresIn: "15m" },
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 15 * 60 * 1000 });
    //enviar codgigo por correo
    //1 Transporte quien envia el correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });
    //2 mailOptions quien lo recibe
    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subjet: "Verificacion de cuenta",
      text:
        "Para vereficar tu cuenta, utiliza este codigo " +
        verificationCode +
        "expira em 15 minutos ",
    };

    //3 enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "error" });
      }
      res
        .status(200)
        .json({ message: "Customer registered, verify your email" });
    });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//vereficamos el codigo que acabamos de enviar
registreCustomerController.verifyCode = async (req, res) => {
  try {
    //solicitamos el codigo que ingresaron en el fronted
    const { vereficationCodeRequest } = req.body;

    //obtener el token de las cookies
    const token = req.cookies.verificationToken;
    console.log(token)

    //ver que codigo esta en el token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const {email, verificationCode: storedCode} = decoded

    //comparar el codigo que el usuario escribe con el codigo que esta en el token
    if (vereficationCodeRequest !== storedCode) {
      return res.status(400).json({ message: "Invalid code" });
    }
    //si el codigo esta bien, entonces, colocamos el campo isVerified en true
    const customer = await customerModel.findOne({ email });
    customer.isVerified = true;
    await customer.save();

    res.clearCookie("verificationToken");
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default registreCustomerController;
