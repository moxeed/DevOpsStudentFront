import * as React from "react";
import { Card, Button, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./ConfirmPhoneNumber.module.scss";
import ConfirmPhone from "src/v2/components/storage/ConfirmPhone";

const ConfirmPhoneNumber = ({ setOpen, userData }) => {
  return (
    <Card className={classes.ConfirmForm}>
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item sx={{ px: 1 }}>
          <Typography className={classes.ConfirmTitle}>
            دانش آموز گرامی آیا شماره {userData.phoneNumber}  شمارۀ شماست؟
          </Typography>
          <Button
            onClick={() => {
              setOpen(false);
              ConfirmPhone.set(true);
            }}
            className={classes.ConfirmButton}
          >
            بله
          </Button>
          <Link to={`v2/identity/change-phone-number`}>
            <Button
              className={classes.ConfirmOutlineButton}
              onClick={() => setOpen(false)}
            >
              تغییر شماره
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ConfirmPhoneNumber;
