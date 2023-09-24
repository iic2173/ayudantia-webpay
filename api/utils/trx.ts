import { WebpayPlus } from 'transbank-sdk';
import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk'; // ES6 Modules
import Transaction from 'transbank-sdk/dist/es5/transbank/webpay/webpay_plus/transaction';


let tx: Transaction ;

declare global {
  var __tx__: Transaction | undefined;
}

if (process.env.NODE_ENV === "production") {
  tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));
} else {
  if (!global.__tx__) {
    global.__tx__ = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));
  }
  tx = global.__tx__;
}

export { tx };
