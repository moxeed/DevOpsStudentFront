import React, { useEffect, useState } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import QuizTypeService from "../../Services/Quiz/QuizType";
import {
  GetGroupId,
  GetUserId,
} from "../../Services/Authentication/useAuthentication";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IsAuthenticated } from "../../Services/StoreSlices/UserSlice";
import ClassOnlineService from "../../Services/Product/ClassOnlineService";
import Countdown from "antd/lib/statistic/Countdown";

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: "white",
    borderRadius: 5,
    border: "1px solid #F8F8F8",
    padding: 30,

    "& h4": {
      padding: 5,
      textAlign: "center",
    },
    marginBottom: 50,
    "& h5": {
      lineHeight: 2,
      textAlign: "center",
    },
  },
}));
const ValidationQuiz = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector(IsAuthenticated);
  const [data, setData] = useState();
  const [quizData, setQuizData] = useState([]);
  const history = useHistory();
  const userGroupId = +GetGroupId();
  const StudentId = GetUserId();
  const count = (d) => {
    const end = new Date(d);
    const now = new Date();
    return Date.now() + Math.abs(end - now);
  };
  const changeStatus = (data) => {
    if (data === 0) {
      QuizTypeService.PostBuyQuiz({ QuizId: 205, StudentId }).then(() =>
        QuizTypeService.PostMain({ QuizId: 205, StudentId }).then((res) => {
          setData(res.data.status);
          if (res.data.status === 5) {
            <Typography style={{ padding: 10 }}>
              <Countdown
                value={count(quizData[0].startDate)}
                format=" شروع آزمون تا DD روز HH ساعت mm دقیقه ss ثانیه دیگر"
                onFinish={() => alert("صفحه را رفرش کنید")}
              />
            </Typography>;
          } else {
            history.push("/Quiz/205/2/1");
          }
        })
      );
    } else if (data === 4) {
      <>کارنامه آماده نمیباشد،تا پایان زمان آزمون صبر کنید</>;
    } else if (data === 6) {
      <Typography>آزمون آماده نیست</Typography>;
    } else if (data === 5) {
      <Typography style={{ padding: 10 }}>
        <Countdown
          value={count(quizData[0].startDate)}
          format=" شروع آزمون تا DD روز HH ساعت mm دقیقه ss ثانیه دیگر"
          onFinish={() => alert("صفحه را رفرش کنید")}
        />
      </Typography>;
    } else {
      history.push("/Quiz/205/2/1");
    }
  };

  useEffect(() => {
    QuizTypeService.PostMain({ QuizId: 205, StudentId })
      .then((res) => {
        setData(res.data.status);
      })
      .catch(() => {
        setData(-1);
      });
  }, [data]);
  useEffect(() => {
    ClassOnlineService.GetProducts("Quiz", {
      GroupIds: [3],
      CourseIds: [6],
    }).then((res) => setQuizData(res?.data.filter((i) => i.quizId === 205)));
  }, []);

  return (
    <Grid container justifyContent="center" className={classes.paper}>
      <Grid item md={10}>
        <Typography className={"Main-text-Ex Display-align"}>
          آزمون آنلاین اعتبارسنجی
        </Typography>
        {userGroupId === 3 ? (
          <>
            <Typography variant="h5" className={"Text-Type-Ex"}>
              این آزمون ویژه دانش اموزان برتر دوازدهم تجربی کانون هست .
            </Typography>
            <Typography variant="h5" className={"Text-Type-Ex"}>
              {" "}
              آزمون اعتبارسنجی روز پنج شنبه 18 آذر به صورت حضوری و در محل
              نمایندگی کانون در شهرشما برگزار می شود.
            </Typography>
            <Typography variant="h5" className={"Text-Type-Ex"}>
              بعد از حضور در دفتر نمایندگی کانون، سوالات آزمون در اختیار شماقرار
              می گیرد. بعد از دریافت دفترچه سوالات ، بر روی دکمه شروع آزمون کلیک
              کنید و بادقت پاسخ های مورد نظرتان را در پاسخ برگ آنلاین وارد کنید
              لطفا شیونامه برگزاری آزمون را به دقت مطالعه کنید سپس در آزمون شرکت
              کنید.
            </Typography>
          </>
        ) : null}
      </Grid>
      <Grid item md={10} className={"Display-align"}>
        {isAuthenticated ? (
          <>
            {userGroupId === 3 ? (
              <>
                {data === 2 ? (
                  <Button
                    className="Button"
                    size="large"
                    variant="contained"
                    onClick={() => history.push("/WorkBook/205")}
                  >
                    دریافت کارنامه
                  </Button>
                ) : data === 4 ? (
                  <>کارنامه آماده نمیباشد،تا پایان زمان آزمون صبر کنید</>
                ) : data === 6 ? (
                  <>آزمون آماده نیست</>
                ) : data === 5 ? (
                  <Typography style={{ padding: 10 }}>
                    <Countdown
                      value={count(quizData[0] ? quizData[0].startDate : null)}
                      format=" شروع آزمون تا DD روز HH ساعت mm دقیقه ss ثانیه دیگر"
                      onFinish={() => alert("صفحه را رفرش کنید")}
                    />
                  </Typography>
                ) : (
                  <Button
                    className="Button"
                    size="large"
                    variant="contained"
                    onClick={() => changeStatus(data)}
                  >
                    شروع آزمون
                  </Button>
                )}
              </>
            ) : (
              <Typography style={{ fontSize: "16px", textAlign: "center" }}>
                گروه آزمایشی شما با این آزمون تطابق ندارد
              </Typography>
            )}
          </>
        ) : (
          <Paper
            style={{
              padding: "12px",
              marginTop: "10px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Typography style={{ fontSize: "16px", textAlign: "center" }}>
              برای شرکت در آزمون اعتبار سنجی، ابتدا وارد صفحه شخصی خود در سایت
              برترها شوید!
            </Typography>
            <Typography style={{ fontSize: "16px", textAlign: "center" }}>
              برای ورود به صفحه شخصی تان نام کاربری، شمارنده تان و رمز عبور، کد
              .ملی شما می باشد
            </Typography>
            <Button
              className="Button"
              onClick={() => history.push("/v2/Identity/login")}
            >
              ثبت نام شرکت در آزمون اعتبار سنجی
            </Button>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default ValidationQuiz;
