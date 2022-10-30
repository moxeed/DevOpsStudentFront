import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import {
  CircularProgress,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import HttpsIcon from "@mui/icons-material/Https";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { PaymentService } from "src/v2/store/service/PaymentService";
import AddCardIcon from "@mui/icons-material/AddCard";
import ScheduleIcon from "@mui/icons-material/Schedule";
import VerifiedIcon from "@mui/icons-material/Verified";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import JDate from "jalali-date";
import TomanConverter from "src/Utility/TomanConverter";
import BlueButton from "src/v2/components/reusable/BlueButton/BlueButton";

export const Payment = () => {
  const { id } = useParams();
  const [payment, setPayment] = useState();
  const [link, setLink] = useState();

  const history = useHistory();
  function time_format(d) {
    const hours = format_two_digits(d.getHours());
    const minutes = format_two_digits(d.getMinutes());
    return hours + ":" + minutes;
  }

  function format_two_digits(n) {
    return n < 10 ? "0" + n : n;
  }

  useEffect(() => {
    PaymentService.Pay(id).then((res) => {
      setPayment(res.order);
      setLink(res.paymentUrl);
    });
  }, []);

  if (!payment)
    return (
      <Container
        sx={{ minHeight: "80vh", display: "grid", placeItems: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  return (
    <Container
      sx={{
        minHeight: "80vh",
        display: "grid",
        placeItems: "center",
        backgroundColor: "white",
        mt: "2em",
        padding: 3,
      }}
    >
      <Grid container sx={{ mt: 8 }}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h4">نتیجه پرداخت سفارش </Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center", m: 4 }}>
          <Typography variant="h5">
            آخرین وضعیت : {payment.lastStateTitle}
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            {" مبلغ سفارش:"}
            <TomanConverter Rial={payment.totalAmount} />
          </Typography>
        </Grid>

        <Grid item xs={12} md={12} sx={{ p: 4 }}>
          <Typography variant="h5" component="div">
            محصولات سفارش
          </Typography>
          <List dense={true}>
            {payment.items.map((item, id) => (
              <ListItem
                key={id}
                secondaryAction={
                  <Toolbar title="دیدن محصول">
                    <IconButton
                      edge="end"
                      disabled={item.category !== "Rayan-Class"}
                      aria-label="product"
                      onClick={() => {
                        if (item.category === "Rayan-Class")
                          history.push(
                            `/v2/store/rayan/${item.referenceProductCode}`
                          );
                      }}
                    >
                      <OpenInNewIcon fontSize="large" color="error" />
                    </IconButton>
                  </Toolbar>
                }
                disablePadding
              >
                <ListItemIcon>
                  <HttpsIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "1.2em" }}
                  primary={
                    <Typography
                      variant="p"
                      component="div"
                      sx={{ fontSize: "1em" }}
                    >
                      {item.productTitle}
                    </Typography>
                  }
                  secondary={
                    <p style={{ fontSize: "1.2em" }}>
                      <TomanConverter Rial={item.price} />
                      <Typography>
                        وضعیت محصول : {item.lastStateTitle}
                      </Typography>
                    </p>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="h5" component="div">
            روند خرید محصول{" "}
          </Typography>
          <Timeline position="right">
            {payment.states.map((item, _id) => (
              <TimelineItem key={_id} sx={{ "&::before": { content: "none" } }}>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot
                    color={
                      item.state === 1
                        ? "primary"
                        : item.state === 2
                        ? "error"
                        : item.state === 6
                        ? "info"
                        : "secondary"
                    }
                  >
                    {item.state === 1 ? (
                      <AddCardIcon />
                    ) : item.state === 2 ? (
                      <ScheduleIcon />
                    ) : item.state === 6 ? (
                      <VerifiedIcon />
                    ) : (
                      <HistoryToggleOffIcon />
                    )}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <Typography variant="h6" component="span">
                    {item.stateTitle}
                  </Typography>
                  <Typography>
                    {new JDate(new Date(item.createdAt)).format(
                      "dddd DD MMMM YYYY"
                    ) +
                      " ساعت " +
                      time_format(new Date(item.createdAt))}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Grid>
        {payment.lastState === 2 && (
          <Grid
            item
            xs={6}
            sm={6}
            sx={{ display: "grid", placeItems: "center", my: 4 }}
          >
            <BlueButton
              func={() => {
                window.location.href = link;
              }}
              label="پرداخت مجدد"
            />
          </Grid>
        )}
        <Grid
          item
          xs={6}
          sm={12}
          sx={{ display: "grid", placeItems: "center" }}
        >
          <BlueButton type={Link} link="/v2" label="بازگشت به خانه" outline />
        </Grid>
      </Grid>
    </Container>
  );
};
