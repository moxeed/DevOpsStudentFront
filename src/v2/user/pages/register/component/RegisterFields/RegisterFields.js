import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import PhoneNumberInput from "../../../../../components/reusable/PhoneNumberInput/PhoneNumberInput";
import SmsButton from "../../../../../components/reusable/SmsButton/SmsButton";
import { phoneNumberValidation } from "../../../../../components/utility/validators";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { LoadingButton } from "@mui/lab";
import classes from "./RegisterFields.module.scss";
import theme from "../../../../../styles/theme";

export default function RegisterFields({
  form,
  setForm,
  PasswordLength,
  handleChange,
  sendOTP,
  resetTime,
  alreadyHasAccount,
  submit,
  pending,
  setOTP,
}) {
  return (
    <form className={`${classes.registerFieldsContainer} ${classes.pishi}`}>
      <Grid
        container
        justifyContent={"center"}
        sx={{ width: "100%", height: "100%", marginLeft: 0 }}
      >
        <Grid
          item
          xs={12}
          md={12}
          justifyContent={"center"}
          sx={{ textAlign: "center" }}
        >
          <div className={classes.registerFieldsTitle}>ثبت نام در برترها</div>
        </Grid>
        <Grid
          xs={12}
          item
          sx={{ my: 2 }}
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={12} sx={{ my: 2 }}>
            <PhoneNumberInput
              form={form}
              setForm={setForm}
              loading={false}
              phoneKey={"phoneNumber"}
            />
          </Grid>
          <Grid item xs={12} md={12} sx={{ my: 2 }}>
            <SmsButton
              resend={sendOTP}
              pending={pending}
              reset={resetTime}
              disabled={!phoneNumberValidation(form.phoneNumber)}
            />
          </Grid>
        </Grid>
        {alreadyHasAccount ? (
          <Grid
            xs={12}
            item
            sx={{
              display: "grid",
              placeItems: "center",
              direction: "rtl",
              my: 2,
            }}
          >
            <Button
              component={Link}
              color={"secondary"}
              variant={"contained"}
              to={`/v2/identity/login`}
              className={classes.primaryButton}
            >
              ورود به حساب کاربری
            </Button>
          </Grid>
        ) : (
          <React.Fragment>
            <Grid
              xs={12}
              item
              sx={{
                display: "grid",
                placeItems: "center",
                direction: "rtl",
              }}
            >
              <Typography sx={{ color: theme.palette.darkSpaceCadet }}>
                .کد تایید پیامک شده را وارد کنید
              </Typography>
              <OtpInput
                value={form.code}
                onChange={setOTP}
                numInputs={4}
                separator={"\u2003"}
                inputStyle={classes.otp}
              />
            </Grid>
            <Grid item xs={12} md={12} sx={{ my: 2 }}>
              <TextField
                className={classes.inputRounded}
                value={form.password}
                fullWidth
                type="text"
                name="password"
                label={" رمز ورود"}
                error={
                  form.password.length < PasswordLength &&
                  form.password.length !== 0
                }
                variant={"outlined"}
                helperText="حداقل 5 کارکتر باشد."
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={12} sx={{ my: 2 }}>
              <TextField
                className={classes.inputRounded}
                value={form.confirmPassword}
                fullWidth
                error={
                  (form.password !== form.confirmPassword ||
                    form.confirmPassword.length < PasswordLength) &&
                  form.confirmPassword.length !== 0
                }
                name="confirmPassword"
                type={"text"}
                helperText="رمز را مجدد وارد کنید."
                label={"تایید رمز ورود"}
                variant={"outlined"}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent={"center"}
              sx={{ my: 2 }}
            >
              <LoadingButton
                className={classes.primaryButton}
                loading={pending}
                type={"submit"}
                loadingIndicator="درحال بررسی داده"
                variant={"contained"}
                onClick={submit}
              >
                ثبت نام
              </LoadingButton>
            </Grid>
          </React.Fragment>
        )}
        <Grid item xs={12} container justifyContent={"start"}>
          <Link to="/v2/identity/login">
            <Grid>
              <Typography variant="p" className={classes.forgotPassword}>
                عضو کانون هستید؟ وارد شوید.
              </Typography>
            </Grid>
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}
