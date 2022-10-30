import React from "react";
import { Grid, Typography } from "@material-ui/core";
import CardAnswer from "./CardAnswer";
import NoResult from "../Reusable/NoResult";
import { Done, Close } from "@material-ui/icons";

const WorkBookAnswer = ({ dataWorkBook }) => {
  return (
    <Grid container className="Display-align">
      <Grid
        item
        container
        xs={12}
        style={{
          border: "1px solid gray",
        }}
      >
        <Grid item xs={4}>
          <Typography>پاسخ صحیح </Typography>
          <button
            style={{ cursor: "no-drop" }}
            className={"Btn-Quiz + correct"}
          >
            <Done style={{ color: "black" }} />
          </button>
        </Grid>
        <Grid item xs={4}>
          <Typography>پاسخ اشتباه </Typography>
          <button style={{ cursor: "no-drop" }} className={"Btn-Quiz + wrong"}>
            <Close />
          </button>
        </Grid>
        <Grid item xs={4}>
          <Typography> گزینه صحیح </Typography>
          <button style={{ cursor: "no-drop" }} className={"Btn-Quiz + active"}>
            {" "}
            <Done style={{ color: "green" }} />
          </button>
        </Grid>
        {!dataWorkBook?.data?.isPdfMode ? (
          <Grid item xs={12}>
            <Typography variant="h6">
              برای مشاهده پاسخ تشریحی روی گزینه ها کلیک کنید
            </Typography>
          </Grid>
        ) : null}
      </Grid>

      {dataWorkBook?.data?.questions ? (
        <Grid
          container
          item
          justifyContent
          md={9}
          xs={12}
          sm={12}
          style={{
            marginTop: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CardAnswer
            dataWorkBook={dataWorkBook}
            data={dataWorkBook?.data.questions}
          />
        </Grid>
      ) : (
        <NoResult />
      )}
    </Grid>
  );
};

export default WorkBookAnswer;
