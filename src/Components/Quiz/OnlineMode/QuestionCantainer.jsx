import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Button } from "@material-ui/core";
import CardOnlineQuiz from "./CardOnlineQuiz";
import { Pagination } from "antd";
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "white",
    display: "flex",
    paddingBottom: 5,
    margin: 0,
  },
  stylePagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    backgroundColor: "white",
    "& button": {
      marginTop: "-1px !important",
      alignItems: "center !important",
      border: "1px solid #41b64e;",
    },
  },
}));
const QuestionCantainer = ({
  handleAnswer,
  itemRender,
  handleFinished,
  handlePageination,
  handleAutoPlay,
  dataOnline,
  autoPlay,
  examId,
  questionNo,
}) => {
  const classes = useStyles();
  return (
    <>
      {dataOnline ? (
        <>
          <Grid item md={12} xs={12} className={classes.stylePagination}>
            <Pagination
              itemRender={itemRender}
              responsive={true}
              current={questionNo}
              defaultCurrent={1}
              defaultPageSize={questionNo}
              total={dataOnline.totalQuestions}
              onChange={handlePageination}
            />
          </Grid>
          <Grid container className={classes.root} id="card">
            <Grid item md={12}>
              <CardOnlineQuiz
                questionNo={questionNo}
                dataOnline={dataOnline}
                examId={examId}
                autoPlay={autoPlay}
                handleAnswer={handleAnswer}
                handleAutoPlay={handleAutoPlay}
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
              style={{ textAlign: "center", padding: 30 }}
            >
              <Button
                className="Button"
                data-test="click-finish"
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleFinished}
              >
                پایان آزمون و دریافت کارنامه
              </Button>
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
};
export default QuestionCantainer;
