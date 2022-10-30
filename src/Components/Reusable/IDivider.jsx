import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  divider: {
    color: (props) => props.color,
    display: "flex",
    "&:before,&:after": {
      content: "''",
      flex: 1,
      backgroundColor: (props) => props.color,
    },
    fontSize: "18px",
  },
  line: {
    alignItems: "center",
    margin: " .2em -.5em",
    "&:before,&:after": {
      height: "1px",
      margin: "0 2em",
    },
  },
  oneLine: {
    "&:before,&:after": {
      backgroundColor: (props) => props.color,
    },
  },
});

export default function IDivider({ title, color = "#A0A0A0" }) {
  const props = { color: color };
  const classes = useStyles(props);
  return (
    <h2 className={`${classes.divider} ${classes.line} ${classes.oneLine}`}>
      {title}
    </h2>
  );
}
