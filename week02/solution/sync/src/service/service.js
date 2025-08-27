const { getUser, getOrder } = require("../data/data");

const processOrder = (userId) => {
  const user = getUser(userId);
  const order = getOrder(user?.order_number);
  const processedOrder = {
    ...user,
    ...order,
    status: "Your order has been processed successfully.",
  };
  return processedOrder;
};

module.exports = { processOrder };
