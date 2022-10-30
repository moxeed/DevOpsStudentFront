import React from "react";
import {
  makeStyles,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  formControl: {
    "& .MuiFormControlLabel-root": { display: "inline" },
    '& span':{fontsize:16}
  },
}));
export default function OnlineQuizChoice({
  dataOnline,
  handleRadioChangeAnswerNum,
  answerNum,
}) {
  const classes = useStyles();

  return (
    <Grid container>
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup value={answerNum}>
          <FormControlLabel
            value="1"
            control={<Radio onClick={handleRadioChangeAnswerNum} />}
            style={{ display: "flex", marginLeft: "0" }}
            label={
              <div style={{ display: "flex", paddingTop: 10, fontSize: 16 }}>
                1)
                <span
                  className="ck-content"
                  dangerouslySetInnerHTML={{ __html: dataOnline.choice1 }}
                  style={{ paddingRight: 5, fontSize: 16 }}
                ></span>
                {dataOnline.choice3Image && dataOnline.choice4Image !== null ? (
                  <img
                    alt="عکس سوال اول"
                    src={dataOnline.choice1Image}
                    style={{ padding: 10, maxWidth: "200px" }}
                  />
                ) : null}
              </div>
            }
          />
          <FormControlLabel
            value="2"
            control={<Radio onClick={handleRadioChangeAnswerNum} />}
            style={{ display: "flex", marginLeft: "0", fontSize: 16 }}
            label={
              <div style={{ display: "flex", paddingTop: 10, fontSize: 16 }}>
                2)
                <span
                  className="ck-content"
                  dangerouslySetInnerHTML={{ __html: dataOnline.choice2 }}
                  style={{ paddingRight: 5, fontSize: 16 }}
                ></span>
                {dataOnline.choice3Image && dataOnline.choice4Image !== null ? (
                  <img
                    alt="عکس سوال دوم"
                    src={dataOnline.choice2Image}
                    style={{ padding: 10, maxWidth: "200px" }}
                  />
                ) : null}
              </div>
            }
          />
          <FormControlLabel
            value="3"
            control={<Radio onClick={handleRadioChangeAnswerNum} />}
            style={{ display: "inline-flex", marginLeft: "0", fontSize: 16 }}
            label={
              <div style={{ display: "flex", paddingTop: 10, fontSize: 16 }}>
                {" "}
                3)
                <span
                  className="ck-content"
                  dangerouslySetInnerHTML={{ __html: dataOnline.choice3 }}
                  style={{ paddingRight: 5, fontSize: 16 }}
                ></span>
                {dataOnline.choice3Image && dataOnline.choice4Image !== null ? (
                  <img
                    alt="عکس سوال سوم"
                    src={dataOnline.choice3Image}
                    style={{ padding: 10, maxWidth: "200px" }}
                  />
                ) : null}
              </div>
            }
          />
          <FormControlLabel
            value="4"
            control={<Radio onClick={handleRadioChangeAnswerNum} />}
            style={{ display: "flex", marginLeft: "0", fontSize: 16 }}
            label={
              <div
                style={{ display: "flex", paddingTop: 10, fontSize: 16 }}
              >
                4)
                <span
                  className="ck-content"
                  dangerouslySetInnerHTML={{ __html: dataOnline.choice4 }}
                  style={{ paddingRight: 5, fontSize: 16 }}
                ></span>
                {dataOnline.choice4Image && dataOnline.choice4Image !== null ? (
                  <img
                    alt="عکس سوال چهارم"
                    src={dataOnline.choice4Image}
                    style={{ padding: 10, maxWidth: "200px" }}
                  />
                ) : null}
              </div>
            }
          />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
}
