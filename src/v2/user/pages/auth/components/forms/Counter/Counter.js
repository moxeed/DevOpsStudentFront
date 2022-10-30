import * as React from "react";
import { Grid, TextField, Typography, Checkbox } from "@mui/material";
import { toEnglishNumberString } from "../../../../../../components/utility/converters";
import theme from "../../../../../../styles/theme";
import classes from "./Counter.module.scss";
import { Link } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";

const Counter = ({ form, setForm }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const usernameValidator = () =>
    form.username.length === 9 || form.username.length === 0;
  const passwordValidator = () =>
    form.password.length === 10 || form.password.length === 0;

  return (
    <React.Fragment>
      <Grid item sx={{ my: 2 }}>
        <TextField
          fullWidth
          className={classes.inputRounded}
          type={"number"}
          value={form.username}
          sx={{
            input: { direction: "rtl", textAlign: "right" },
            borderColor: theme.palette.middleBlue,
          }}
          onChange={(e) =>
            e.target.value.length <= 9 &&
            setForm({
              ...form,
              username: toEnglishNumberString(e.target.value.trim()),
            })
          }
          error={!usernameValidator()}
          label={"شمارنده"}
        />
      </Grid>
      <Grid item sx={{ my: 2 }}>
        <TextField
          className={classes.inputRounded}
          type={showPassword ? "text" : "password"}
          value={form.password}
          fullWidth
          sx={{
            borderColor: theme.palette.middleBlue,
            input: { direction: "rtl", textAlign: "right" },
          }}
          onChange={(e) =>
            setForm({
              ...form,
              password: toEnglishNumberString(e.target.value.trim()),
            })
          }
          error={!passwordValidator()}
          label={"رمز عبور ( کد ملی)"}
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
            <Link to={`/v2/identity/send-reset-link/counter/${form.username}`}>
              <Typography variant="p" className={classes.forgotPassword}>
                رمز عبور خود را فراموش کرده اید؟
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Counter;
