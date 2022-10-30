import * as React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { validationUsername } from "src/v2/components/utility/validators";
import {
  errorToast,
  successToast,
  warningToast,
} from "src/v2/components/utility/toast";
import SmsButton from "src/v2/components/reusable/SmsButton/SmsButton";
import theme from "src/v2/styles/theme";
import PhoneNumberInput from "src/v2/components/reusable/PhoneNumberInput/PhoneNumberInput";
import classes from "./ResetPasswordForm.module.scss";
import IdentityContainer from "src/v2/user/components/IdentityContainer/IdentityContainer";
import { PasswordService } from "src/v2/user/service/passwordService";

const ResetPasswordForm = () => {
  const { userName, user } = useParams();
  const [pending, setPending] = React.useState(false);
  const [resetTime, setResetTime] = React.useState(false);
  const [form, setForm] = React.useState({
    userName: "",
  });

  React.useEffect(() => {
    if (userName) {
      setForm({ ...form, userName: userName });
    }
  }, [userName]);

  const resend = (e) => {
    setResetTime(false);
    e.preventDefault();
    if (validationUsername(user !== "user", form.userName)) {
      setPending(true);
      PasswordService.sendResetLink(form)
        .then(() => {
          successToast("کد تغییر رمز برای شما پیامک شد");
        })
        .catch((err) => {
          errorToast(err.message);
          setResetTime(true);
        })
        .finally(() => setPending(false));
    } else {
      warningToast("نام کاربری صحیح نمیباشد");
      setResetTime(true);
    }
  };

  React.useEffect(() => {
    setResetTime(true);
  }, [form.userName]);

  return (
    <IdentityContainer
      Component={() => (
        <form className={`${classes.resetPassFormContainer} ${classes.pishi}`}>
          <Grid
            container
            sx={{
              borderRadius: "6px",
              textAlign: "center",
              alignItems: "center !important",
            }}
          >
            <Grid item sx={{ my: 4 }} xs={12}>
              {user === "user" ? (
                <PhoneNumberInput
                  form={form}
                  setForm={setForm}
                  loading={false}
                  phoneKey={"userName"}
                />
              ) : null}
            </Grid>
            {user === "user" ? (
              <Grid item sx={{ my: 2 }} xs={12}>
                <SmsButton
                  pending={pending}
                  resend={resend}
                  reset={resetTime}
                  disabled={
                    !validationUsername(user === "counter", form.userName)
                  }
                />
              </Grid>
            ) : (
              <Grid xs={12} sx={{ my: 4 }}>
                <Typography
                  variant="h6"
                  color="light"
                  sx={{
                    textAlign: "justify",
                    color: theme.palette.cosmicCobalt,
                  }}
                >
                  کانونی عزیز، نام کاربری شما برای ورود، شمارنده کانونی شماست، و
                  رمز عبور شما، کد ملی شماست.
                </Typography>
                <Typography
                  variant="h6"
                  color="light"
                  sx={{
                    textAlign: "justify",
                    color: theme.palette.cosmicCobalt,
                  }}
                >
                  برای تغییر رمز و پشتیبانی با شماره
                  <a
                    href="tel:02141023000"
                    style={{ color: "red", margin: "0 .5em", fontSize: "1em" }}
                  >
                    02141023000
                  </a>
                  تماس بگیرید
                </Typography>
              </Grid>
            )}

            <Grid item sx={{ m: "0.4em 0" }} xs={12}>
              <Link to={"/v2/identity/login"}>
                <Button className={classes.secondaryButton}>
                  بازگشت به ورود{" "}
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default ResetPasswordForm;
