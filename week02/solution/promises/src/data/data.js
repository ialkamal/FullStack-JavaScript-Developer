const dotenv = require("dotenv").config();
const { getData } = require("../helpers/helpers");

const USERS = process.env.USERS;
const ORDERS = process.env.ORDERS;

const getUser = (userId) => {
  return getData(USERS).then((users) => {
    const [user] = users?.filter((user) => user.id === +userId);

    if (!user) throw new Error("no user found!");

    return user;
  });
};

const getOrder = (orderId) => {
  return getData(ORDERS).then((orders) => {
    const [order] = orders?.filter((order) => order.order_number === +orderId);

    if (!order) throw new Error("no order found!");

    return order;
  });
};

module.exports = { getUser, getOrder };
