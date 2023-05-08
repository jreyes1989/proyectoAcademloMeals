let total = 0;
const addOrders = (price) => {
  return (total += price);
};

total = addOrders(150);
total = addOrders(150);

console.log(total);

module.exports = addOrders;
