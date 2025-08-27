import dotenv from "dotenv";
import { getData } from "../helpers/helpers.js";

dotenv.config();

const USERS = process.env.USERS;
const ORDERS = process.env.ORDERS;

const getUser = async (userId) => {
  const users = await getData(USERS);
  const [user] = users?.filter((user) => user.id === +userId);

  if (!user) throw new Error("no user found!");

  return user;
};

const getOrder = async (orderId) => {
  const orders = await getData(ORDERS);
  const [order] = orders?.filter((order) => order.order_number === +orderId);

  if (!order) throw new Error("no order found!");

  return order;
};

export { getUser, getOrder };
