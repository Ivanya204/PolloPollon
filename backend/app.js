import express from "express"
import routerProducts from "./src/routes/products.js";
import routerBranches from "./src/routes/branches.js";
import routerEmployees from "./src/routes/employees.js"
import routerReviews from "./src/routes/reviews.js"
import routerProviders from "./src/routes/providers.js"
import routerCustomer from "./src/routes/customers.js"
import routerRegisterCustomer from "./src/routes/registerCustomer.js"
import routerLoginCustomer from "./src/routes/loginCustomer.js";
import routerLogout from "./src/routes/logout.js"
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import cookieParser from "cookie-parser";
import limiter from "./src/middlewares/limiter.js";

//ejecutar express
const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    credetial: true
}))

app.use(limiter)
app.use(cookieParser())

app.use(express.json())
//Creamos los endpoints
app.use("/api/products",  routerProducts)
app.use("/api/branches",  routerBranches)
app.use("/api/employees",  routerEmployees)
app.use("/api/reviews",  routerReviews)
app.use("/api/provider",  routerProviders)
app.use("/api/customers",  routerCustomer)
app.use("/api/registreCustomers", routerRegisterCustomer)
app.use("/api/loginCustomers", routerLoginCustomer )
app.use("/api/logout",  routerLogout)
app.use("/api/recoveryPassword", recoveryPasswordRoutes)

export default app;
