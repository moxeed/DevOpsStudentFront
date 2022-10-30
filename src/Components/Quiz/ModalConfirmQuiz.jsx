import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { HideModal } from "../../Services/StoreSlices/ModalSlice";
import HelpIcon from "@material-ui/icons/Help";
import { useDispatch } from "react-redux";
import Countdown from "react-countdown";
import { Typography } from "@material-ui/core";
import QuizTypeService from "../../Services/Quiz/QuizType";
import { useHistory } from "react-router-dom";
const Message = () => (
  <Typography variant="h6">زمان آزمون به پایان رسیده است</Typography>
);
const ModalConfirmQuiz = (examId, data, quizId) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Message />;
    } else {
      return (
        <Typography variant="h6">
          {("0" + hours).substr(-2)}:{("0" + minutes).substr(-2)}:
          {("0" + seconds).substr(-2)}
        </Typography>
      );
    }
  };
  const handleFinish = () => {
    QuizTypeService.GetConfirmTheResult({
      IsConfirmed: true,
      ExamId: examId,
    }).then((res) => {
      dispatch(HideModal());
      if (res.data === 1) {
        history.replace(`/WorkBook/${quizId ? quizId : null}`, {
          fromDashboard: true,
        });
      } else {
        history.push(`/QuizReasult/${quizId ? quizId : null}`);
      }
    });
  };
  return (
    <Grid container>
      <Grid item md={12} xs={12} sm={12} style={{ textAlign: "center" }}>
        <HelpIcon style={{ fontSize: 50 }} />
      </Grid>
      <Grid
        item
        md={12}
        xs={12}
        sm={12}
        style={{ textAlign: "center", padding: 10, fontSize: 15 }}
      >
        تعداد سوالات نزده آزمون : {data.whiteCount} سوال
      </Grid>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 20,
          fontSize: 15,
        }}
      >
        زمان باقی مانده :{" "}
        <Countdown
          date={Date.now() + data.secondsLeft * 1000}
          renderer={renderer}
        />
      </Grid>
      <Grid
        container
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <Button
          className="Button"
          variant="contained"
          size="large"
          onClick={handleFinish}
        >
          اتمام آزمون
        </Button>

        <Button
          className="Button"
          size="large"
          variant="contained"
          onClick={() => dispatch(HideModal())}
        >
          انصراف
        </Button>
      </Grid>
    </Grid>
  );
};

export default ModalConfirmQuiz;
