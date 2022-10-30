import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { HideModal } from "../../Services/StoreSlices/ModalSlice";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HelpIcon from "@material-ui/icons/Help";
import { useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  btn: {
    backgroundColor: "#0092E7",
    color: "white",
  },
  btnRed: {
    backgroundColor: "red",
    color: "white",
  },
}));

const ModalSelectMode = ({ text, quizId, quizMode, webinarId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
 

  return (
    <Grid container>
      <Grid item md={12} xs={12} sm={12} style={{ textAlign: "center" }}>
        <HelpIcon style={{ fontSize: 50 }} />
      </Grid>
      <Grid
        item
        md={12}
        xs={12}
        sm={12}
        style={{ textAlign: "center", padding: 10, fontSize: 15 }}
      >
        <Typography style={{ fontSize: "14px" }}>{text}</Typography>
      </Grid>
      <Grid
        container
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        {quizMode === 1 || quizMode === 2 ? (
          <Link
            to={"/Quiz/" + quizId + "/" + 1 + "/" + webinarId}
            style={{ color: "white" }}
          >
            <Button
              variant="contained"
              size="large"
              className={classes.btn + " Button"}
              onClick={() => dispatch(HideModal())}
            >
              آزمون سوال به سوال
            </Button>{" "}
          </Link>
        ) : null}
        {quizMode === 0 || quizMode === 2 ? (
          <Link
            to={"/Quiz/" + quizId + "/" + 0 + "/" + webinarId}
            style={{ color: "white" }}
          >
            <Button
              variant="contained"
              size="large"
              className={classes.btn + " Button"}
              onClick={() => dispatch(HideModal())}
            >
              آزمون سوالات یکجا با pdf
            </Button>{" "}
          </Link>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default ModalSelectMode;
