import * as React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import OtpInput from "react-otp-input";
import { LoadingButton } from "@mui/lab";
import { phoneNumberValidation } from "../../../../../components/utility/validators";
import { profileService } from "../../../../service/profileService";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../../../../components/utility/toast";
import SmsButton from "../../../../../components/reusable/SmsButton/SmsButton";
import PhoneNumberInput from "../../../../../components/reusable/PhoneNumberInput/PhoneNumberInput";
import IdentityContainer from "../../../../components/IdentityContainer/IdentityContainer";
import classes from "./ConfirmPhoneNumberForm.module.scss";
import { useAuthentication } from "../../../../../components/slice/useAuthentication";
import theme from "../../../../../styles/theme";

const ConfirmPhoneNumberForm = () => {
  const [form, setForm] = React.useState({
    phoneNumber: "",
    id: "",
    code: 0,
  });

  const history = useHistory();
  const { id } = useParams();
  const [pending, setPending] = React.useState(false);
  const [resetTime, setResetTime] = React.useState(false);
  const { RegisterUser } = useAuthentication();

  React.useEffect(() => {
    if (id) {
      setForm({ ...form, id: id });
    }
  }, [id]);

  const sendOTP = () => {
    setResetTime(false);
    if (phoneNumberValidation(form.phoneNumber)) {
      setPending(true);
      profileService
        .sendOTP({ phoneNumber: form.phoneNumber })
        .then((res) => {
          successToast(res.data.message);
        })
        .catch((err) => {
          errorToast(err.message);
          setResetTime(true);
        })
        .finally(() => setPending(false));
    } else {
      warningToast("شماره درست وارد نشده است");
      setResetTime(true);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (
      form.id !== "" &&
      phoneNumberValidation(form.phoneNumber) &&
      `${form.code}`.length === 4
    ) {
      setPending(true);
      profileService
        .confirmPhoneNumber({
          ...form,
          code: +form.code,
          phoneNumber: form.phoneNumber,
        })
        .then((res) => {
          RegisterUser(res.data);
          successToast(" تایید شماره با موفقیت انجام شد");
          history.push("/");
        })
        .catch((err) => {
          errorToast(err.message);
        })
        .finally(() => {
          setPending(false);
        });
    } else {
      warningToast("اطلاعات درست وارد نشده است");
    }
  };

  const setOTP = (otp) => setForm({ ...form, code: otp });

  return (
    <IdentityContainer
      Component={() => (
        <form
          className={`${classes.confirmPhoneNumberContainer} ${classes.pishi}`}
        >
          <Grid container sx={{ textAlign: "center" }}>
            <Grid item xs={12} sx={{ my: 2 }}>
              <Typography
                variant="p"
                className={classes.confirmPhoneNumberTitle}
              >
                تایید شماره تماس
              </Typography>
            </Grid>
            <Grid xs={12} container item alignItems={"center"}>
              <Grid item xs={12} md={12}>
                <PhoneNumberInput
                  form={form}
                  setForm={setForm}
                  loading={false}
                  phoneKey={"phoneNumber"}
                />
              </Grid>
              <Grid item xs={12} md={12} sx={{ my: 4 }}>
                <SmsButton
                  resend={sendOTP}
                  pending={pending}
                  reset={resetTime}
                  disabled={!phoneNumberValidation(form.phoneNumber)}
                />
              </Grid>
            </Grid>
            <Grid
              xs={12}
              item
              sx={{
                display: "grid",
                placeItems: "center",
                direction: "rtl",
                p: 2,
              }}
            >
              <React.Fragment>
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
              </React.Fragment>
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent={"center"}
              sx={{ p: 2 }}
            >
              <LoadingButton
                className={classes.primaryButton}
                loading={pending}
                type={"submit"}
                loadingIndicator="درحال بررسی داده"
                variant={"contained"}
                onClick={submit}
              >
                تایید شماره تماس
              </LoadingButton>
            </Grid>
            <Grid
              item
              xs={12}
              container
              justifyContent={"center"}
              sx={{ p: 2 }}
            >
              <Button
                type={"submit"}
                variant={"contained"}
                onClick={() => {
                  history.push("/v2/identity/login");
                }}
                className={classes.secondaryButton}
              >
                بازگشت{" "}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default ConfirmPhoneNumberForm;
