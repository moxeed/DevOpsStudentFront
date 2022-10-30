import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import ClearIcon from "@material-ui/icons/Clear";
import { Grid, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    width: "80%",

    [theme.breakpoints.up("lg")]: {
      marginRight: 10,
    },
  },
  btn: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: 10,
      marginRight: 0,
    },
  },
  iconStyle: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingTop: 2,
    margin: 0,
  },
}));
export default function MarkSelect({ mark,handleChangeMark }) {
  const classes = useStyles();


  return (
    <Grid container className={classes.root}>
      <RadioGroup
        name="choose"
        value={mark}
        onChange={handleChangeMark}
        className={classes.iconStyle}
      >
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
              style={{ marginLeft: -20 }}
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
