import HttpEngine from "../Engines/CoreEngine";

const routes = {
  getProfile: "/Provider/GetProviderProfile?providerId=",
  getTutoringProviderProfile:
    "/Provider/GetTutoringProviderProfile?providerId=",
  getProviderWorkBooks: "/package/Factor/",
};

const ProviderService = {
  GetProfile: async (id) => await HttpEngine.Get(routes.getProfile + id),
  GetAchievement: async (id) =>
    await HttpEngine.Get(`Provider/GetProviderAchievement?providerId=${id}`),
  GetWorkBook: async (providerId, testDate) =>
    await HttpEngine.Get(
      `Provider/GetProviderWorkBooks?providerId=${providerId}&testDate=${testDate}`
    ),
  GetProviderFilter: () => HttpEngine.Get("Provider/Filters"),
  GetTutoringFilter: (category, selectedFilters) =>
    HttpEngine.Get(`Provider/Filters?groupId=${selectedFilters?.GroupIds[0]}`),
  GetProviders: async (category, filters) => {
    const { data, ...res } = await HttpEngine.Post(
      "Provider/" + category,
      filters
    );

    const filtered = data.filter(
      (item) =>
        item.providerId !== 21087 &&
        item.providerId !== 18064 &&
        item.providerId !== 18065 &&
        item.providerId !== 18067 &&
        item.providerId !== 18063
    );

    return new Promise(function (resolve) {
      resolve({ data: filtered, ...res });
    });
  },
  GetTutoringProviderProfile: async (id) =>
    await HttpEngine.Get(routes.getTutoringProviderProfile + id),
};

export default ProviderService;
