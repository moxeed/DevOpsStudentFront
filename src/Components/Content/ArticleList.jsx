import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import NoResult from "../../Components/Reusable/NoResult";
const useStyles = makeStyles((theme) => ({
  Cards: {
    padding: "5px 0",
    [theme.breakpoints.up("md")]: {
      padding: "5px",
    },
  },
}));

export default function ArticleList({ data, minValue, maxValue }) {
  const classes = useStyles();

  return (
    <>
      {data && data.length > 0 ? (
        data.slice(minValue, maxValue).map((p,i) => (
          <Grid
            item
            xs={12}
            md={4}
            sm={10}
            className={classes.Cards}
            key={i}
          >
            <Link to={`/Articles/${p.contentId}`}>
              <ArticleCard data={p} />
            </Link>
          </Grid>
        ))
      ) : (
        <NoResult />
      )}
    </>
  );
}
