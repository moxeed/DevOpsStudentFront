import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClassOnlinePakageService from "../../../Services/Product/ClassOnlinePakageService";
import {
  Button,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { GetGroupId } from "../../../Services/Authentication/useAuthentication";
import * as React from "react";

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: "#f2f1ed !important",
    padding: "12px",
    margin: "8px",
    color: "#808080 !important",
    "&:hover": {
      backgroundColor: "#fffbfb !important",
      color: "#000 !important",
    },
  },
}));


export const QuizCourseSelector = ({ color, isMain = false }) => {
  const [filtersG1, setFiltersG1] = useState();
  const [filtersG3, setFiltersG3] = useState();
  const [filtersG5, setFiltersG5] = useState();
  const userGroupId = +GetGroupId();
  const classes = useStyles();
  useEffect(() => {
    ClassOnlinePakageService.GetFilters("Quiz", {
      groupIds: [1],
    }).then((res) => setFiltersG1(res.data.CourseIds.options));
    ClassOnlinePakageService.GetFilters("Quiz", {
      groupIds: [3],
    }).then((res) => setFiltersG3(res.data.CourseIds.options));
    ClassOnlinePakageService.GetFilters("Quiz", {
      groupIds: [5],
    }).then((res) => setFiltersG5(res.data.CourseIds.options));
  }, []);
  return (
    <div style={{ margin: "10px", textAlign: "center" }}>
      <Typography
        style={{ fontSize: "15px", color: color ? color : "#808080" }}
      >
        درس مورد نظر خود را میتوانید از دکمه های زیر انتخاب کنید.
      </Typography>
      {filtersG3 && filtersG1 && filtersG5 ? (
        <>
          {userGroupId === 3 || userGroupId === 0 ? (
            <>
              {" "}
              <Typography style={{ fontSize: "14px" }}>
                دروس رشته تجربی
              </Typography>
              {filtersG3.length > 0
                ? filtersG3.map((item, i) => (
                    <Link
                      key={i}
                      to={`/Selection/Product/CourseQuiz/${
                        userGroupId === 0 ? 3 : userGroupId
                      }/${item.id}`}
                    >
                      <Button className={!isMain ? "Button" : classes.button}>
                        {item.name}
                      </Button>
                    </Link>
                  ))
                : "آزمونی ثبت نشده"}{" "}
            </>
          ) : null}
          {userGroupId === 1 || userGroupId === 0 ? (
            <>
              <Typography style={{ fontSize: "14px" }}>
                دروس رشته ریاضی
              </Typography>
              {filtersG1.length > 0
                ? filtersG1.map((item, i) => (
                    <Link
                      key={i}
                      to={`/Selection/Product/CourseQuiz/${
                        userGroupId === 0 ? 1 : userGroupId
                      }/${item.id}`}
                    >
                      <Button className={!isMain ? "Button" : classes.button}>
                        {item.name}
                      </Button>
                    </Link>
                  ))
                : "آزمونی ثبت نشده"}
            </>
          ) : null}
          {userGroupId === 5 || userGroupId === 0 ? (
            <>
              <Typography style={{ fontSize: "14px" }}>
                دروس رشته انسانی
              </Typography>
              {filtersG5.length > 0
                ? filtersG5.map((item, i) => (
                    <Link
                      key={i}
                      to={`/Selection/Product/CourseQuiz/${
                        userGroupId === 0 ? 5 : userGroupId
                      }/${item.id}`}
                    >
                      <Button className={!isMain ? "Button" : classes.button}>
                        {item.name}
                      </Button>
                    </Link>
                  ))
                : "آزمونی ثبت نشده"}{" "}
            </>
          ) : null}
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};
