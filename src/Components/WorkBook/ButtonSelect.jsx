import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const options = [
  "بدون علامت",
  "فراموش کردم",
  "شک دارم",
  "ناقص یاد گرفتم",
  "سوال مهم",
];
const useStyles = makeStyles((theme) => ({
  btn: {
    justifyContent: "center",
    display: "flex",
    cursor: "no-drop",
    border: "none",
    backgroundColor: "transparent",
    fontSize: "0.72rem",
    [theme.breakpoints.up("lg")]: {
      width: 100,
      fontSize: "1rem",
    },
  },
  root: {
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
export default function ButtonSelect({ dataOffline, number }) {
  const classes = useStyles();
  const selectedIndex = dataOffline[number - 1].situationMark;
  return (
    <Grid container className={classes.root}>
      <div>
        <button className={classes.btn} disabled>
          {options[selectedIndex]}
        </button>
      </div>
    </Grid>
  );
}
