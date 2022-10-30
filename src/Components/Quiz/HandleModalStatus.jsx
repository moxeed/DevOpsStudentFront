import React, { useEffect, useState } from "react";
import {
  GetUserId,
  GetToken,
} from "../../Services/Authentication/useAuthentication";
import QuizTypeService from "../../Services/Quiz/QuizType";
import ModalStatus from "../Quiz/ModalStatus";
import { CircularProgress } from "@material-ui/core";
import ModalSelectMode from "./ModalSelectMode";

const HandleModalStatus = (QuizId, webinarId = null) => {
  const [data, setData] = useState(-5);
  const [quizMode, setQuizMode] = useState();
  const [isPdf, setIsPdf] = useState();
  const StudentId = GetUserId();
  useEffect(() => {
    if (!GetToken()) {
      setData(-3);
    } else if (QuizId === 0) {
      setData(-2);
    } else if (QuizId > 0 && StudentId > 0) {
      QuizTypeService.PostMain({ QuizId, StudentId })
        .then((res) => {
          setData(res.data.status);
          setQuizMode(res.data.quizMode);
          setIsPdf(res.data.isPdfMode ? "0" : "1");
        })
        .catch(() => {
          setData(-1);
        });
    } else {
      setData(-1);
    }
  }, [QuizId, StudentId]);

  const change = () => {
    switch (data) {
      case -3:
        return (
          <ModalStatus
            text="لطفا ابتدا وارد شوید"
            textButton="صفحه ورود"
            linkQuiz="/v2/Identity/login"
            secondButton="بستن پیام"
          />
        );
      case -2:
        return (
          <ModalStatus
            text="شما این همایش را خریداری نکرده اید"
            textButton=""
            linkQuiz=""
            secondButton="بستن پیام"
          />
        );
      case -1:
        return (
          <ModalStatus
            text="بررسی وضعیت آزمون به مشکل خورده است، به پشتیبانی اطلاع دهید"
            textButton="راه های تماس"
            linkQuiz="/aboutUs"
            secondButton="بستن پیام"
          />
        );
      case 0:
        return (
          <ModalSelectMode
            text={"برای شرکت در آزمون، نوع آزمون را انتخاب کنید"}
            quizId={QuizId}
            quizMode={quizMode}
            webinarId={webinarId}
          />
        );
      case 1:
        return (
          <ModalSelectMode
            text={"برای شرکت در آزمون، نوع آزمون را کلیک کنید"}
            quizId={QuizId}
            quizMode={quizMode}
            webinarId={webinarId}
          />
        );
      case 2:
        return (
          <ModalStatus
            text="شما قبلا در آزمون شرکت کرده اید. آیا مایل به دریافت کارنامه هستید؟"
            textButton="بله"
            linkQuiz={"/WorkBook/" + QuizId}
            secondButton="بستن پیام"
          />
        );
      case 3:
        return (
          <ModalStatus
            text="شما قبلا در آزمون شرکت کرده اید اما آن را به اتمام نرساندید، آیا میخواهید ادامه بدهید؟"
            textButton="بله"
            linkQuiz={"/Quiz/" + QuizId + "/" + isPdf + "/" + webinarId}
            secondButton=" خیر"
          />
        );
      case 4:
        return (
          <ModalStatus
            text="شما قبلا در آزمون شرکت کرده اید. در حال حاضر کارنامه ای موجود نمی باشد"
            textButton=""
            linkQuiz=""
            secondButton="بستن پیام"
          />
        );
      case 5:
        return (
          <ModalStatus
            text="برای شرکت در آزمون منتطر بمانید"
            textButton=""
            linkQuiz=""
            secondButton="بستن پیام"
          />
        );
      case 6:
        return (
          <ModalStatus
            text="در حال حاضر آزمون آماده نیست "
            textButton=""
            linkQuiz=""
            secondButton="بستن پیام"
          />
        );
      case 7:
        return (
          <ModalStatus
            text="آزمون دیگری برای شما در حال برگزاری است تا اتمام آزمون نمی توانید در آزمون دیگری شرکت کنید "
            textButton=""
            linkQuiz=""
            secondButton="بستن پیام"
          />
        );
      default:
        return (
          <div
            style={{
              width: "100%",
              display: "grid",
              placeItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        );
    }
  };
  return change();
};

export default HandleModalStatus;
