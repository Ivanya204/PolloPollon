import app from "./app.js";
import "./database.js"

//Creo la funcion
//que se encarga de ejecutar el servidor
async function main() {
    app.listen(4000)
    console.log("Servidor en el puerto 4000")
}

main();