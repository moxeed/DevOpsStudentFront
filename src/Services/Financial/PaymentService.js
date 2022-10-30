import HttpEngine from "../Engines/CoreEngine";
import Formatter from "../../Utility/StringFormatter";

const routes = {
  walletTerminal: "/Payment/wallet/{0}",
  orderTerminal: "/Payment/Order/{0}",
  confirmPayment: "/payment?Authority={0}",
};

const PaymentSerivce = {
  GetTerminalForAddWallet: (amount) =>
    HttpEngine.Get(Formatter(routes.walletTerminal, amount)),
  GetTerminalForOrder: (orderId) =>
    HttpEngine.Get(Formatter(routes.orderTerminal, orderId)),
  ConfirmPayment: (authority) =>
    HttpEngine.Get(Formatter(routes.confirmPayment, authority)),
};

export default PaymentSerivce;
