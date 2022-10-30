import React, { useState, useEffect } from "react";
import OnlineQuiz from "./OnlineMode/HandleQuectionCantiner";
import PdfQuiz from "./PdfMode/PdfQuiz";
import PdfQuizMobile from "../Quiz/MobilePdfMode/PdfQuiz";
import Hidden from "@material-ui/core/Hidden";
import QuizTypeService from "../../Services/Quiz/QuizType";
import { useParams } from "react-router-dom";
import { GetUserId } from "../../Services/Authentication/useAuthentication";
import {
  ShowLoading,
  HideLoading,
} from "../../Services/StoreSlices/LoadingSlice";
import { useDispatch } from "react-redux";
import { zeroPad } from "react-countdown";
import ModalReadyWorkBook from "./ModalReadyWorkBook";
import ModalConfirmGroupExam from "./ModalConfirmGroupExam";
const QuizHandler = () => {
  const [examId, setExamId] = useState();
  const { quizId, quizMode, webinarId } = useParams();
  const [open, setOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [isReady, setIsReady] = useState();
  const [status, setStatus] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ShowLoading());
    QuizTypeService.GetQuizType({
      QuizId: +quizId,
      StudentId: GetUserId(),
      PdfMode: quizMode === "1" ? false : true,
      webinarId: +webinarId,
    })
      .then((ress) => {
        setStatus(ress.data);

        if (ress.data <= 0) {
          setShowModal(true);
        } else {
          setExamId(ress.data);
        }
      })
      .finally(() => {
        dispatch(HideLoading());
      });
  }, [quizMode, quizId, dispatch]);

  const handleComplete = () => {
    return QuizTypeService.GetConfirmTheResult({
      IsConfirmed: true,
      ExamId: examId,
    }).then((res) => {
      setIsReady(res.data);
      setOpen(true);
    });
  };
  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span>
        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };
  useEffect(() => {
    if (examId && quizMode === "1") {
      QuizTypeService.GetInOnlineMode(examId, 1).then((res) => {
        if (res?.success === false) {
          handleComplete();
        }
      });
    } else if (examId && quizMode === "0") {
      QuizTypeService.GetPdfMode(examId).then((res) => {
        if (res.data.timeLeftSeconds <= 0) {
          handleComplete();
        }
      });
    }
  }, [examId, quizId]);

  return (
    <>
      <>
        {quizMode === "1" ? (
          <OnlineQuiz
            examId={examId}
            quizId={quizId}
            handleComplete={handleComplete}
            renderer={renderer}
          />
        ) : (
          <>
            <Hidden mdUp>
              <PdfQuizMobile
                examId={examId}
                quizId={quizId}
                handleComplete={handleComplete}
                renderer={renderer}
              />
            </Hidden>
            <Hidden smDown>
              <PdfQuiz
                examId={examId}
                quizId={quizId}
                handleComplete={handleComplete}
                renderer={renderer}
              />
            </Hidden>
          </>
        )}
      </>
      <ModalReadyWorkBook open={open} quizId={quizId} isReady={isReady} />
      <ModalConfirmGroupExam open={showModal} status={status} />
    </>
  );
};

export default QuizHandler;
