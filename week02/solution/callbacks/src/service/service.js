const { getUser, getOrder } = require("../data/data");

const processOrder = (userId, callback) => {
  getUser(userId, (err, user) => {
    if (err) {
      return callback(err, null);
    }
    
    console.log(user);
    
    getOrder(user?.order_number, (err, order) => {
      if (err) {
        return callback(err, null);
      }
      
      const processedOrder = {
        ...user,
        ...order,
        status: "Your order has been processed successfully.",
      };
      
      callback(null, processedOrder);
    });
  });
};

module.exports = { processOrder };
