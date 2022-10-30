import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Skeleton,
} from "@mui/material";
import PropTypes from "prop-types";
import classes from "./ConsultCard.module.scss";
import theme from "src/v2/styles/theme";
import { Link } from "react-router-dom";

const ConsultCard = ({ item }) => {
  if (!item) {
    return <Skeleton variant="rectangular" width={180} height={180} />;
  }
  return (
    <Link to={`/Provider/Consultation/${item.providerId}`}>
      <Card className={classes.ConsultCard}>
        <span
          className={classes.online}
          style={{
            backgroundColor: item.isOnline
              ? theme.palette.solidGreen
              : theme.palette.marengo,
          }}
        >
          <Typography variant="h6">
            {item.isOnline ? "آنلاین" : "آفلاین"}
          </Typography>
        </span>

        <CardMedia
          component="img"
          width="180px"
          height="180px"
          border-radius="10px"
          image={item.bartarhaImageLink ?? item.imageLink}
          alt="پروفایل مدرس"
        />
        <div className={classes.containerContent}>
          <CardContent className={classes.content}>
            <Typography variant="h6" className={classes.type}>
              {item.groupName ?? "مشاور نمونه"}
            </Typography>
            <Typography className={classes.name} variant="h5">
              {item.fullName ?? "مشاور برترها"}
            </Typography>
            <Typography variant="h6" className={classes.rank}>
              {item.rankTitle ?? "رتبه خوب"}
              {" و "}
              {item.jobTitle ?? "رتبه کشوری خوب"}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            {/* <Button className={classes.modal} disabled>
          رزرو مشاوره
        </Button> */}
            <Button
              component={Link}
              to={`/Provider/Consultation/${item.providerId}`}
              className={classes.link}
            >
              رزرو مشاوره{" "}
            </Button>
          </CardActions>
        </div>
      </Card>
    </Link>
  );
};
ConsultCard.propTypes = {
  item: PropTypes.shape({
    fullName: PropTypes.string,
    bartarhaImageLink: PropTypes.string,
    imageLink: PropTypes.string,
    providerId: PropTypes.number,
    rankTitle: PropTypes.string,
    jobTitle: PropTypes.string,
    groupName: PropTypes.string,
    isOnline: PropTypes.bool,
  }),
};
export default ConsultCard;
