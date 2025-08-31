import { Router } from "express";
import userRoutes from "./api/users";
import orderRoutes from "./api/orders";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("API is up!");
});

routes.get("/login", (req, res) => {
  res.send("You have to login first!");
});

routes.use("/users", userRoutes);
routes.use("/orders", orderRoutes);

export default routes;
