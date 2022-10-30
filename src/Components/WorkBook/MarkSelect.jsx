import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import ClearIcon from "@material-ui/icons/Clear";
import { Grid, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  btn: {
    marginLeft: 20,
    marginRight: 0,
    cursor: "no-drop",
  },
  iconStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingTop: 2,
  },
}));
export default function MarkSelect({ dataOffline, number }) {
  const marks = `${dataOffline[number - 1].mark}`;
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <RadioGroup name="choose" value={marks} className={classes.iconStyle}>
        <FormControlLabel
          value="1"
          control={
            <Radio
              icon={<LinearScaleIcon fontSize="small" />}
              checkedIcon={
                <LinearScaleIcon
                  style={{ color: "#F0538A", fontSize: "small" }}
                />
              }
              style={{ marginLeft: -20, cursor: "no-drop" }}
            />
          }
        />
        <FormControlLabel
          value="2"
          control={
            <Radio
              icon={<ClearIcon fontSize="small" />}
              checkedIcon={
                <ClearIcon style={{ color: "#F0538A", fontSize: "small" }} />
              }
              className={classes.btn}
            />
          }
        />
      </RadioGroup>
    </Grid>
  );
}
