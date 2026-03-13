import dotenv from "dotenv"
// este archivo es un archivo intermedio para conectar las variables del env para poder usarlas en todo el env
dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI
    }
}