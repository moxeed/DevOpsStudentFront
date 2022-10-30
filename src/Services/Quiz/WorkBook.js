import Examengine from "../Engines/APIConfigurationQuiz";
import { GetUserId } from "../../Services/Authentication/useAuthentication";
const routes = {
  WorkBook: "/OnlineQuiz/WorkBook/",
  QuizDetails: "/OnlineQuiz/QuizDetails/",
};
const WorkBooks = {
  GetWorkBook: async (ExamId) =>
    await Examengine.Get(routes.WorkBook + ExamId + "/" + GetUserId()),
  GetQuizDetails: async (QuizId) =>
    await Examengine.Get(routes.QuizDetails + QuizId),
};

export default WorkBooks;
