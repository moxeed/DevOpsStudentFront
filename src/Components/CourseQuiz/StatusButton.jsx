import React from "react";
import { Typography, Button } from "@material-ui/core";
import HandleModalStatus from "../Quiz/HandleModalStatus";
import { ShowModal } from "../../Services/StoreSlices/ModalSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function StatusButton({ status, quizId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const changeStatus = (status) => {
    switch (status) {
      case 5:
        return <Typography>شرکت در آزمون</Typography>;
      case 6:
        return <Typography>آزمون آماده نیست</Typography>;
      case 7:
        return <Typography>غیر فعال</Typography>;
      case 1:
        return <Typography>شرکت در آزمون</Typography>;
      case 2:
        return <Typography>دریافت کارنامه</Typography>;
      case 3:
        return <Typography> شرکت در ادامه ی آزمون</Typography>;
      case 4:
        return <Typography>کارنامه آماده نیست </Typography>;
      default:
        break;
    }
  };
  return (
    <Button
      className={
        status === 6 ? "Button Btn-tab  disabled" : " Button Btn-tab +  "
      }
      disabled={status === 6 ? true : false}
      onClick={() => {
        if (status === 2) {
          history.push(`/WorkBook/${quizId}`);
        } else {
          dispatch(ShowModal(() => HandleModalStatus(quizId, 0)));
        }
      }}
    >
      {changeStatus(status)}
    </Button>
  );
}
