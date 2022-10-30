import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useParams, useHistory } from "react-router-dom";
import WorkBokService from "../../Services/Quiz/WorkBook";
import ContentLoader from "react-content-loader";
import { Typography, Card } from "@material-ui/core";
import { DateTime } from "../../Utility/Date/DateTime";

export default function QuizReasult() {
  const { id } = useParams();
  const [data, setData] = useState();
  const history = useHistory();
  useEffect(() => {
    WorkBokService.GetQuizDetails(id).then((res) => {
      setData(res.data);
    });
  }, [id]);

  return (
    <Grid container justifyContent="center" style={{ padding: 30 }}>
      {data ? (
        <Card style={{ textAlign: "center", width: "50%", padding: 10 }}>
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            style={{ textAlign: "center", padding: 15, fontSize: 25 }}
          >
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {" "}
              {data.quizTitle}
            </Typography>
            <Typography variant="h6">
              با تشکر از شما برای شرکت در این آزمون
            </Typography>
            <Typography variant="h6">
              زمان اعلام کارنامه شما :{" "}
              <DateTime date={new Date(data.resultDate)} />{" "}
            </Typography>
            <Typography variant="h6">
              فایل سوالات و پاسخ نامه آزمون را می توانید در زمان مشاهده کارنامه
              دانلود کنید
            </Typography>
          </Grid>
          <Button
            className="Button"
            variant="contained"
            color="secondary"
            onClick={() => history.push("/")}
          >
            بازگشت به خانه
          </Button>
        </Card>
      ) : (
        <ContentLoader
          style={{
            width: "80%",
            height: 200,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <rect x="50" y="8" rx="3" ry="3" width="80%" height="500" />
        </ContentLoader>
      )}
    </Grid>
  );
}
