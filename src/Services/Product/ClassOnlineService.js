import HttpEngine from "../Engines/CoreEngine";
import Formatter from "../../Utility/StringFormatter";
const routes = {
  Filters: "Product/Filters/",
  Products: "/Product/",
  SingleProduct: "/Product/",
  ProductProviders: "/Product/{0}/{1}/provider",
  ProductContentDto: "/Content/GetContents",
};

const ClassOnlineService = {
  GetFilters: async (category, selectedFilters) =>
    await HttpEngine.Post(routes.Filters + category, {
      filters: selectedFilters,
    }),
  GetProducts: (category, filters) =>
    HttpEngine.Post(routes.Products + category, { filters }),
  GetSingleProduct: async (packageId, category) => {
    const { data } = await HttpEngine.Get(
      routes.SingleProduct + category + "/" + packageId
    );
    return data;
  },
  GetWebinarPosters: () => HttpEngine.Get("BasicInfo/WebinarSlider"),
  GetProductProviders: async (productId, category) =>
    await HttpEngine.Get(
      Formatter(routes.ProductProviders, category, productId)
    ),
};

export default ClassOnlineService;
