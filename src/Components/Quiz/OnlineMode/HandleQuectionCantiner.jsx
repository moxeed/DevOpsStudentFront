import React, { useState, useEffect } from "react";
import QuizTypeService from "../../../Services/Quiz/QuizType";
import ModalConfirmQuiz from "../ModalConfirmQuiz";
import { ShowModal } from "../../../Services/StoreSlices/ModalSlice";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import QuestionCantainer from "./QuestionCantainer";
import {
  ShowLoading,
  HideLoading,
} from "../../../Services/StoreSlices/LoadingSlice";
import { FormControlLabel, Grid } from "@material-ui/core";
import { Switch } from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import Typography from "@material-ui/core/Typography";
const HandleQuectionCantiner = ({
  examId,
  quizId,
  handleComplete,
  renderer,
}) => {
  const dispatch = useDispatch();
  const [questionNo, setQuestionNo] = useState(1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [dataOnline, setDataOnline] = React.useState();
  const [timeLeft, setTimeLeft] = useState(new Date());
  const toggleChecked = () => {
    setAutoPlay(!autoPlay);
  };
  useEffect(() => {
    dispatch(ShowLoading());
    if (examId) {
      QuizTypeService.GetInOnlineMode(examId, questionNo)
        .then((res) => {
          if (res?.success === false) {
            handleComplete();
            return null;
          }
          setDataOnline(res.data);
          setTimeLeft(Date.now() + res?.data?.timeLeft * 1000);
        })
        .finally(() => {
          dispatch(HideLoading());
        });
    }
  }, [examId, questionNo, dispatch]);

  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <Button className="Button">قبلی</Button>;
    }
    if (type === "next") {
      return <Button className="Button">بعدی</Button>;
    }
    return originalElement;
  }
  const handleFinished = () => {
    QuizTypeService.GetQuizInformaition(examId).then((res) => {
      QuizTypeService.GetInOnlineMode(examId, questionNo);
      dispatch(ShowModal(() => ModalConfirmQuiz(examId, res.data, quizId)));
    });
  };
  const handlePageination = (value) => {
    setQuestionNo(value);
    document.body.scrollTop = 0; 
    // For Safari
    document.documentElement.scrollTop = 0;
  };

  const handleAutoPlay = (answerNum) => {
    if (
      dataOnline?.totalQuestions > questionNo &&
      dataOnline?.answerNum !== answerNum &&
      autoPlay === true
    ) {
      setQuestionNo(questionNo + 1);
      document.body.scrollTop = 0; 
      // For Safari
      document.documentElement.scrollTop = 0;
    }
  };
  const handleAnswer = (answerNum = "0", mark = "0", situationMark = "0") => {
    QuizTypeService.GetAnswerQuiz({
      Examid: examId,
      QuestionNo: questionNo,
      AnswerNum: Number(answerNum),
      Mark: Number(mark),
      SituationMark: Number(situationMark),
    }).then(() => handleAutoPlay(answerNum));
  };

  return (
    <>
      <Grid
        container
        md={12}
        style={{
          backgroundColor: "white",
          padding: 10,
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
          fontWeight: "bold",
        }}
      >
        <Grid
          item
          md={3}
          xs={12}
          sm={12}
          style={{ padding: 5, textAlign: "center" }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={autoPlay}
                onChange={toggleChecked}
                style={{ marginLeft: 5 }}
              />
            }
            label={
              <Typography style={{ fontWeight: "bold" }}>
                نمایش خودکار سوال بعدی پس از پاسخ
              </Typography>
            }
          />
        </Grid>
        <Grid
          item
          md={3}
          xs={12}
          sm={12}
          style={{
            textAlign: "center",
          }}
        >
          زمان باقی مانده :
          <Countdown
            style={{ padding: 5 }}
            value={timeLeft}
            onFinish={() => handleComplete()}
            renderer={renderer}
          />
        </Grid>
        <Grid
          item
          md={3}
          style={{ padding: 10, textAlign: "center" }}
          data-test="totalQuestions"
        >
          تعداد سوالات :{dataOnline?.totalQuestions}
        </Grid>
      </Grid>
      <QuestionCantainer
        handleAnswer={handleAnswer}
        handleAutoPlay={handleAutoPlay}
        handlePageination={handlePageination}
        handleFinished={handleFinished}
        itemRender={itemRender}
        autoPlay={autoPlay}
        dataOnline={dataOnline}
        questionNo={questionNo}
        examId={examId}
      />
    </>
  );
};

export default HandleQuectionCantiner;
