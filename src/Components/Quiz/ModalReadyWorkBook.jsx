import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Countdown from "antd/lib/statistic/Countdown";
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

export default function ModalReadyWorkBook({ open, quizId, isReady }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const redirect = isReady;
  const history = useHistory();
  const handleComplete = () => {
    if (redirect & (redirect === 1)) {
      history.push(`/WorkBook/${quizId ? quizId : null}`);
    } else if (redirect) {
      history.push(`/QuizReasult/${quizId ? quizId : null}`);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h6">
        زمان آزمون شما به پایان رسیده است ، برای مشاهده کارنامه لطفا منتظر
        بمانید.
      </Typography>
      <Countdown
        style={{ padding: 5 }}
        value={Date.now() + 10000}
        format="s"
        onFinish={() => handleComplete()}
        valueStyle={{ fontSize: "30px", color: "red" }}
      />
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
