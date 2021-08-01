//Imagine customers were able to get their balance as well

//on home route, handle different types of text received.
if (!_.isEmpty(result)) {
  customer = result.customers[0];

  switch (cleanedBody) {
    case "charge":
      //process order payment
      console.log("Processing payment...");
      const { payment } = await sq.processPayment(customer);
      if (payment.status === "COMPLETED") {
        //send success message
        console.log("Sending response... ");
        tw.sendSuccessMessage(customer);
      }
      break;
      case "balance":
          //get total transactions
          console.log('Getting transactions ...');
          const { orders } = await sq.getTotalTransactions(customer.id);


          
  }
}


let totalMoneyArray = [];
orders.forEach(orderObj => {
    totalMoneyArray.push(orderObj.totalMoney.amount);
});
const totalSpent = totalMoneyArray.reduce((a, b) => a + b);



///////////////////////
static async getTotalTransactions(customerID) {
    const { orders } = await this.prototype.searchOrders(customerID);
    let customerTransactions = [];
    orders.forEach(order => customerTransactions.push(order.totalMoney.amount));
    let totalSpent = customerTransactions.reduce((a, b) => a + b);
    return totalSpent;
  }

  async searchOrders(customerID) {
    try {
      const { result } = await ordersApi.searchOrders({
        locationIds: [locationID],
        query: {
          filter: {
            stateFilter: {
              states: ["COMPLETED"],
            },
            customerFilter: {
              customerIds: [customerID],
            },
          },
        },
      });

      return result;
    } catch (error) {
      console.log("searchError: ", error);
    }
  }