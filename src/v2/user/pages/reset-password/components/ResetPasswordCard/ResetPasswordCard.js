import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import useQuery from "../../../../../components/hooks/QueryParam";
import { PasswordService } from "../../../../service/passwordService";
import { errorToast } from "../../../../../components/utility/toast";
import { useAuthentication } from "../../../../../components/slice/useAuthentication";
import classes from "./ResetPasswordCard.module.scss";
import IdentityContainer from "../../../../components/IdentityContainer/IdentityContainer";

const ResetPasswordCard = () => {
  const { token } = useParams();
  const query = useQuery();
  const BAT = query.get("BAT");
  const [pending, setPending] = React.useState(false);
  const { RegisterUser } = useAuthentication();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (BAT) {
      setPending(true);
      PasswordService.resetPassword(BAT, { initialClientId: token })
        .then((res) => {
          RegisterUser(res.data);
        })
        .catch(() => {
          setError(true);
          errorToast("ورود شما با مشکل مواجه شد.");
        })
        .finally(() => setPending(false));
    }
  }, [BAT]);
  return (
    <IdentityContainer
      Component={() => (
        <form className={`${classes.resetPassContainer} ${classes.pishi}`}>
          <Grid
            container
            justifyContent="space-around"
            sx={{ textAlign: "justify" }}
          >
            <Typography
              variant="p"
              className={classes.resetPassTitle}
              sx={{ my: 2 }}
            >
              شما با موفقیت وارد شدید!
            </Typography>
            <Typography className={classes.resetPassText}>
              رمز موقت برای شما پیامک شده و از این پس می{"\u200c"}توانید با این
              رمز وارد سایت شوید.
            </Typography>
            <Typography className={classes.resetPassText}>
              اگر از طریق دستگاه دیگری درخواست تغییر رمز داده بودید، در آن
              دستگاه به طور خودکار وارد شده اید.
            </Typography>
            <Typography className={classes.resetPassText}>
              درصورتی که می{"\u200c"}خواهید رمز ورود خود را تفییر دهید، روی دکمۀ
              تغییر رمز کلیک کنید.
            </Typography>
            {!pending ? (
              <Grid
                container
                item
                xs={12}
                justifyContent="space-around"
                sx={{ my: 4 }}
              >
                {!error ? (
                  <React.Fragment>
                    <Grid item xs={12} md={12} sx={{ my: 2 }}>
                      <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        className={classes.primaryButton}
                      >
                        ورود به سایت
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{ my: 2 }}>
                      <Button
                        component={Link}
                        to="/v2/profile/change-password"
                        className={classes.secondaryButton}
                      >
                        تغییر رمز ورود
                      </Button>
                    </Grid>
                  </React.Fragment>
                ) : (
                  <Grid item xs={12} md={12} sx={{ my: 2 }}>
                    <Typography color="primary">
                      توکن شما منقضی شده است، لطفا مجدد وارد شوید.
                    </Typography>
                    <Button
                      component={Link}
                      to="/v2/identity/login"
                      className={classes.primaryButton}
                    >
                      ورود{" "}
                    </Button>
                  </Grid>
                )}
              </Grid>
            ) : (
              <Grid item xs={12}>
                <LoadingButton
                  loading={pending}
                  type={"submit"}
                  loadingIndicator="درحال ثبت رمز جدید"
                  variant={"contained"}
                  className={classes.secondaryButton}
                >
                  در حال جست و جو
                </LoadingButton>
              </Grid>
            )}
          </Grid>
        </form>
      )}
    />
  );
};

export default ResetPasswordCard;
