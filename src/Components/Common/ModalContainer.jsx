import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Grid } from "@material-ui/core";
import {
  HideModal,
  ModalSelector,
} from "../../Services/StoreSlices/ModalSlice";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: "3px solid #5433d6",
    borderRadius: "2px",
    maxWidth: 550,
    minWidth: 300,
    boxShadow: theme.shadows[0],
    padding: theme.spacing(1, 1, 2),
    maxHeight: "90%",
  },
  close: {
    backgroundColor: "#fff",
    border: "none",
    color: "#727272",
    padding: "0px 0px 8px 16px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#5433d6",
      textDecoration: "none",
    },
  },
}));
export const ModalContainer = () => {
  const { isOpen, content: Component } = useSelector(ModalSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={" Display-align"}
        open={isOpen}
        onClose={() => dispatch(HideModal())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Grid className={classes.paper}>
            <button
              className={classes.close}
              onClick={() => dispatch(HideModal())}
            >
              <HighlightOffIcon style={{ fontSize: "20px" }} />
            </button>
            <Grid className={classes.content}>
              {Component ? (
                <>
                  <Component />
                  {Component}
                </>
              ) : null}
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </>
  );
};
