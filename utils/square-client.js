require("dotenv").config();
const _ = require("lodash"),
  { SQ_ACCESS_TOKEN_SB } = process.env,
  { v4: uuidv4 } = require("uuid"),
  { Client, Environment } = require("square"),
  sqClient = new Client({
    environment: Environment.Sandbox,
    accessToken: SQ_ACCESS_TOKEN_SB,
  }),
  { customersApi, ordersApi, catalogApi, paymentsApi } = sqClient,
  locationID = "L8PXVCEQ8KZ0F",
  objectID = "LU2M3XGZNTEPMGERKID5GGDG";

class SquareAPI {
  static async findCustomer(phoneNumber) {
    try {
      const { result } = await customersApi.searchCustomers({
        query: {
          filter: {
            phoneNumber: {
              exact: phoneNumber,
            },
          },
        },
      });
      return result;
    } catch (error) {
      console.log("findCustomerError: ", error);
    }
  }

  static async processPayment(customerID) {
    try {
      //Create order
      console.log("Creating order...");
      const { order } = await this.prototype.createOrder(customerID);

      //Process payment
      const { result } = await paymentsApi.createPayment({
        sourceId: "ccof:customer-card-id-ok", //|| customerObj.cards[0].id --sourceID(for production)
        idempotencyKey: uuidv4(),
        amountMoney: {
          amount: order.totalMoney.amount,
          currency: "USD",
        },
        autocomplete: true,
        orderId: order.id,
        customerId: customerID,
      });
      return result;
    } catch (error) {
      console.log("paymentError: ", error);
    }
  }

  async createOrder(customerID, quantity = "1") {
    try {
      const { result } = await ordersApi.createOrder({
        order: {
          locationId: locationID,
          customerId: customerID,
          lineItems: [
            {
              quantity: quantity,
              catalogObjectId: objectID,
            },
          ],
        },
        idempotencyKey: uuidv4(),
      });

      return result;
    } catch (error) {
      console.log("createOrderError: ", error);
    }
  }

  //-----------New Feature---------------
  static async getTotalTransactions(customerID) {
    try {
      const { orders } = await this.prototype.searchOrders(customerID);
      // console.log(Number(orders[0].totalMoney.amount) );

      let customerTransactions = [];
      orders.forEach(order =>
        customerTransactions.push(parseInt(order.totalMoney.amount) * 0.01),
      );
      let totalSpent = customerTransactions.reduce((a, b) => a + b);

      return this.prototype.currencyFormat(totalSpent);
    } catch (error) {
      console.log("transactionError: ", error);
    }
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
      console.log("searchOrderError: ", error);
    }
  }

  currencyFormat(amount) {
    let formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return formatter.format(amount);
  }
}

module.exports = SquareAPI;
