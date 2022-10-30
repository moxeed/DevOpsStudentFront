import React, { useState, useEffect } from "react";
import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import Background from "../../Assets/Images/Poll.jpg";
import { Rating } from "@material-ui/lab";
import RatingService from "../../Services/Rating/RatingService";
import { useParams, Link } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { CheckCircleOutline } from "@material-ui/icons";

import "./PollPage.scss";
import IDivider from "../../Components/Reusable/IDivider";
const useStyle = makeStyles(() => ({
  root: {
    backgroundImage: `url(${Background})`,
    "grid-template-columns": "55%",
    "@media (max-width: 970px)": {
      "grid-template-columns": "75%",
    },
  },
}));

export default function PollPage() {
  const classes = useStyle();
  const [factors, setFactors] = useState([]);
  const [comment, setComment] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [items, setItems] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      RatingService.GetRatingFactors(id).then((res) => {
        setFactors(res.data);
      });
    }
  }, [id]);
  const SubmitPoll = () => {
    RatingService.PostRatingResult({
      activityId: +id,
      items,
      comment,
    }).then((res) => {
      setMessage(res.data);
      setIsDone(true);
    });
  };
  const handleChange = function (e) {
    const preState = items.filter((i) => i.factorId !== +e.target.name);
    preState.push({ factorId: +e.target.name, point: +e.target.value });
    setItems(preState);
  };
  const ratings = factors.map((item, i) => {
    return (
      <Grid xs={12} item container key={i}>
        <Grid item xs={7} sm={5}>
          <Typography style={{ fontSize: "15px", color: "#7D7D7D" }}>
            <RateReviewIcon style={{ color: "#73EB56", margin: "-3px 0px" }} />{" "}
            {item.factorName}
          </Typography>
        </Grid>
        <Grid xs={5} sm={2} style={{ direction: "ltr" }} item>
          <Rating
            size={"large"}
            id={item.factorId}
            name={item.factorId}
            onChange={handleChange}
            defaultValue={0}
          />
        </Grid>
      </Grid>
    );
  });
  return (
    <Grid className={classes.root + " Form-Paper"}>
      {isDone ? (
        // return !
        <Paper className="paper">
          <Grid container className="container">
            <Grid item xs={12}>
              <IDivider title="نظرسنجی" color="#40B44F" />
            </Grid>
            {ratings}
            <Grid xs={12} container>
              <Grid item xs={12}>
                <Typography style={{ fontSize: "15px", color: "#7D7D7D" }}>
                  <CreateIcon
                    style={{ color: "#73EB56", margin: "-3px 0px" }}
                  />{" "}
                  نظر
                </Typography>
              </Grid>
              <Grid xs={12} item>
                <textarea
                  maxLength="200"
                  placeholder="متن نظر"
                  rows={"3"}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  className="inputComment"
                />
              </Grid>
            </Grid>
            <Grid xs={12} md={5} item>
              <Button
                className="Button"
                variant="contained"
                onClick={(e) => {
                  SubmitPoll(e);
                }}
              >
                ثبت نظر
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Paper className="paper2">
          <Grid container justifyContent="center">
            <Grid item style={{ textAlign: "center" }} xs={11}>
              <CheckCircleOutline
                style={{ fontSize: "60px", color: "#39AC4D" }}
              />
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={11}>
              <Typography>
                {
                  // message
                }{" "}
                از اینکه ما را برای خدمات رسانی انتخاب کرده اید سپاس گزاریم.
              </Typography>
            </Grid>
            <Grid item style={{ textAlign: "center" }} xs={11}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button className="Button" variant="contained">
                  بازگشت به صفحه اصلی
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Grid>
  );
}
