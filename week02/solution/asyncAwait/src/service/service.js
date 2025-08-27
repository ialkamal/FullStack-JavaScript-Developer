import { getUser, getOrder } from "../data/data.js";

const processOrder = async (userId) => {
  const user = await getUser(userId);
  const order = await getOrder(user?.order_number);
  const processedOrder = {
    ...user,
    ...order,
    status: "Your order has been processed successfully.",
  };
  return processedOrder;
};

export { processOrder };
