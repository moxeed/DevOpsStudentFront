import {
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import PhoneNumberValidation from "../../Utility/PhoneNumberValidation";
import { convertNumbers2English } from "../../Utility/ConvertFatoEnDigits";

const PhoneNumberBox = ({ setUser }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmitNumber = (e) => {
    e.preventDefault();
    setUser(phoneNumber);
  };
  return (
    <Card
      style={{
        padding: "1em",
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h4">سامانه دریافت همایش های دانش آموز</Typography>
      <Divider style={{ margin: "1em" }} />
      <form onSubmit={(e) => handleSubmitNumber(e)}>
        <Grid container direction={"column"} alignContent={"center"}>
          <Grid item>
            <Typography variant="h6">
              شماره تماس خود را جهت دریافت همایش های فعال خریداری شده وارد کنید.
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              type={"number"}
              onChange={(e) =>
                setPhoneNumber(convertNumbers2English(e.target.value))
              }
              error={!PhoneNumberValidation(phoneNumber)}
              label={"شماره تماس"}
              helperText="شماره وارد شده باید با شماره ای که با آن محصول خریداری شده یکسان باشد"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: "2em", padding: "1em", width: "60%" }}
              disabled={!PhoneNumberValidation(phoneNumber)}
              type="submit"
            >
              ثبت
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default PhoneNumberBox;
