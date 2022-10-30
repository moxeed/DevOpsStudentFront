import HttpEngine from "../Engines/CoreEngine";

const routes = {
  ratingFactors: "/Activity/Rate",
};

const RatingService = {
  GetRatingFactors: async (id) =>
    await HttpEngine.Get(routes.ratingFactors + "/" + id),
  PostRatingResult: (data) => HttpEngine.Post(routes.ratingFactors, data),
};

export default RatingService;
