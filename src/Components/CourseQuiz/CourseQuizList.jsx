import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import CourseuQizCard from "./CourseQuizCard";
import NoResult from "../Reusable/NoResult";

const useStyles = makeStyles((theme) => ({
  Cards: {
    padding: "5px 0",
    [theme.breakpoints.up("md")]: {
      padding: "5px",
    },
  },
}));

export default function CourseuQizList({ sortedData, minValue, maxValue }) {
  const classes = useStyles();
  
  return (
    <>
      {sortedData && sortedData.length > 0 ? (
        sortedData.slice(minValue, maxValue).map((p, i) => (
          <Grid
            item
            xs={12}
            md={4}
            sm={10}
            justifyContent="center"
            className={classes.Cards}
            key={i}
            container
          >
            <Link to={`/Product/CourseQuiz/${p.productId}`}>
              <CourseuQizCard data={p} />
            </Link>
          </Grid>
        ))
      ) : (
        <NoResult />
      )}
    </>
  );
}
