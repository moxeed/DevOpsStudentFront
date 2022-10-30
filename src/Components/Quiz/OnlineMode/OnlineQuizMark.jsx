import React from "react";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ClearIcon from "@material-ui/icons/Clear";
import MaximizeIcon from "@material-ui/icons/Maximize";
import {
  Typography,
  FormControl,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@material-ui/core";

export default function OnlineQuizMark({ handleRadioChangeMark, mark }) {
  return (
    <>
      <FormControl component="fieldset">
        <Typography
          style={{
            padding: 10,
            verticalAlign: "bottom",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          تکنیک ضربدر منها :
        </Typography>
        <RadioGroup
          data-testid="Mark-button"
          aria-label="mark"
          name="mark"
          value={mark}
          onChange={handleRadioChangeMark}
          style={{ display: "inline", padding: 1 }}
        >
          <FormControlLabel
            value="2"
            control={<Radio id="Mark2" data-testid="Mark2" />}
            label={
              <div style={{ display: "flex", fontSize: 16 }}>
                شک دار و زمان بر{" "}
                <div style={{ marginRight: 5 }}>
                  <ClearIcon style={{ verticalAlign: "middle" }} />
                </div>
              </div>
            }
          />

          <FormControlLabel
            value="1"
            control={<Radio id="Mark1" data-testid="Mark1" />}
            label={
              <div style={{ display: "flex", fontSize: 16 }}>
                دشوار
                <div style={{ marginTop: 5, marginRight: 5 }}>
                  <MaximizeIcon style={{ verticalAlign: "bottom" }} />
                </div>
              </div>
            }
          />

          <FormControlLabel
            value="0"
            control={<Radio id="Mark0" />}
            label={
              <div style={{ display: "flex", fontSize: 16 }}>
                بدون علامت{" "}
                <div style={{ marginRight: 5 }}>
                  <BookmarkBorderIcon
                  // style={{ marginRight: 15, verticalAlign: "bottom" }}
                  />{" "}
                </div>
              </div>
            }
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}
