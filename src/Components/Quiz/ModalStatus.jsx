import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { HideModal } from "../../Services/StoreSlices/ModalSlice";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HelpIcon from "@material-ui/icons/Help";
import { useDispatch } from "react-redux";

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

const ModalStatus = ({ text, textButton, linkQuiz, secondButton }) => {
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
        style={{ textAlign: "center", padding: 10, fontSize: 15 }}
      >
        {text}
      </Grid>
      <Grid
        container
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        {linkQuiz !== "" ? (
          <>
            {" "}
            <Link to={linkQuiz} style={{ color: "white" }}>
              <Button
                variant="contained"
                size="large"
                className={classes.btn+ " Button"}
                onClick={() => dispatch(HideModal())}
              >
                {textButton}
              </Button>{" "}
            </Link>
            <Button
              size="large"
              variant="contained"
              className={classes.btnRed+ " Button"}
              onClick={() => dispatch(HideModal())}
            >
              {secondButton}
            </Button>
          </>
        ) : (
          <Button
            size="large"
            variant="contained"
            className={classes.btnRed+ " Button"}
            onClick={() => dispatch(HideModal())}
          >
            {secondButton}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default ModalStatus;
