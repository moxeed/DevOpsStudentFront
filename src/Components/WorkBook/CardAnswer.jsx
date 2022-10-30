import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import LineItemCard from "./LineItemCard";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    paddingTop: 10,
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    margin: "5px",
    color: "rgb(60,205,179)",
    textAlign: "center",
    borderRadius: "32px",
    display: "flex",
    justifyContent: "center",
    height: "30px",
    border: "1px solid rgb(60,205,179)",
    "&:hover,&.active": {
      backgroundColor: "rgb(60,205,179)",
      color: "#ffffff",
      border: "1px solid transparent",
    },
  },
}));
export default function CardAnswer({ dataWorkBook, data }) {
  const classes = useStyles();
  const [number] = useState(dataWorkBook?.data.allQuestionCount);
  const [numQ, setNumQ] = useState(0);

  return (
    <Grid container item md={10} className={classes.root}>
      <Grid
        item
        md={12}
        style={{ backgroundColor: "white", borderRadius: 5, width: "100%" }}
      >
        <Grid container style={{ direction: "ltr", width: "100%" }}>
          <Grid item xs={12} sm={12}>
            <div style={{ border: "1px solid #43BF46", width: "100%" }}>
              {numQ === 0 ? (
                <LineItemCard
                  number={1}
                  dataOffline={data}
                  dataWorkBook={dataWorkBook}
                />
              ) : (
                <LineItemCard
                  number={numQ}
                  dataOffline={data}
                  dataWorkBook={dataWorkBook}
                />
              )}
            </div>
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="center"
          style={{
            marginBottom: 50,
            display: "flex",
            width: "100%",
          }}
        >
          {[...Array(number)].map((e, i) => (
            <Grid key={i} style={{ flexDirection: "revert" }}>
              {1 < i < 160 && (number - i) * 10 < number + 10 ? (
                <Button
                  className={classes.btn + " Button"}
                  onClick={() => {
                    setNumQ((number - (i + 1)) * 10 + 1);
                  }}
                >
                  {!dataWorkBook?.data?.isPdfMode ? (
                    <>
                      {(number - (i + 1)) * 10 + 1}-{(number - i) * 10}
                    </>
                  ) : (
                    <>
                      {(number - (i + 1)) * 10 + 1 }-
                      {(number - i) * 10 }
                    </>
                  )}
                </Button>
              ) : null}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
