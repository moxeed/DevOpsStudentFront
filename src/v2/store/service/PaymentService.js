import { SendRequest } from "src/v2/api/engine";

const BaseUrl = window.config.API_ORIGINAL;

const api = {
  GET: async (route) => SendRequest(BaseUrl + "/store/" + route),
  POST: async (route, body = {}) =>
    SendRequest(BaseUrl + "/store/" + route, body),
};

export const PaymentService = {
  Order: async (id) => await api.GET("order?id=" + id),

  Pay: async (id) => await api.POST("order/pay", { id: Number(id) }),
};
