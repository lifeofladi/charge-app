require("dotenv").config();
const _ = require("lodash"),
  { SQ_ACCESS_TOKEN_SB } = process.env,
  { v4: uuidv4 } = require("uuid"),
  { Client, Environment } = require("square"),
  sqClient = new Client({
    environment: Environment.Sandbox,
    accessToken: SQ_ACCESS_TOKEN_SB,
  }),
  { customersApi, ordersApi } = sqClient,
  locationID = "L8PXVCEQ8KZ0F";

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

  static async createOrder(customerID) {
    try {
      const { result } = await ordersApi.createOrder({
        order: {
          locationId: locationID,
          customerId: customerID,
          lineItems: [
            {
              quantity: "1",
              catalogObjectId: "LU2M3XGZNTEPMGERKID5GGDG",
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

  async getLocationID() {}
}

module.exports = SquareAPI;
