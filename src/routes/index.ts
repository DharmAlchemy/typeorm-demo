import { Router, Request, Response } from "express";
import user from "./user";
import product from "./product"
import hobbies  from "./hobbies";

const routes = Router();

routes.use("/user", user);

routes.use("/product", product)

routes.use("/hobbies",hobbies)

export default routes;