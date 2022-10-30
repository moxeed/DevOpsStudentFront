import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import HandleWorkBook from "../../Components/WorkBook/HandleWorkBook";
import { useParams, useHistory } from "react-router-dom";
import WorkBokService from "../../Services/Quiz/WorkBook";
import ContentLoader from "react-content-loader";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  btn: {
    backgroundColor: "#2B982B",
    border: "1px solid rgb(153, 152, 152)",
    "& a": { color: "white" },
    padding: 10,
    margin: 15,
  },
  disabled: {
    color: "rgb(153, 152, 152)",
    cursor: "auto",
    width: "100%",
    border: "1px solid rgb(153, 152, 152)",
    borderRadius: 5,
    height: 30,
    padding: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    color: "white",
    "&:hover": { color: "white" },
  },
}));

export default function WorkBookPage() {
  const classes = useStyles();
  const { id } = useParams();
  const [dataWorkBook, setDataWorkBook] = useState();
  const history = useHistory();
  useEffect(() => {
    WorkBokService.GetWorkBook(id).then((res) => {
      setDataWorkBook(res);
    });
  }, [id]);
  useEffect(() => {
    return () => {
      if (history.action === "POP") {
        history.replace(`/WorkBook/${id ? id : null}`);
      }
    };
  }, [history]);
  return (
    <Grid
      container
      justifyContent="center"
      style={{ paddingTop: 50, marginBottom: 30, minHeight: "60vh" }}
    >
      {dataWorkBook ? (
        <>
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            style={{ textAlign: "center", padding: 5, fontSize: 25 }}
          >
            {dataWorkBook.data.isEquivalent === true ? (
              <>کارنامه معادل {dataWorkBook.data.quizTitle}</>
            ) : (
              <>کارنامه {dataWorkBook.data.quizTitle} </>
            )}
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            style={{ display: "flex", justifyContent: "center", padding: 5 }}
          >
            <Card style={{ textAlign: "center", paddingTop: 10 }}>
              <Button
                className={"Btn-tab Button"}
                disabled={
                  dataWorkBook?.data.questionFileReady === true ? false : true
                }
              >
                <a
                  href={`http://myexam.bamis.ir/OnlineQuiz/WorkBook/DownloadQuestions/${id}`}
                  className={
                    dataWorkBook?.data.questionFileReady === true
                      ? classes.active
                      : classes.disabled
                  }
                >
                  دریافت فایل سوال
                </a>
              </Button>
              <Button
                className={"Btn-tab Button"}
                disabled={
                  dataWorkBook?.data.answerFileReady === true ? false : true
                }
              >
                <a
                  href={`http://myexam.bamis.ir/OnlineQuiz/WorkBook/DownloadAnswers/${id}`}
                  className={
                    dataWorkBook?.data.answerFileReady === true
                      ? classes.active
                      : classes.disabled
                  }
                >
                  دریافت فایل پاسخ نامه
                </a>
              </Button>
              <Button
                className={"Btn-tab Button"}
                disabled={
                  dataWorkBook?.data.answerVideoFileReady === true
                    ? false
                    : true
                }
              >
                <a
                  href={`http://myexam.bamis.ir/OnlineQuiz/WorkBook/DownloadVideoAnswer/${id}`}
                  className={
                    dataWorkBook?.data.answerVideoFileReady === true
                      ? classes.active
                      : classes.disabled
                  }
                >
                  دانلود فیلم حل سوالات
                </a>
              </Button>
              <HandleWorkBook dataWorkBook={dataWorkBook} />
            </Card>
          </Grid>
        </>
      ) : (
        <ContentLoader
          style={{
            width: "80%",
            height: 200,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <rect x="50" y="8" rx="3" ry="3" width="80%" height="500" />
        </ContentLoader>
      )}
    </Grid>
  );
}
