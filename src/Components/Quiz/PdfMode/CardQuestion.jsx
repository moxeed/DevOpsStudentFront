import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "./ButtonGroup";
import ButtonSelect from "./ButtonSelect";
import MarkSelect from "./MarkSelect";
import QuizTypeService from "../../../Services/Quiz/QuizType";
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    "&:nth-of-type(odd)": {
      backgroundColor: "white",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#E1E1E2",
    },
    direction: "rtl",
    textAlign: "center",
    height: "40px",
  },
}));
const CardQuestion = ({ number, dataOffline, examId }) => {
  const classes = useStyles();
  const [answerNum, setAnswerNum] = useState();
  const [mark, setMark] = useState();
  const [situationMark, setSituationMark] = useState();
  useEffect(() => {
    setAnswerNum(dataOffline.answers[number - 1]);
    setMark(dataOffline.marks[number - 1]);
    setSituationMark(dataOffline.situationMarks[number - 1]);
  }, [dataOffline]);
  const handleChangeAnswerNum = (event) => {
    event.preventDefault();
    if (event.target.value === answerNum) {
      setAnswerNum("0");
      handleAnswer("0", mark, situationMark);
    } else {
      setAnswerNum(event.target.value);
      handleAnswer(event.target.value, mark, situationMark);
    }
  };
  const handleChangeSituationMark = (event, index) => {
    event.preventDefault();
    setSituationMark(index);
    handleAnswer(answerNum, mark, index);
  };
  const handleChangeMark = (event) => {
    event.preventDefault();
    setMark(event.target.value);
    handleAnswer(answerNum, event.target.value, situationMark);
  };
  const handleAnswer = (answerNum = "0", mark = "0", situationMark = "0") => {
    QuizTypeService.GetAnswerQuiz({
      Examid: examId,
      QuestionNo: number,
      AnswerNum: Number(answerNum),
      Mark: Number(mark),
      SituationMark: Number(situationMark),
    });
  };
  useEffect(() => {}, [answerNum, mark, situationMark]);
  return (
    <Grid container className={classes.root}>
      {number <= dataOffline?.numOfQuestion ? (
        <>
          <Grid item md={3} xs={3} sm={3}>
            <ButtonSelect
              handleChangeSituationMark={handleChangeSituationMark}
              situationMark={`${situationMark}`}
            />
          </Grid>
          <Grid item md={3} xs={3} sm={3} style={{ paddingRight: 5 }}>
            <MarkSelect handleChangeMark={handleChangeMark} mark={`${mark}`} />
          </Grid>
          <Grid item md={5} xs={5} sm={5} style={{ marginTop: 5 }}>
            <ButtonGroup
              choice={`${answerNum}`}
              handleChange={handleChangeAnswerNum}
            />
          </Grid>
          <Grid
            item
            md={1}
            xs={1}
            sm={1}
            style={{ marginTop: 10, paddingLeft: 6 }}
          >
            {number}
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};

export default CardQuestion;
