import React from "react";
import { makeStyles, Typography, Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { useHistory } from "react-router-dom";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    textAlign: "center",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ModalConfirmGroupExam({ open, status }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const history = useHistory();
  const changeStatus = (status) => {
    switch (status) {
      case 0:
        return (
          <Typography variant="h6">لطفا ابتدا در آزمون ثبت نام کنید</Typography>
        );
      case -1:
        return (
          <Typography variant="h6">
            گروه آزمایشی شما با گروه آزمایشی آزمون مطابقت ندارد.
          </Typography>
        );
      case -2:
        return <Typography variant="h6">ظرفیت آزمون تکمیل است</Typography>;
      case -3:
        return <Typography variant="h6">زمان شروع آزمون نرسیده است</Typography>;

      default:
        break;
    }
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h5">
        شما نمیتوانید در این آزمون شرکت کنید.
      </Typography>
      {changeStatus(status)}
      <Button
        className=" Button"
        onClick={() => {
          history.push("/");
        }}
      >
        بازگشت
      </Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose="false"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
