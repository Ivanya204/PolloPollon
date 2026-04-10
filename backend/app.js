import express from "express"
import routerProducts from "./src/routes/products.js";
import routerBranches from "./src/routes/branches.js";
import routerEmployees from "./src/routes/employees.js"
import routerReviews from "./src/routes/reviews.js"
import routerProviders from "./src/routes/providers.js"
import routerCustomer from "./src/routes/customers.js"
import routerRegisterCustomer from "./src/routes/registerCustomer.js"
import routerRegisterEmployee from "./src/routes/registerEmployee.js"
import cookieParser from "cookie-parser";

//ejecutar express
const app = express();

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//Creamos los endpoints
app.use("/api/products", routerProducts)
app.use("/api/branches", routerBranches)
app.use("/api/employees", routerEmployees)
app.use("/api/reviews", routerReviews)
app.use("/api/provider", routerProviders)
app.use("/api/customers", routerCustomer)
app.use("/api/registreCustomers", routerRegisterCustomer)


export default app;
