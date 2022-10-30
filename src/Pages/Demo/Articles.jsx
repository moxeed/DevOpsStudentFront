import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import TestApiArticles from "./testAPIs/TestApiArticles";

const useStyles = makeStyles(() => ({
  icon: {
    width: "11em",
    "@media (max-width:700px)": {
      width: "5em",
    },
  },
  text1: {
    display: "block",
    fontSize: "16px",
  },
  text2: {
    display: "block",
    fontSize: "13px",
  },
}));

export default function Articles() {
  const classes = useStyles();
  const data = TestApiArticles?.data;

  return (
    <div style={{ margin: "3em auto" }}>
      <Grid container spacing={3}>
        {data.map((item, i) => (
          <Grid item lg={6} md={6} xs={12} key={i}>
            <Grid
              container
              style={{ padding: "1em 1em 0 0", backgroundColor: "#eee" }}
              direction="row-reverse"
            >
              <Grid item xs={10} style={{ position: "relative" }}>
                <div style={{ marginBottom: "2em" }}>
                  <Typography variant="p" className={classes.text1}>
                    {item.title}
                  </Typography>
                  <Typography variant="p" className={classes.text2}>
                    {item.subject}
                  </Typography>
                  <Typography variant="p" className={classes.text2}>
                    {item.author}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={2}>
                <img
                  src={item?.icon}
                  alt={item.title}
                  className={classes.icon}
                />
              </Grid>
              <Grid
                item
                style={{
                  position: "relative",
                  backgroundColor: "#43bf46",
                  height: "22px",
                  minWidth: "110px",
                  padding: "5px",
                  color: "#eeeeee",
                }}
              >
                <Typography
                  variant="p"
                  style={{ position: "absolute", bottom: "0", left: "60px" }}
                >
                  {item.date} |
                </Typography>
                <Typography
                  variant="p"
                  style={{ position: "absolute", bottom: "0", left: "5px" }}
                >
                  {item.seenCount} بازدید
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
