import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import { Button, Grid } from "@material-ui/core";
import LocalOfferSharpIcon from "@material-ui/icons/LocalOfferSharp";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import JDate from "jalali-date";
import NoResult from "../Reusable/NoResult";
import TomanConverter from "../../Utility/TomanConverter";
import { Link } from "react-router-dom";
import { DateTime } from "../../Utility/Date/DateTime";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
    width: "100%",
    "& p": { padding: "10px 10px 0px 0px" },
    position: "relative",
  },

  btn: {
    color: "white",
  },
  iconStyle: {
    transform: "rotate(315deg)",
    color: "#5433d6",
    right: -8,
    position: "absolute",
    top: 0,
    fontSize: 50,
  },

  pos: {
    marginRight: "40px",
    bottom: -5,
    fontWeight: "bold",
    color: theme.palette.gray.main,
  },
}));

export default function OrderCard(props) {
  const classes = useStyles();
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const packages = props.packages;
  return (
    <Grid container spacing={2} justifyContent="center">
      {packages.length > 0 ? (
        packages
          .sort((a, b) => (a.orderDateTime < b.orderDateTime ? 1 : -1))
          .map((item, i) => (
            <Grid item xs={12} sm={6} md={width < 1025 ? 6 : 4} key={i}>
              <Card className={classes.root}>
                <Typography className={classes.pos} variant="h6" component="p">
                  <LocalOfferSharpIcon className={classes.iconStyle} />
                  {item.title}
                </Typography>
                <CardContent>
                  {item.providerName ? (
                    <>
                      <Typography
                        style={{ fontSize: "1.1rem" }}
                        color="textSecondary"
                      >
                        <PersonIcon style={{ marginLeft: 10 }} />
                        ارائه دهنده: {item.providerName} {item.providerLastName}
                      </Typography>
                    </>
                  ) : null}
                  <Typography
                    color="textSecondary"
                    style={{ fontSize: "1.1rem" }}
                  >
                    <CalendarTodayIcon style={{ marginLeft: 5 }} />
                    تاریخ ثبت سفارش :{" "}
                    {item.productSubCategory === "MinuteConsultation" ? (
                      <DateTime date={item?.orderDateTime} />
                    ) : (
                      new JDate(new Date(item.orderDateTime)).format(
                        "dddd DD MMMM YYYY"
                      )
                    )}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    style={{ fontSize: "1.1rem" }}
                  >
                    <LocalOfferSharpIcon
                      style={{ transform: "rotate(90deg)", marginLeft: 10 }}
                    />
                    قیمت: <TomanConverter Rial={item.price} />
                  </Typography>
                  {item.providerName ? (
                    <Typography
                      color="textSecondary"
                      style={{ fontSize: "1.1rem" }}
                    >
                      <LocalOfferSharpIcon
                        style={{ transform: "rotate(90deg)", marginLeft: 10 }}
                      />
                      استفاده شده :تعداد {item.doneActivityCount} از
                      {item.totalActivityCount}
                    </Typography>
                  ) : null}
                  <Grid
                    style={{
                      display: "flex",
                      direction: "ltr",
                    }}
                  >
                    {!item.providerName ? (
                      <>
                        {item.productSubCategory === "Teaching" ? (
                          <Link to={`/Product/Teaching/${item?.productId}`}>
                            <Button className="Button"> جزئیات</Button>
                          </Link>
                        ) : item.productSubCategory === "CourseQuiz" ? (
                          <Link to={`/Profile/Exam`}>
                            <Button className="Button"> آزمون های من</Button>
                          </Link>
                        ) : item.productSubCategory === " OnlineTutoring" ? (
                          <Link to={`/Provider/Tutoring`}>
                            <Button className="Button"> تدریس خصوصی من</Button>
                          </Link>
                        ) : (
                          <Link to={`/Product/Webinar/${item?.productId}`}>
                            <Button className="Button"> جزئیات</Button>
                          </Link>
                        )}
                      </>
                    ) : null}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
      ) : (
        <NoResult />
      )}
    </Grid>
  );
}
