import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { Button, Grid } from "@material-ui/core";
const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: 50,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
    color: "black",

    opacity: 1,
    borderBottom: 0,
    "&:before": {
      borderBottom: 0,
    },
  },
  disabled: {
    color: "black",
    borderBottom: 0,
    "&:before": {
      borderBottom: 0,
    },
  },
  btnIcons: {
    marginLeft: 10,
  },
  subRow: {
    "&:hover": {
      backgroundColor: "red",
    },
  },
});

const EditPhoneNumber = ({
  handleChangePhoneNumber,
  userphoneNumber,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="cardStyle">
      <Grid container justifyContent="center">
        <Grid item container justifyContent="center">
          <Grid item md={4} sm={4} xs={4} style={{ paddingTop: 20 }}>
            شماره تماس :
          </Grid>
          <Grid
            item
            md={8}
            sm={8}
            xs={8}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <TextField
              required
              name="phoneNumber"
              defaultValue={userphoneNumber}
              className={"Form__input"}
              placeholder="09*********"
              margin="normal"
              error={userphoneNumber === ""}
              helperText={
                userphoneNumber === "" ? "شماره تماس  را وارد کنید!" : " "
              }
              onChange={handleChangePhoneNumber}
              //   className={classes.textField}
            />
          </Grid>
        </Grid>

        <Grid item container md={12} xs={12} style={{ direction: "ltr" }}>
          <Button className="Button" type="submit" variant="contained">
            ثبت
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default withStyles(styles)(EditPhoneNumber);
