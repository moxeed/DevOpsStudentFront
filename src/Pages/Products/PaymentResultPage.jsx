import React, { useEffect, useState } from "react";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import { CheckCircleOutline, HighlightOff } from "@material-ui/icons";
import ContentLoader from "react-content-loader";
import { useHistory, useLocation } from "react-router-dom";
import PaymentSerivce from "../../Services/Financial/PaymentService";
import Background from "../../Assets/Images/Poll.jpg";
import Text from "../../Assets/Text/text.json";
import { useDispatch } from "react-redux";
import { Reset } from "../../Basket/BascketSlice";
import { GApushData } from "src/v2/components/GAlog/GAlog";
import { GetUserId } from "src/Services/Authentication/useAuthentication";
const useStyles = makeStyles(() => ({
  centerContainer: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover , contain",
    height: "92vh",
  },
  paperStyle: {
    background: "transparent",
    boxShadow: "none",
  },

  iconStyle: {
    fontSize: 70,
    padding: 10,
  },
}));

const confirmStates = {
  PENDING: 1,
  PAYMENTREJECT: 2,
  PAYMENTACCEPT: 3,
};

const PaymentResultPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const dispath = useDispatch();
  const [paymentResult, setPaymentReuslt] = useState();
  const [confirmState, setConfirmState] = useState(confirmStates.PENDING);

  useEffect(() => {
    const authority = query.get("Authority");
    if (authority) {
      PaymentSerivce.ConfirmPayment(authority).then(
        (response) => {
          dispath(Reset());
          setConfirmState(confirmStates.PAYMENTACCEPT);
          GApushData("checkout not free", {
            userId: GetUserId(),
            payment: JSON.stringify(response.data),
          });
          setPaymentReuslt(response.data);
        },
        () => setConfirmState(confirmStates.PAYMENTREJECT)
      );
    } else {
      setConfirmState(confirmStates.PAYMENTACCEPT);
    }
  }, []);

  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid container justifyContent="center" className={classes.centerContainer}>
      <Grid xs={10} md={4} item>
        <Paper className={classes.paperStyle}>
          {confirmState === confirmStates.PENDING ? (
            <>
              <ContentLoader style={{ width: "100%", height: 200 }}>
                <circle cx="225" cy="100" r="80" />
              </ContentLoader>
              <ContentLoader style={{ width: "100%", height: 70 }}>
                <rect x="30" y="5" rx="3" ry="3" width="100" height="40" />
                <rect x="340" y="5" rx="3" ry="3" width="100" height="40" />
                <rect x="30" y="60" rx="3" ry="3" width="410" height="2" />
              </ContentLoader>
              <ContentLoader style={{ width: "100%", height: 70 }}>
                <rect x="30" y="5" rx="3" ry="3" width="100" height="40" />
                <rect x="340" y="5" rx="3" ry="3" width="100" height="40" />
                <rect x="30" y="60" rx="3" ry="3" width="410" height="2" />
              </ContentLoader>
              <ContentLoader style={{ width: "100%", height: 70 }}>
                <rect x="30" y="5" rx="3" ry="3" width="100" height="40" />
                <rect x="340" y="5" rx="3" ry="3" width="100" height="40" />
                <rect x="30" y="60" rx="3" ry="3" width="410" height="2" />
              </ContentLoader>
            </>
          ) : (
            <>
              {confirmState === confirmStates.PAYMENTREJECT ? (
                <HighlightOff color="error" className={classes.iconStyle} />
              ) : (
                <CheckCircleOutline
                  style={{ color: "#39AC4D" }}
                  className={classes.iconStyle}
                />
              )}
              <br />
              {paymentResult ? (
                <Grid container spacing={2}>
                  <Grid xs={12} item>
                    مقدار واریز {paymentResult.transactionAmount}
                  </Grid>
                  <Grid xs={12} item>
                    کد رهگیری {paymentResult.tracingCode}
                  </Grid>
                  <Grid xs={12} item>
                    کارت مبدا {paymentResult.origin}
                  </Grid>
                </Grid>
              ) : null}
              {confirmState === confirmStates.PAYMENTREJECT ? (
                <p>{Text.PaymentejectResultPage}</p>
              ) : (
                <p style={{ paddingTop: 40 }}>{Text.PaymenteResultPage}</p>
              )}
              <Button
                className="Button"
                variant="contained"
                color="secondary"
                onClick={() => history.push("/Profile/orders")}
              >
                بازگشت
              </Button>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PaymentResultPage;
