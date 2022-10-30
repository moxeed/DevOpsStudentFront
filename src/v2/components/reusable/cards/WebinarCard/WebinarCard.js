import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Skeleton,
} from "@mui/material";
import classes from "./WebinarCard.module.scss";
import PropTypes from "prop-types";
import theme from "src/v2/styles/theme";
import { tomanConverter } from "src/v2/components/utility/converters";
import JDate from "jalali-date";
import { Link } from "react-router-dom";
import BlueButton from "src/v2/components/reusable/BlueButton/BlueButton";
import WebinarImage from "src/Assets/Images/webinar.jpg";

const WebinarCard = ({ item }) => {
  if (!item) {
    return <Skeleton variant="rectangular" width={240} height={180} />;
  }

  const providerNames =
    item &&
    item.productProvider.length > 0 &&
    item.productProvider.map((item) => item.fullName).join("، ");

  return (
    <Link>
      <Card
        className={classes.WebinarCard}
        link={`/Product/Webinar/${item.productId}`}
      >
        <span
          className={classes.tag}
          style={{
            backgroundColor: theme.palette.cosmicCobalt,
          }}
        >
          <Typography variant="h6">
            {item.webinarSchedules[0]
              ? new JDate(
                  new Date(item.webinarSchedules[0].startDateTime)
                ).format(" YYYY / MM / DD ")
              : "زمان نزدیک"}
          </Typography>
        </span>

        <CardMedia
          component="img"
          image={
            item.poster
              ? window.config.API_BASE + "/File/Download/" + item.poster
              : WebinarImage
          }
          alt="banner"
        />
        <div className={classes.containerContent}>
          <CardContent sx={{ textAlign: "center", p: 2 }}>
            <Typography className={classes.name} gutterBottom variant="h1">
              {item.title ?? "همایش ویژه برترها"}{" "}
            </Typography>
            <Typography variant="h6" className={classes.teacher}>
              مدرس : {providerNames || "گروه مدرسین"}
            </Typography>
          </CardContent>

          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid container direction={"row-reverse"} justifyContent="center">
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                container
                justifyContent="center"
              >
                {" "}
                <BlueButton
                  label={"ثبت نام"}
                  type={Link}
                  link={`/Product/Webinar/${item.productId}`}
                />
              </Grid>{" "}
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                container
                justifyContent="center"
              >
                <Button disabled className={classes.price}>
                  {item.price > 0
                    ? tomanConverter(item.price)
                    : item.tag ?? "رایگان"}
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </div>
      </Card>
    </Link>
  );
};

WebinarCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    tag: PropTypes.string,

    providerId: PropTypes.string,
    rankTitle: PropTypes.string,
    jobTitle: PropTypes.string,
    groupName: PropTypes.string,
    isOnline: PropTypes.bool,
  }),
};
export default WebinarCard;
