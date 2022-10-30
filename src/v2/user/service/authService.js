import { IdentitySendRequest } from "./engine/IdentityAPI";

const Route = {
  login: "Login",
  inquiry: "Inquiry",
  renew: "Renew",
};

const RequestRoute = (route) => "Auth/" + route;

export const AuthService = {
  login: async (body) =>
    await IdentitySendRequest(RequestRoute(Route.login), body),
  inquiry: async (body) =>
    await IdentitySendRequest(RequestRoute(Route.inquiry), body),
  renew: async () => await IdentitySendRequest(RequestRoute(Route.renew)),
};
