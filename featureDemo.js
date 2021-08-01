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
      console.log("Getting transactions ...");
      const { orders } = await sq.getTotalTransactions(customer.id);
  }
}
if (!_.isEmpty(result) && cleanedBody === "charge") {
  customer = result.customers[0];
  //process order payment
  console.log("Processing payment...");
  const { payment } = await sq.processPayment(customer.id);
  if (payment.status === "COMPLETED") {
    //send success message
    console.log("Sending response... ");
    tw.sendSuccessMessage(customer);
  }
}
