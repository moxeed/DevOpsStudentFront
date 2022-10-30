import React from "react";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { ShowModal } from "../../../Services/StoreSlices/ModalSlice";
import ModalConfirmQuiz from "../ModalConfirmQuiz";
import QuizTypeService from "../../../Services/Quiz/QuizType";
const useStyles = makeStyles(() => ({
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
}));
const CardInformation = ({ examId, quizId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const submit = () => {
    QuizTypeService.GetQuizInformaition(examId).then((res) => {
       dispatch(ShowModal(() => ModalConfirmQuiz(examId, res.data, quizId)));
    });
  };

  return (
    <Grid container spacing={1} style={{ padding: 10 }}>
      <Grid item md={12} sm={12} xs={12}>
        <Button className={classes.btn+" Button"} onClick={submit}>
          پایان آزمون و دریافت کارنامه
        </Button>
      </Grid>
    </Grid>
  );
};

export default CardInformation;
