import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Typography } from "@material-ui/core";

export default function OnlineQuizSituationMark({
  handleRadioChangeSituationMark,
  situationMark,
}) {
  return (
    <>
      <Typography style={{ padding: 10, fontWeight: "bold", fontSize: 16 }}>
        {" "}
        تکنیک (ف,ش,ن,م ) :
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="situationMark"
          name="situationMark"
          value={situationMark}
          onChange={handleRadioChangeSituationMark}
          style={{ display: "inline", marginTop: -10, fontSize: 16 }}
          id="SituationMark"
        >
          <FormControlLabel
            value="4"
            control={<Radio id="SituationMark4" />}
            label={<Typography style={{ fontSize: 16 }}>سوال مهم</Typography>}
          />
          <FormControlLabel
            value="3"
            control={<Radio id="SituationMark3" />}
           
            label={
              <Typography style={{ fontSize: 16 }}>ناقص یاد گرفتم</Typography>
            }
          />
          <FormControlLabel
            value="2"
            control={<Radio id="SituationMark2" />}
            label={<Typography style={{ fontSize: 16 }}>شک دارم</Typography>}
           
          />
          <FormControlLabel
            value="1"
            control={<Radio id="SituationMark1" />}
          
            label={
              <Typography style={{ fontSize: 16 }}>فراموش کردم</Typography>
            }
          />
          <FormControlLabel
            value="0"
            control={<Radio id="SituationMark0" />}
            label={<Typography style={{ fontSize: 16 }}>بدون علامت</Typography>}
           
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}
