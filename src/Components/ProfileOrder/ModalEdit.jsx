import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { IconButton, Modal } from "@material-ui/core";
import IDivider from "../Reusable/IDivider";
import CloseIcon from "@material-ui/icons/Close";
const styles = (theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const ModalEdit = (props) => {
  const { classes, body, visible, handleClose } = props;
  const [modalStyle] = React.useState(getModalStyle);
  return (
    <Modal
      open={visible}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <div style={{ marginRight: 15 }}>
          <IDivider title="ویرایش" color="#41b64e" />
        </div>
        {body}
      </div>
    </Modal>
  );
};
export default withStyles(styles)(ModalEdit);
