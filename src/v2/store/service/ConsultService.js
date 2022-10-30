import { SendRequest } from "src/v2/components/engine/API";

const BaseUrl = window.config.API_BASE;

export const ConsultService = {
  GET: async (route) => SendRequest(BaseUrl + "/" + route),
  POST: async (route, body = {}) => SendRequest(BaseUrl + "/" + route, body),
};
