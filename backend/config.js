import dotenv from "dotenv"
// este archivo es un archivo intermedio para conectar las variables del env para poder usarlas en todo el env
dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI
    },
    JWT: {
        secret: process.env.JWT_Secret_Key
    },
    email: {
        user_email: process.env.USER_EMAIL,
        user_password: process.env.USER_PASSWORD
    }
}