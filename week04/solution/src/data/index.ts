import dotenv from "dotenv";
import { promises as fs } from "fs";
import { USER, ORDER } from "../types";

dotenv.config();
const usersPath = process.env.USERS;
const ordersPath = process.env.ORDERS;

export const getUsers = async (): Promise<USER[]> => {
  if (!usersPath) {
    throw new Error("USERS environment variable is not defined");
  }
  try {
    const fileData = await fs.readFile(usersPath, "utf-8");
    const users = JSON.parse(fileData);
    return users;
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    return [];
  }
};

export const addUser = async (newUser: USER): Promise<USER | undefined> => {
  if (!usersPath) {
    throw new Error("USERS environment variable is not defined");
  }
  try {
    const fileData = await fs.readFile(usersPath, "utf-8");
    const orders: USER[] = JSON.parse(fileData);
    orders.push(newUser);
    await fs.writeFile(usersPath, JSON.stringify(orders, null, 2), "utf-8");
    return newUser;
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    return undefined;
  }
};

export const getOrders = async (): Promise<ORDER[]> => {
  if (!ordersPath) {
    throw new Error("ORDERS environment variable is not defined");
  }
  try {
    const fileData = await fs.readFile(ordersPath, "utf-8");
    const orders = JSON.parse(fileData);
    return orders;
  } catch (err: unknown) {
    if (err instanceof Error) console.log(err.message);
    return [];
  }
};
