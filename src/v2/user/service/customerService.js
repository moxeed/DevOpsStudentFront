import { IdentitySendRequest } from "./engine/IdentityAPI";

const Route = {
  customerInfo: "CustomerInfo",
};

const RequestRoute = (route) => "Customer/" + route;

export const CustomerService = {
  customerInfo: async () =>
    await IdentitySendRequest(RequestRoute(Route.customerInfo)),
};
