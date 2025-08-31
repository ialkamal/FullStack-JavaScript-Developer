import { Router } from "express";
import { getOrders } from "../../data/index";
import { ORDER } from "../../types";
import { auth } from "../../middleware/index";

const orderRoutes = Router();

orderRoutes.get("/", auth, async (req, res) => {
  const orders: ORDER[] = await getOrders();

  if (orders && orders.length > 0) {
    res.status(200).send(JSON.stringify(orders));
  } else {
    res.status(404).send(JSON.stringify({ error: "Orders not found" }));
  }
});

export default orderRoutes;
