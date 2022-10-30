import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import OnlineQuizChoice from "./OnlineQuizChoice";
import OnlineQuizSituationMark from "./OnlineQuizSituationMark";
import OnlineQuizMark from "./OnlineQuizMark";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import { Button } from "@material-ui/core";

const CardOnlineQuiz = ({ handleAnswer, dataOnline, questionNo }) => {
  const [answerNum, setAnswerNum] = useState();
  const [mark, setMark] = useState();
  const [situationMark, setSituationMark] = useState();
  const RestMarks = () => {
    setAnswerNum("0");
    handleAnswer("0", mark, situationMark);
  };
  useEffect(() => {
    setAnswerNum(dataOnline.answerNum);
    setMark(dataOnline.mark);
    setSituationMark(dataOnline.situationMark);
  }, [dataOnline]);

  const handleRadioChangeAnswerNum = (event) => {
    event.preventDefault();
    setAnswerNum(event.target.value);
    handleAnswer(event.target.value, mark, situationMark);
  };
  const handleRadioChangeMark = (event) => {

    event.preventDefault();
    setMark(event.target.value);
    handleAnswer(answerNum, event.target.value, situationMark);
  };
  const handleRadioChangeSituationMark = (event) => {
    event.preventDefault();
    setSituationMark(event.target.value);
    handleAnswer(answerNum, mark, event.target.value);
  };
  return (
    <Grid container>
      <Grid item container xs={12} style={{ padding: 10 }}>
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "#6bd664",
            textAlign: "center",
            color: "white",
            padding: 1,
         
          }}
        >
          {questionNo}
        </div>
        <Grid item xs={10} style={{ flexBasis: "100%", paddingRight: 5 }}>
          {dataOnline.questionText !== "" &&
          dataOnline.questionText !== null ? (
            <span
              className="ck-content"
              dangerouslySetInnerHTML={{ __html: dataOnline.questionText }}
              style={{ fontSize: 18 }}
            ></span>
          ) : (
            "این سوال ثبت نشده است، لطفا از حالت آزمون به صورت pdf استفاده کنید"
          )}
        </Grid>
      </Grid>
      <Grid container style={{ paddingRight: 5, flexWrap: "wrap-reverse" }}>
        <Grid item md={6} xs={12} sm={12}>
          <OnlineQuizChoice
            dataOnline={dataOnline}
            handleRadioChangeAnswerNum={handleRadioChangeAnswerNum}
            answerNum={`${answerNum}`}
          />
          <Grid item md={12} xs={12} style={{ marginRight: 30, marginTop: 10 }}>
            <Button className="Button" onClick={RestMarks}>
              پاک کردن پاسخ ها
              <ClearAllIcon />
            </Button>
          </Grid>
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div>
            {" "}
            {dataOnline.questionImage && dataOnline.questionImage !== "" ? (
              <img
                src={dataOnline.questionImage}
                alt="عکس سوال"
                style={{ maxWidth: "250px" }}
              />
            ) : null}
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid
          item
          md={10}
          xs={10}
          style={{
            marginRight: 10,
            padding: 5,
          }}
        >
          <OnlineQuizMark
            handleRadioChangeMark={handleRadioChangeMark}
            mark={`${mark}`}
          />
        </Grid>
        <Grid
          item
          md={10}
          xs={10}
          style={{
            marginRight: 10,
            padding: 10,
          }}
        >
          <OnlineQuizSituationMark
            handleRadioChangeSituationMark={handleRadioChangeSituationMark}
            situationMark={`${situationMark}`}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardOnlineQuiz;
