const { getUser, getOrder } = require("../data/data");

const processOrder = (userId) => {
  return getUser(userId).then((user) => {
    return getOrder(user?.order_number).then((order) => {
      const processedOrder = {
        ...user,
        ...order,
        status: "Your order has been processed successfully.",
      };
      return processedOrder;
    });
  });
};

module.exports = { processOrder };
