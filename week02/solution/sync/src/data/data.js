const dotenv = require("dotenv").config();
const { getData } = require("../helpers/helpers");

const USERS = process.env.USERS;
const ORDERS = process.env.ORDERS;

const getUser = (userId) => {
  const users = getData(USERS);
  console.log(users);
  const [user] = users?.filter((user) => user.id === +userId);

  if (!user) throw new Error("no user found!");

  return user;
};

const getOrder = (orderId) => {
  const orders = getData(ORDERS);
  const [order] = orders?.filter((order) => order.order_number === +orderId);
  return order;
};

module.exports = { getUser, getOrder };
