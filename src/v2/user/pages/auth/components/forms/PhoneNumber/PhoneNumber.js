import * as React from "react";
import { Grid, TextField, Button, Typography, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import { phoneNumberValidation } from "../../../../../../components/utility/validators";
import { AuthService } from "../../../../../service/authService";
import { errorToast } from "../../../../../../components/utility/toast";
import PhoneNumberInput from "../../../../../../components/reusable/PhoneNumberInput/PhoneNumberInput";
import classes from "./PhoneNumber.module.scss";
import { deepPurple } from "@mui/material/colors";
import { toEnglishNumberString } from "src/v2/components/utility/converters";
const STATUS = {
  ENTER_PHONENUMBER: 0,
  ENTER_PASSWORD: 1,
  NOT_REGISTER: 2,
  NOT_FIX_PASSWORD: 3,
};

const PhoneNumber = ({
  form,
  setForm,
  validationPassword,
  setIsNormalUser,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [userStatus, setUserStatus] = React.useState(STATUS.ENTER_PHONENUMBER);
  React.useEffect(() => {
    if (phoneNumberValidation(form.username)) {
      setLoading(true);
      AuthService.inquiry({ userName: form.username })
        .then((res) => {
          if (res.data) setUserStatus(STATUS.ENTER_PASSWORD);
          setIsNormalUser(true);
        })
        .catch((err) => {
          if (err.errorCode === 1005) {
            errorToast("کاربری با این شماره یافت نشد");
            setUserStatus(STATUS.NOT_REGISTER);
          } else if (err.errorCode === 1004) {
            errorToast("رمز ثابت برای شما ثبت نشده است");
            setUserStatus(STATUS.NOT_FIX_PASSWORD);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setUserStatus(STATUS.ENTER_PHONENUMBER);
      setIsNormalUser(false);
    }
  }, [form.username]);
  return (
    <React.Fragment>
      <Grid item sx={{ my: 2 }}>
        <PhoneNumberInput
          form={form}
          setForm={setForm}
          loading={loading}
          phoneKey={"username"}
        />
      </Grid>
      {userStatus === STATUS.ENTER_PASSWORD && (
        <Grid item sx={{ my: 2 }}>
          <TextField
            type={showPassword ? "text" : "password"}
            className={classes.inputRounded}
            fullWidth
            onChange={(e) =>
              setForm({
                ...form,
                password: toEnglishNumberString(e.target.value.trim()),
              })
            }
            value={form.password}
            sx={{ input: { direction: "rtl", textAlign: "right" } }}
            error={!validationPassword()}
            label={"رمز ورود"}
          />
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <Typography variant="p" sx={{ fontSize: "1.2em" }}>
                <Checkbox
                  onChange={() => setShowPassword(!showPassword)}
                  sx={{
                    "&.Mui-checked": {
                      color: deepPurple["A400"],
                    },
                  }}
                />
                نمایش گذرواژه
              </Typography>
            </Grid>
            <Grid item sx={{ my: 2 }}>
              <Link
                to={`/v2/identity/send-reset-link/user/${form.username}`}
              >
                <Typography variant="p" className={classes.forgotPassword}>
                  رمز عبور خود را فراموش کرده اید؟
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      )}
      {userStatus === STATUS.NOT_FIX_PASSWORD && (
        <Button
          component={Link}
          to={`/v2/identity/send-reset-link/user/${form.username}`}
          variant="contained"
          className={classes.primaryButton}
          sx={{ marginBottom: "1em !important" }}
        >
          ثبت رمز ثابت
        </Button>
      )}
      {userStatus === STATUS.NOT_REGISTER && (
        <Link to={`/v2/identity/register/${form.username}`}>
          <button
            // component={Link}
            // variant="contained"
            // to={`/v2/identity/register/${form.username}`}
            className={classes.primaryButton}
          >
            ثبت نام با شماره
          </button>
        </Link>
      )}
    </React.Fragment>
  );
};

export default PhoneNumber;
