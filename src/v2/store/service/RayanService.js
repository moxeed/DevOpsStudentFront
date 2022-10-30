import { SendRequest } from "src/v2/api/engine";

const BaseUrl = window.config.API_ORIGINAL;

const api = {
  GET: async (route) => SendRequest(BaseUrl + "/" + route),
  POST: async (route, body = {}) => SendRequest(BaseUrl + "/" + route, body),
};
const Class =
  window.location.hostname === "localhost" ||
  window.location.hostname === "app.bamis.ir"
    ? "dev/class"
    : "class";

export const RayanService = {
  Products: async (filters, id) =>
    api.POST("public/rayan/product", {
      orderBy: filters.orderBy,
      ascending: filters.orderBy === "id" ? false : filters.ascending,
      page: filters.page,
      length: filters.length,
      filters: {
        name: { like: filters.search },
        id: { equalTo: Number(id) ?? "" },
      },
    }),
  Link: async (cid, user) =>
    api.GET(Class + "/link?courseId=" + cid + "&userCode=" + user),
  Purchase: async (body) => api.POST(Class + "/purchase", body),
  ProductCourse: async (pid) => api.GET(Class + "/course?productId=" + pid),
  ProductById: async (pid, user) =>
    api.GET(Class + "/product?productId=" + pid + "&userCode=" + user),
};
