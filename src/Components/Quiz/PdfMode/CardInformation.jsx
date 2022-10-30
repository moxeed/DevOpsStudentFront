import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { withStyles } from "@material-ui/core/styles";
import Countdown from "react-countdown";
import HelpIcon from "@material-ui/icons/Help";
import { useDispatch } from "react-redux";
import { ShowModal } from "../../../Services/StoreSlices/ModalSlice";
import ModalConfirmQuiz from "../ModalConfirmQuiz";
import QuizTypeService from "../../../Services/Quiz/QuizType";

const styles = () => ({
  root: {
    backgroundColor: "white",
    width: "21%",
    position: "fixed",
    borderRadius: 5,
  },
  btn: {
    width: "90%",
    cursor: "pointer",
  },
});

const CardInformation = ({
  dataOffline,
  examId,
  quizId,
  handleComplete,
  renderer,
  classes,
}) => {
  const dispatch = useDispatch();
  const number = React.useState(dataOffline.numOfQuestion);
  const submit = () => {
    QuizTypeService.GetQuizInformaition(examId).then((res) => {
      dispatch(ShowModal(() => ModalConfirmQuiz(examId, res.data, quizId)));
    });
  };
  return (
    <Grid container spacing={1} style={{ padding: 5 }} className={classes.root}>
      <Grid item md={12} sm={12} xs={12} style={{ padding: 10 }}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          {dataOffline.quizTitle}
        </Typography>
      </Grid>
      <Grid
        item
        container
        md={12}
        sm={12}
        xs={12}
        justifyContent="space-around"
      >
        <Grid item md={6} style={{ display: "flex" }}>
          <AccessTimeIcon style={{ marginLeft: 2 }} />
          <Typography variant="h6">زمان باقی مانده</Typography>
        </Grid>
        <Grid item md={6} style={{ textAlign: "left" }}>
          <Countdown
            date={Date.now() + dataOffline.timeLeftSeconds * 1000}
            renderer={renderer}
            onComplete={handleComplete}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        md={12}
        sm={12}
        xs={12}
        justifyContent="space-around"
      >
        <Grid item md={6} style={{ display: "flex" }}>
          <HelpIcon style={{ marginLeft: 2 }} />
          <Typography variant="h6">تعداد سوالات</Typography>
        </Grid>
        <Grid item md={6} style={{ textAlign: "left" }}>
          {number}
        </Grid>
      </Grid>

      <Grid item md={12} sm={12} xs={12}>
        <Button className={classes.btn + " Button"} onClick={submit}>
          پایان آزمون و دریافت کارنامه
        </Button>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(CardInformation);
