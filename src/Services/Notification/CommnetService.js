import HttpsEngine from "../Engines/APICore";

const Routes = {
  SendComment: "/communication/comment",
  ReciveComment: "/communication/comment/",
};

const CommentService = {
  SendComment: (comment) => HttpsEngine.Post(Routes.SendComment, comment),
  ReciveComment: (identifier) =>
    HttpsEngine.Get(Routes.ReciveComment + identifier),
};

export default CommentService;
