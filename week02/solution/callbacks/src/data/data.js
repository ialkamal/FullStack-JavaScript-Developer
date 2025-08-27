const dotenv = require("dotenv").config();
const { getData } = require("../helpers/helpers");

const USERS = process.env.USERS;
const ORDERS = process.env.ORDERS;

const getUser = (userId, cb) => {
  getData(USERS, (err, users) => {
    if (err) {
      return cb(err, null);
    }

    const [user] = users?.filter((user) => user.id === +userId);
    if (!user) {
      return cb(new Error("no user found!"), null);
    }

    cb(null, user);
  });
};

const getOrder = (orderId, cb) => {
  getData(ORDERS, (err, orders) => {
    if (err) {
      return cb(err, null);
    }

    const [order] = orders?.filter((order) => order.order_number === +orderId);
    if (!order) {
      return cb(new Error("no order found!"), null);
    }

    cb(null, order);
  });
};

module.exports = { getUser, getOrder };
