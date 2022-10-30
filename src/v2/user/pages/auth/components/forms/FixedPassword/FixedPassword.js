import * as React from "react";
import { Grid, Button, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useHistory, Link } from "react-router-dom";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import { validationUsername } from "../../../../../../components/utility/validators";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../../../../../components/utility/toast";
import { AuthService } from "../../../../../service/authService";
import Counter from "../Counter/Counter";
import PhoneNumber from "../PhoneNumber/PhoneNumber";
import { useAuthentication } from "../../../../../../components/slice/useAuthentication";
import classes from "./FixedPassword.module.scss";
import { GApushData } from "src/v2/components/GAlog/GAlog";
import UUID from "src/v2/components/storage/ClientId";
import ConfirmPhone from "src/v2/components/storage/ConfirmPhone";

const FixedPassword = ({ isCounter }) => {
  const [form, setForm] = React.useState({ username: "", password: "" });
  const [pending, setPending] = React.useState(false);
  const [isNormalUser, setIsNormalUser] = React.useState(false);
  const [id, setId] = React.useState("");
  const history = useHistory();
  const { RegisterUser } = useAuthentication();

  React.useEffect(() => {
    setForm({ username: "", password: "" });
  }, [isCounter]);

  const validationPassword = () => {
    return form.password.length >= 5;
  };

  const submit = (e) => {
    setId("");
    e.preventDefault();
    if (!validationUsername(isCounter, form.username)) {
      warningToast("نام کاربری درست وارد نشده است");
    } else if (!validationPassword()) {
      warningToast("رمز را وارد کنید");
    } else {
      setPending(true);
      AuthService.login(form)
        .then((res) => {
          RegisterUser(res.data);
          if (!isCounter) ConfirmPhone.set(true);
          if (isCounter) {
            GApushData("login with counter", {
              clientName: form.username,
              clientSystem: UUID.get(),
            });
          } else {
            GApushData("login with phone", {
              clientName: form.username,
              clientSystem: UUID.get(),
            });
          }
          setPending(false);
          successToast("ورود شما موفقیت آمیز بود");
        })
        .catch((err) => {
          if (err.errorCode === 1001) {
            setId(err.data.id);
          }
          errorToast(err.message);
          GApushData("error with login", {
            clientName: form.username,
            clientSystem: UUID.get(),
            errorCode: err.errorCode,
            message: err.message,
          });
        })
        .finally(() => setPending(false));
    }
  };
  return (
    <Grid
      className={classes.fixedPasswordContainer}
      container
      direction={"column"}
      justifyContent={"start"}
    >
      {isCounter ? (
        <Counter
          form={form}
          setForm={setForm}
          isCounter={isCounter}
          username={form.username}
        />
      ) : (
        <PhoneNumber
          form={form}
          setForm={setForm}
          setIsNormalUser={setIsNormalUser}
          validationPassword={validationPassword}
        />
      )}
      <Grid item container justifyContent="space-between" alignItems="center">
        {id !== "" ? (
          <Button
            component={Link}
            variant="contained"
            to={`/v2/identity/confirm-phone-number/${id}`}
            className={classes.primaryButton}
            sx={{
              boxShadow: "none",
            }}
          >
            تایید شماره تماس
            <PhonelinkIcon fontSize="medium" sx={{ marginLeft: "0.4em" }} />
          </Button>
        ) : (
          <React.Fragment>
            {" "}
            <LoadingButton
              loading={pending}
              type={"submit"}
              loadingIndicator="درحال بررسی داده"
              variant={"contained"}
              onClick={submit}
              className={classes.primaryButton}
              sx={{
                display: isNormalUser || isCounter ? "inline-flex" : "none",
              }}
            >
              ورود
            </LoadingButton>
          </React.Fragment>
        )}
        <Grid item>
          <Typography variant="p" className={classes.register}>
            حساب کاربری ندارید؟
            <span onClick={() => history.push("/v2/identity/register")}>
              ثبت نام
            </span>
            کنید
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FixedPassword;
