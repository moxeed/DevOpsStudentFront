import HttpEngine from "../Engines/CoreEngine";
import Examengine from "../Engines/APIConfigurationQuiz";
const routes = {
  providerPackges: "/product/{0}/Provider/{1}/QuizOnline/{3}",
};

const QuizSerivce = {
  GetProviderPackages: (categoryId, providerId) =>
    HttpEngine.Get((routes.providerPackges, categoryId, providerId)),
  GetMainFilter: () => Examengine.Get("/Main/"),
  GetMain: (category, filters) =>
    Examengine.Post("/Main/", { category, filters }),
};

export default QuizSerivce;
