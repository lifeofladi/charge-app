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

  static async createOrder(customerObj, quantity = "1") {
    try {
      const { result } = await ordersApi.createOrder({
        order: {
          locationId: locationID,
          customerId: customerObj.id,
          lineItems: [
            {
              quantity: quantity,
              catalogObjectId: objectID,
            },
          ],
        },
        idempotencyKey: uuidv4(),
      });

      return result.order;
    } catch (error) {
      console.log("createOrderError: ", error);
    }
  }
  //|| customerObj.cards[0].id
  static async processPayment(orderObj, customerObj) {
    try {
      const { result } = await paymentsApi.createPayment({
        sourceId: "ccof:customer-card-id-ok",
        idempotencyKey: uuidv4(),
        amountMoney: {
          amount: orderObj.totalMoney.amount,
          currency: "USD",
        },
        autocomplete: true,
        orderId: orderObj.id,
        customerId: customerObj.id,
      });
      return result.payment;
    } catch (error) {
      console.log("paymentError: ", error);
    }
  }

  static async updateOrder(orderObj, customerObj) {
    try {
      const response = await ordersApi.updateOrder(orderObj.id, {
        order: {
          locationId: locationID,
          customerId: customerObj.id,
          state: "COMPLETED",
        },
        idempotencyKey: uuidv4(),
      });
    } catch (error) {
      console.log("updateError: ", error);
    }
  }
}

module.exports = SquareAPI;
