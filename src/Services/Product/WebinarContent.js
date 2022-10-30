import HttpEngine from "../Engines/CoreEngine";
import HttpEngineBroadCas from "../Engines/ApIConfigurationBroadCast";
const routes = {
  ProductContentDto: "/Content/GetContents",
  Filter: "/webinar/GetByFilter",
  GetAll: "/webinar/GetAll",
  ProductProviders: "/Webinar/GetByProductId/",
  Status: "/Webinar/GetStatus",
  GetTopWebinars: "/webinar/GetTopWebinars",
};

const WebinarContent = {
  GetProductContentDto: async (productId) =>
    await HttpEngine.Post(routes.ProductContentDto, [productId]),
  GetStatus: async (data) => await HttpEngineBroadCas.Post(routes.Status, data),
  GetProducts: async (selectedFilters) =>
    await HttpEngineBroadCas.Post(routes.Filter, {
      filters: selectedFilters,
    }),
  GetSingleProduct: async (productId) =>
    await HttpEngineBroadCas.Get(routes.ProductProviders + productId),
  GetTopWebinars: async () =>
    await HttpEngineBroadCas.Get(routes.GetTopWebinars),
};

export default WebinarContent;
