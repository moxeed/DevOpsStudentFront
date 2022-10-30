import { IdentitySendRequest } from "./engine/IdentityAPI";

const Route = {
  sendResetLink: "SendResetLink",
  resetPassword: "ResetPassword",
  changePassword: "ChangePassword",
};

const RequestRoute = (route) => "Password/" + route;

export const PasswordService = {
  sendResetLink: async (body) =>
    await IdentitySendRequest(RequestRoute(Route.sendResetLink), body),
  resetPassword: async (key, body) =>
    await IdentitySendRequest(
      RequestRoute(Route.resetPassword) + "?BAT=" + key,
      body
    ),
  changePassword: async (body) => {
    return await IdentitySendRequest(RequestRoute(Route.changePassword), body);
  },
};
