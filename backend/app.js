import express from "express"
import routerProducts from "./src/routes/products.js";
import routerBranches from "./src/routes/branches.js";

//ejecutar express
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//Creamos los endpoints
app.use("/api/products", routerProducts)
app.use("/api/branches", routerBranches)
export default app;
