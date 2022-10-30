import HttpEngine from "../Engines/CoreEngine";
import HttpEngineBroadCast from "../Engines/ApIConfigurationBroadCast";
import HttpEngineProvider from "../Engines/APIConfigurationProvider";
import Formatter from "../../Utility/StringFormatter";
const routes = {
  providerServices: "/Service/{0}/Provider/{1}",
  packageFactor: "/product/{0}/{1}/Purchase",
  serviceVitrine: "/Service/",
  productVitrine: "/Product/Vitrine/",
  subCategories: "/Service/subCategories/",
  AttemptTutoring: "Tutoring/AttemptTutoring",
};

const ProductService = {
  GetProviderServices: (categoryId, providerId) =>
    HttpEngine.Get(Formatter(routes.providerServices, categoryId, providerId)),
  GetPurchaseAbleItems: async (subCategory, productId) => {
    const { data } = await HttpEngine.Get(
      Formatter(routes.packageFactor, subCategory, productId)
    );
    return data;
  },
  GetSubCategories: (category) =>
    HttpEngine.Get(routes.subCategories + category),
  GetServiceVitrine: async (category, providerId) => {
    const { data } = await HttpEngine.Get(
      routes.serviceVitrine + category + "/" + providerId
    );
    return data;
  },
  GetServiceVitrineTouring: async (category, providerId, courseId) => {
    const { data } = await HttpEngine.Get(
      `/Service/${category}/${providerId}?courseId=${courseId}`
    );
    return data;
  },
  GetCheckAnotherCa: async (providerId) => {
    const { data } = await HttpEngineBroadCast.Post(
      `/Tutoring/CheckAnotherCall?providerId=${providerId}`
    );
    return data;
  },
  GetCheckSkyService: async () => {
    const { data } = await HttpEngineBroadCast.Get(
      "/Tutoring/CheckSkyServiceExpiration"
    );
    return data;
  },

  GetProductVitrine: async (subCategory, productId) => {
    const { data } = await HttpEngine.Get(
      routes.productVitrine + subCategory + "/" + productId
    );
    return data;
  },
  GetServiceProvidrTimeSheet: async (providerId) => {
    const { data } = await HttpEngineProvider.Post(
      "/TimeSheet/GetProviderTimeSheets",
      {
        providerId,
      }
    );
    return data;
  },
  MyPendingTutorings: async (studentId, providerId) => {
    const { data } = await HttpEngineBroadCast.Get(
      `/Tutoring/MyPendingTutorings/${studentId}/${providerId}`,
      {
        studentId,
        providerId,
      }
    );
    return data;
  },
  AttemptTutoring: ({ tutoringId, studentId }) =>
    HttpEngineBroadCast.Post(routes.AttemptTutoring, {
      tutoringId,
      studentId,
    }),

  GetServiceContent: async (providerId, id) => {
    const { data } = await HttpEngineProvider.Get(
      `/Content/Download/${id}/${providerId}`
    );
    return data;
  },
  GetSubscriptionsByPhoneNumber: async (phoneNumber) => {
    return await HttpEngineBroadCast.Get(
      "/Webinar/GetSubscriptionsByPhoneNumber/" + phoneNumber
    );
  },
};

export default ProductService;
