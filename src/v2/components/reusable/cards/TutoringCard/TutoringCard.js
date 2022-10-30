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
import classes from "./TutoringCard.module.scss";
import theme from "src/v2/styles/theme";
import { Link } from "react-router-dom";

const TutoringCard = ({ item }) => {
  if (!item) {
    return <Skeleton variant="rectangular" width={180} height={180} />;
  }
  return (
    <Link
      to={`/Provider/GetTutoringProviderProfile/${item.providerId}/${item.courseProvided[0].courseId}`}
    >
      <Card className={classes.TutoringCard}>
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
              {item.courseProvided
                ? item.courseProvided[0].courseName
                : "مدرس نمونه"}
            </Typography>
            <Typography className={classes.name} variant="h5">
              {item.fullName ?? "مدرس برترها"}{" "}
            </Typography>
            <Typography variant="h6" className={classes.rank}>
              {item.rankTitle ?? "رتبه خوب"}
              {" و "}
              {item.jobTitle ?? "رتبه کشوری خوب"}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            {/* <Button className={classes.modal} disabled>
          رزرو تدریس
        </Button> */}
            {item.courseProvided && (
              <Button
                component={Link}
                to={`/Provider/GetTutoringProviderProfile/${item.providerId}/${item.courseProvided[0].courseId}`}
                className={classes.link}
              >
                رزرو کلاس{" "}
              </Button>
            )}
          </CardActions>
        </div>
      </Card>
    </Link>
  );
};
TutoringCard.propTypes = {
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
export default TutoringCard;
