import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import LocalOfferSharpIcon from "@material-ui/icons/LocalOfferSharp";
import ContentLoader from "react-content-loader";
import WebinarImage from "../../Assets/Images/exam-default.jpg";
import TomanConverter from "../../Utility/TomanConverter";
const useStyles = makeStyles(() => ({
  root: {
    widht: "100%",
    "&:hover": { boxShadow: "-1px 2px 27px -7px rgba(0,0,0,0.5) !important" },
  },
  parentAvatar: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  bottomCard: {
    margin: "5px 0",
    padding: "5px 20px",
  },
  textTypo: {
    display: "flex",
    alignItems: "center",
    fontSize: "1em",
    color: "gray",
    padding: 5,
  },
  avatar: {
    margin: "0px 0 10px 0",
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
  imagecard: {
    width: "auto",
    maxHeight: 155,
  },
  IconDist: {
    marginLeft: "5px",
  },
}));
export default function CourseQuizCard({ data }) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        {data ? (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} md={12} className={classes.avatar}>
              {data.posterLink ? (
                <Grid className={classes.parentAvatar}>
                  <img
                    alt="poster"
                    src={data.posterLink}
                    className={classes.imagecard}
                  />
                </Grid>
              ) : (
                <Grid className={classes.parentAvatar}>
                  <img
                    alt="چیزی برای نمایش یافت نشد"
                    src={WebinarImage}
                    className={classes.imagecard}
                  />
                </Grid>
              )}
            </Grid>
            <Grid item xs={10} sm={6} md={12} className={classes.bottomCard}>
              <Typography
                variant="h5"
                component="p"
                color="textSecondary"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Kalameh",
                }}
              >
                {data?.title}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={classes.textTypo}
                color="textSecondary"
              >
                <LocalOfferSharpIcon
                  style={{ transform: "rotate(90deg)" }}
                  className={classes.IconDist}
                />{" "}
                قیمت:{" "}
                <TomanConverter
                  Rial={data.price}
                  isFree={data?.price <= 0 ? true : false}
                />
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <ContentLoader style={{ width: "100%", height: 200 }}>
            <circle cx="120" cy="100" r="100" />
          </ContentLoader>
        )}
      </Card>
    </>
  );
}
