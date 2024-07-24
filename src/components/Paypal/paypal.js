import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

const Paypal = ({
  sum,
  transactionSuccess,
  transactionCancel,
  transactionError,
}) => {
  const onSuccess = (payment) => {
    transactionSuccess(payment);
  };
  const onCancel = (data) => {
    transactionCancel(data);
  };
  const onError = (err) => {
    transactionError(err);
  };

  let env = "sandbox"; // you can set here to 'production' for production
  let currency = "USD"; // or you can set this value from your props or state
  let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
  // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

  const client = {
    sandbox: "AS3fi5SheJtk8x2XrLnZ40F_rBsTZfLuSG9O-pjB52FjFE9q22Q3WA2b8ghQTe2fxPzZCto86E5g9ldU",
    production: "YOUR-PRODUCTION-APP-ID",
  };
  // In order to get production's app-ID, you will have to send your app to Paypal for approval first
  // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
  //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
  // For production app-ID:
  //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

  // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={total}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
    />
  );
};
export default Paypal