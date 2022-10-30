import Examengine from "../Engines/APIConfigurationQuiz";
import Formatter from "../../Utility/StringFormatter";

const routes = {
  PdfMode: "/OnlineQuiz/Quiz/PdfMode/",
  QuizType: "/QuizType/",
  OnlineMode: "/OnlineQuiz/Quiz/GetQuestion/",
  ConfirmTheResult: "/OnlineQuiz/Confirm/",
  QuizInformaition: "/OnlineQuiz/Quiz/Download/",
 BuyQuiz: "/Main/api/BuyQuiz/",
  Main: "/Main",
};
const QuizTypeService = {
  GetQuizType: async ({ QuizId, StudentId, PdfMode, webinarId }) => {
    return await Examengine.Post(routes.QuizType, {
      QuizId,
      StudentId,
      PdfMode,
      webinarId,
    });
  },
  GetPdfMode: async (ExamId) => await Examengine.Get(routes.PdfMode + ExamId),

  GetInOnlineMode: (ExamId, QuestionNo) =>
    Examengine.Get(Formatter(routes.OnlineMode + ExamId + "/" + QuestionNo)),

  GetAnswerQuiz: ({ Examid, QuestionNo, AnswerNum, Mark, SituationMark }) => {
    return Examengine.Post("/OnlineQuiz/Quiz", {
      Examid,
      QuestionNo,
      AnswerNum,
      Mark,
      SituationMark,
    });
  },

  GetConfirmTheResult: ({ IsConfirmed, ExamId }) =>
    Examengine.Post(routes.ConfirmTheResult, { IsConfirmed, ExamId }),
  PostBuyQuiz: ({ QuizId, StudentId }) =>
    Examengine.Post(routes.BuyQuiz + QuizId + "/" + StudentId),
  GetQuizInformaition: async (ExamId) =>
    await Examengine.Get("/OnlineQuiz/Confirm/" + ExamId),
  PostMain: ({ QuizId, StudentId }) => {
    return Examengine.Post(routes.Main, { QuizId, StudentId });
  },
};

export default QuizTypeService;
