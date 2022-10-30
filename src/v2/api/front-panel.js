import { APIPanelGet, APIPanelPost } from "./engine";

const Routes = {
  orders: "orders",
  text: "text",
  filter: "filter",
  poster: "poster",
  video: "video",
  rayan: "rayanclass",
  rayanLink: "rayanlink",
  rayancount: "rayancount",
  readTicket: "ticket/read?id=",
};

export const PanelService = {
  GetOrders: async () => await APIPanelGet(Routes.orders),
  GetPosters: async () => await APIPanelGet(Routes.poster),
  GetTextWithKey: async (section) =>
    await APIPanelGet(Routes.text + "?section=" + section),
  GetFilterWithKey: async (section) =>
    await APIPanelGet(Routes.filter + "?section=" + section),
  GetVideoByKey: async (section) =>
    await APIPanelGet(Routes.video + "?name=" + section),
  GetRayanClass: async () => await APIPanelGet(Routes.rayan),
  GetRayanLink: async (userId, courseId) =>
    await APIPanelPost(Routes.rayanLink, { userId, courseId }),
  GetRayanCount: async (courseId) =>
    await APIPanelGet(Routes.rayancount + "?courseId=" + courseId),
  ReadTicket: async (id) => await APIPanelGet(Routes.readTicket + id),
};
