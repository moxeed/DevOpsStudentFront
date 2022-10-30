import { IdentitySendRequest } from "./engine/IdentityAPI";

const Route = {
  sendOTP: "SendOTP",
  signUp: "",
};

const RequestRoute = (route) => "Register/" + route;

export const RegisterService = {
  sendOTP: async (body) =>
    await IdentitySendRequest(RequestRoute(Route.sendOTP), body),
  signUp: async (body) =>
    await IdentitySendRequest(RequestRoute(Route.signUp), body),
};
