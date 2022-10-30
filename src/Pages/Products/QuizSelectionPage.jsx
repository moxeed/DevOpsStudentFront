import { Grid, Paper, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import NavSelector from "../../Common/ListPage/Components/NavSelector";
import { ListPage } from "../../Common/ListPage/ListPage";
import { CourseQuizIntro } from "../../Components/CourseQuiz/CourseQuizIntro";
import QuizTable from "../../Components/Quiz/Product/QuizTable";
import ClassOnlinePakageService from "../../Services/Product/ClassOnlinePakageService";
import { IsAuthenticated } from "../../Services/StoreSlices/UserSlice";
import { useHistory, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import {
  HideLoading,
  ShowLoading,
} from "../../Services/StoreSlices/LoadingSlice";
import { ConvertValues } from "../../Components/Quiz/Product/ConvertValues";
import FilterContext from "../../Common/ListPage/Contexts/FilterContext";
import { Alert, AlertTitle } from "@material-ui/lab";
import eventBus from "../../Common/EventBus/EventBus";
import OrderEvents from "../../Components/Financial/OrderEvents";
import { GetGroupId } from "../../Services/Authentication/useAuthentication";
import { GetGroupName } from "../../Utility/Kanoon/GetGroupName";

const QuizSelectionPage = () => {
  const isAuthenticated = useSelector(IsAuthenticated);
  const [rows, setRows] = useState([]);
  const [groupName, setGroupName] = useState("...");
  const showMessage = rows.some((i) => i.isPurchased === true);
  const { filters } = useContext(FilterContext);
  const history = useHistory();
  const { group, course } = useParams();
  const dispath = useDispatch();
  const userGroupId = GetGroupId();

  const loadData = () => {
    dispath(ShowLoading());
    if (filters && Object.keys(filters).length !== 0)
      ClassOnlinePakageService.GetProducts("Quiz", filters)
        .then((res) => {
          res.data.sort((a, b) => {
            if (
              new Date(b.startDate) - Date.now() < 0 &&
              new Date(a.startDate) - Date.now() >= 0
            )
              return -Math.abs(new Date(b.startDate) - Date.now());
            return 1;
          });

          const data = ConvertValues(
            res.data.reverse().filter((i) => i.quizType !== 2)
          );
          setRows(data);
        })
        // eslint-disable-next-line no-console
        .catch(console.log)
        .finally(() => dispath(HideLoading()));
  };
  useEffect(() => {
    if (userGroupId) {
      GetGroupName(+userGroupId).then((res) => {
        setGroupName(res ? res : "شناسه ی شما معتبر نیست");
      });
    }
  }, [userGroupId]);
  useEffect(() => {
    if (filters && Object.keys(filters).length !== 0) {
      eventBus.on(OrderEvents.orderCompeleted, loadData);
      loadData();
    }
    return () => eventBus.remove(OrderEvents.orderCompeleted, loadData);
  }, [filters]);
  return (
    <>
      <Grid container spacing={1} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={3}>
          {isAuthenticated ? (
            <>
              {showMessage ? (
                <Alert
                  severity="info"
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    textAlign: "justifyContent",
                  }}
                >
                  <AlertTitle style={{ fontSize: "20px" }}>
                    راهنمای شرکت در آزمون
                  </AlertTitle>
                  شما می توانید از جدول آزمون ها،وضعیت آزمون ثبت کرده خود را
                  مشاهده کنید، در صورتی که در بازه زمانی برگزاری آزمون باشید،با
                  زدن بر روی دکمه شرکت در آزمون، در آزمون مد نظر شرکت کنید
                </Alert>
              ) : null}
              <Paper
                style={{
                  padding: "12px",
                  marginTop: "10px",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <CourseQuizIntro />
              </Paper>
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
                برای خرید و یا شرکت در آزمون های خریداری شده خود، ابتدا وارد
                صفحه شخصی خودتان شوید!
              </Typography>
              <Button
                className="Button"
                onClick={() => history.push("/v2/Identity/login")}
              >
                ورود به صفحه شخصی
              </Button>
              <Typography
                style={{ fontSize: "14px", textAlign: "justifyContent" }}
              >
                برای ورود به صفحه شخصی،نام کاربری شما شمارنده کانونی شما و رمز
                عبور کد ملی شماست.درصورت هرگونه مشکل با پشتیبانی تماس بگیرید.
              </Typography>
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid item xs={12}>
            <span
              style={{
                display: userGroupId ? "none" : "block",
                background: "white",
                textAlign: "center",
              }}
            >
              <Typography
                style={{
                  fontSize: "16px",
                  width: "100%",
                }}
              >
                گروه آزمایشی(مقطع) خود را از لیست زیر انتخاب کرده و سپس از لیست
                درس درس مورد نظر خود را انتخاب نمایید.
              </Typography>
              <NavSelector
                name="GroupIds"
                defaultId={userGroupId ? userGroupId : group}
              />
            </span>
            <div
              style={{
                display: userGroupId ? "block" : "none",
                padding: "10px",
                background: "white",
                textAlign: "center",
              }}
            >
              <Typography
                style={{
                  fontSize: "16px",
                  width: "100%",
                }}
              >
                آزمون های گروه آزمایشی {groupName}
              </Typography>
              <Typography
                style={{
                  marginTop: "4px",
                  fontSize: "14px",
                  width: "100%",
                }}
              >
                درس مورد نظر خود را از لیست زیر انتخاب کنید{" "}
              </Typography>
            </div>
            <NavSelector name="CourseIds" defaultId={course} />
          </Grid>
          <Grid item xs={12}>
            <QuizTable rows={rows} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line react/display-name
export default () => (
  <ListPage
    getFilterOptions={(filters) =>
      ClassOnlinePakageService.GetFilters("Quiz", filters)
    }
  >
    <QuizSelectionPage />
  </ListPage>
);
