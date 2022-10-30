import HttpEngine from "../Engines/CoreEngine";
import Formatter from "../../Utility/StringFormatter";
import ApIConfigurationBroadCast from "../Engines/ApIConfigurationBroadCast";
import QuizEngine from "../Engines/APIConfigurationQuiz";
const routes = {
  Filters: "Product/Filters/",
  Products: "/Product/",
  SingleProduct: "/Product/",
  ProductProviders: "/Product/{0}/{1}/provider/",
  GetFilters: "/webinar/getfilters",
  GetAllFilters: "/main/GetQuizFilters",
};

const ClassOnlinePakageService = {
  GetFilters: async (category, selectedFilters) =>
    await HttpEngine.Post(routes.Filters + category, {
      filters: selectedFilters,
    }),
  GetAllFilters: async (selectedFilters) =>
    await QuizEngine.Post(routes.GetAllFilters, selectedFilters),
  GetFiltersBroadCast: async (selectedFilters) =>
    await ApIConfigurationBroadCast.Post(routes.GetFilters, {
      filters: selectedFilters,
    }),
  GetProducts: (category, filters) =>
    HttpEngine.Post(routes.Products + category, { category, filters }),
  GetSingleProduct: async (packageId, category) => {
    const { data } = await HttpEngine.Get(
      routes.SingleProduct + category + "/" + packageId
    );
    return data;
  },
  GetProductProviders: async (productId, category) =>
    await HttpEngine.Get(
      Formatter(routes.ProductProviders, category, productId)
    ),
};

export default ClassOnlinePakageService;
