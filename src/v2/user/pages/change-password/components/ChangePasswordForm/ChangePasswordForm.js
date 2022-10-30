import React from "react";
import { Grid, TextField, Typography, Card, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PasswordService } from "../../../../service/passwordService";
import {
  errorToast,
  successToast,
  warningToast,
} from "../../../../../components/utility/toast";
import { useHistory } from "react-router-dom";
import classes from "./ChangePasswordForm.module.scss";
import ChangePass from "../../../../../assets/images/ChangePass.png";

const PasswordLength = 5;

const ChangePasswordForm = () => {
  const [form, setForm] = React.useState({ password: "", confirmPassword: "" });
  const [pending, setPending] = React.useState(false);
  const history = useHistory();
  const submit = (e) => {
    e.preventDefault();
    if (
      form.password === form.confirmPassword &&
      form.password.length >= PasswordLength
    ) {
      setPending(true);
      PasswordService.changePassword(form)
        .then(() => {
          successToast("رمز شما با موفقیت تغییر پیدا کرد");
        })
        .catch(() => {
          errorToast("عدم موفقیت تغییر رمز");
        })
        .finally(() => {
          setPending(false);
        });
    } else {
      if (form.password === "") {
        warningToast("رمز عبور جدید را وارد کنید");
      } else {
        warningToast("رمز عبور و تایید آن مطابقت ندارد");
      }
    }
  };
  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <Card className={classes.Form}>
        <Grid container item justifyContent={"center"} alignItems={"center"}>
          <Grid
            item
            xs={12}
            container
            justifyContent={"center"}
            direction="column"
          >
            <img src={ChangePass} alt="" className={classes.img} />
            <Typography className={classes.Title}>تغییر رمز عبور</Typography>
            <TextField
              color="primary"
              focused
              type={"text"}
              fullWidth
              className={classes.FormInput}
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value.trim(),
                })
              }
              error={form.password.length < PasswordLength}
              label={"رمز ورود"}
            />

            <Typography className={classes.changePassText}>
              {form.password.length < PasswordLength &&
                "رمز جدید وارد شده باید حداقل پنج کارکتر باشد!"}
            </Typography>

            <TextField
              color="primary"
              focused
              type={"text"}
              fullWidth
              className={classes.FormInput}
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value.trim(),
                })
              }
              error={
                form.confirmPassword !== form.password ||
                form.password.length < PasswordLength
              }
              label={"تایید رمز ورود"}
            />
            <Typography className={classes.changePassText}>
              {form.password !== form.confirmPassword &&
                form.confirmPassword.length >= 5 &&
                "رمز وارد شده با رمز بالا تطبیق ندارد!"}
            </Typography>
            <Grid container item xs={12} justifyContent={"space-between"}>
              <Grid item xs={6} container justifyContent={"center"}>
                <LoadingButton
                  loading={pending}
                  type={"submit"}
                  loadingIndicator="درحال بررسی داده"
                  variant={"contained"}
                  onClick={submit}
                  className={classes.ChangeButton}
                >
                  ثبت رمز جدید
                </LoadingButton>
              </Grid>
              <Grid item xs={6} container justifyContent={"center"}>
                <Button
                  variant={"outlined"}
                  onClick={() => {
                    history.push("/v2");
                  }}
                  className={classes.LeftButton}
                >
                  انصراف{" "}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default ChangePasswordForm;
