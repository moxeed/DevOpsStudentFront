import { IdentitySendRequest } from "./engine/IdentityAPI";

const Route = {
  sendOTP: "ConfirmPhoneNumber/SendOTP",
  confirmPhoneNumber: "ConfirmPhoneNumber",
  completeProfile: "CompleteProfile",
};

const RequestRoute = (route) => "Profile/" + route;

export const profileService = {
  sendOTP: async (body) =>
    await IdentitySendRequest(RequestRoute(Route.sendOTP), body),
  confirmPhoneNumber: async (body) =>
    await IdentitySendRequest(RequestRoute(Route.confirmPhoneNumber), body),
  completeProfile: async (body) =>
    await IdentitySendRequest(RequestRoute(Route.completeProfile), body),
};
