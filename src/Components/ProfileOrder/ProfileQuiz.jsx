import React, { useEffect } from "react";
import { GetUserId } from "../../Services/Authentication/useAuthentication";
import { Grid, Typography } from "@material-ui/core";
import PostProfileQuiz from "../../Services/Profile/ProfileService";
import { useDispatch } from "react-redux";
import {
  ShowLoading,
  HideLoading,
} from "../../Services/StoreSlices/LoadingSlice";
import QuizStatusButton from "../Quiz/Product/QuizStatusButton";
import NoResult from "../Reusable/NoResult";
const ProfileQuiz = ({ id }) => {
  const [packages, setPackages] = React.useState([]);
  const filter = id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ShowLoading());
    PostProfileQuiz.PostProfileQuiz({
      studentId: GetUserId(),
      filterIds: [filter],
    }).then(
      (res) => {
        setPackages(res.data);
        dispatch(HideLoading());
      },
      () => dispatch(HideLoading())
    );
  }, [dispatch, filter]);
  return (
    <>
      {packages.length > 0 ? (
        <Grid container>
          {packages.map((item, i) => (
            <Grid
              key={i}
              container
              item
              style={{
                backgroundColor: "white",
                display: "flex",
                padding: 5,
                marginTop: 10,
              }}
            >
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                style={{
                  display: "flex",
                  paddingTop: 10,
                  color: "gray",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {" "}
                  نام آزمون :{" "}
                </Typography>
                <Typography variant="h6"> {item.quizTitle} </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={5}
                md={5}
                style={{
                  display: "flex",
                  paddingTop: 10,
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {" "}
                  توضیحات :
                </Typography>
                <Typography variant="h6">
                  {" "}
                  {item.quizDescription ? item.quizDescription : "ندارد"}{" "}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <QuizStatusButton
                  status={filter}
                  quizId={item.quizId}
                  startDate={item.startDate}
                  resultDate={item.resultDate}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container justifyContent="center">
          <NoResult />{" "}
        </Grid>
      )}
    </>
  );
};
export default ProfileQuiz;
