import { LoadingButton } from "@mui/lab";
import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import PropTypes from "prop-types";
import theme from "src/v2/styles/theme";
import classes from "./SmsButton.module.scss";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";

const RESENDTIME = 120000;

const SmsButton = ({ pending, resend, reset, disabled }) => {
  const [time, setTime] = React.useState(0);

  useEffect(() => {
    if (reset) {
      setTime(0);
    }
  }, [reset]);

  return time === 0 ? (
    <Grid item xs={12}>
      <LoadingButton
        variant={"contained"}
        disabled={disabled}
        loading={pending}
        loadingIndicator={"درحال پردازش"}
        type={"submit"}
        onClick={(e) => {
          resend(e);
          setTime(Date.now() + RESENDTIME);
        }}
        className={classes.primaryButton}
      >
        <SmsOutlinedIcon sx={{ mx: 3 }} />
        دریافت پیامک
      </LoadingButton>
    </Grid>
  ) : (
    <Grid item sx={{ my: 4 }} xs={12}>
      <Typography component={"span"} variant="caption" xs={12}>
        <Countdown
          date={time}
          renderer={({ minutes, seconds, completed }) => {
            if (completed) {
              setTime(0);
              return <div />;
            }
            return (
              <span style={{ color: theme.palette.cosmicCobalt }}>
                {"تا فعال شدن ارسال مجدد " + zeroPad(minutes)}:
                {zeroPad(seconds) + " صبر نمایید."}
              </span>
            );
          }}
        />
      </Typography>
    </Grid>
  );
};

SmsButton.propTypes = {
  pending: PropTypes.bool.isRequired,
  resend: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SmsButton;
