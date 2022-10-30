import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { HideModal } from "../../Services/StoreSlices/ModalSlice";
import { useDispatch } from "react-redux";

export default function ModalAnswer({ dataOffline, number, dataWorkBook }) {
  const dispatch = useDispatch();

  if (dataWorkBook.data.isPdfMode === true)
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h6">
            برای دریافت پاسخ نامه،فایل پاسخ نامه را دانلود کنید.
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: 20 }}>
          <Button className=" Button" onClick={() => dispatch(HideModal())}>
            باشه
          </Button>
        </Grid>
      </Grid>
    );
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h6">
          <span
            className="ck-content"
            dangerouslySetInnerHTML={{
              __html: dataOffline[number - 1].questionText,
            }}
          ></span>
        </Typography>

        <Typography variant="h6">
          1)
          <span
            className="ck-content"
            dangerouslySetInnerHTML={{
              __html: dataOffline[number - 1].choice1,
            }}
          ></span>{" "}
        </Typography>
        <Typography variant="h6">
          2)
          <span
            className="ck-content"
            dangerouslySetInnerHTML={{
              __html: dataOffline[number - 1].choice2,
            }}
          ></span>{" "}
        </Typography>
        <Typography variant="h6">
          3)
          <span
            className="ck-content"
            dangerouslySetInnerHTML={{
              __html: dataOffline[number - 1].choice3,
            }}
          ></span>{" "}
        </Typography>
        <Typography variant="h6">
          4)
          <span
            className="ck-content"
            dangerouslySetInnerHTML={{
              __html: dataOffline[number - 1].choice4,
            }}
          ></span>{" "}
        </Typography>
        <Typography variant="h6">
          پاسخ صحیح :{" "}
          <span
            className="ck-content"
            dangerouslySetInnerHTML={{
              __html: dataOffline[number - 1].answerDetailText,
            }}
          ></span>
        </Typography>
      </Grid>

      <Grid item xs={12} style={{ paddingTop: 20 }}>
        <Button className=" Button" onClick={() => dispatch(HideModal())}>
          باشه
        </Button>
      </Grid>
    </Grid>
  );
}
