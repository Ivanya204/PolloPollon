import express from "express"
import routerProducts from "./src/routes/products.js";
import routerBranches from "./src/routes/branches.js";
import routerEmployees from "./src/routes/employees.js"
import routerReviews from "./src/routes/reviews.js"
import routerProviders from "./src/routes/providers.js"

//ejecutar express
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//Creamos los endpoints
app.use("/api/products", routerProducts)
app.use("/api/branches", routerBranches)
app.use("/api/employees", routerEmployees)
app.use("/api/reviews", routerReviews)
app.use("/api/provider", routerProviders)

export default app;
