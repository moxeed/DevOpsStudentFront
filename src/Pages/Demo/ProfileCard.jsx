import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles((theme) => ({
  Text: {
    color: theme.palette.gray.main,
    fontSize: theme.typography.fontSize,
    "&:hover": { color: "#6BD664" },
  },
  outer: {
    display: "inline-block",
    width: "25% !important",
    marginInline: 5,
    marginTop: "2em",
    "@media (max-width:700px)": {
      width: "100%",
    },
  },
  card: {
    transition: " .5s",
    "&:hover": {
      backgroundColor: "#c9ffbd !important",
    },
  },
}));

export default function ProfileCard({ profile }) {
  const classes = useStyles();
  const items = [];
  const carouselNumber = window.innerWidth >= 700 ? 4 : 1;

  for (let i = 0; i < profile.length; i += 1) {
    if (i % carouselNumber === 0) {
      items.push(
        <>
          {profile.slice(i, i + carouselNumber).map((item, i) => (
            <Card
              key={i}
              style={{
                textAlign: "center",
                width: "150%",
                margin: 10,
                direction: "rtl",
                display: "inline-block",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="110"
                  image={item.avatar}
                  alt={item.name}
                  style={{
                    width: "60%",
                    borderRadius: "4px",
                    display: "inline-block",
                    marginTop: 20,
                  }}
                ></CardMedia>
                <CardContent>
                  <Typography
                    variant="h5"
                    style={{
                      fontFamily: "Kalameh",
                      marginBottom: "5px",
                      color: "#43BF46",
                    }}
                  >
                    {item.fullName}
                  </Typography>
                  <Typography variant="h6" className={classes.Text}>
                    رتبه {item.rank}
                  </Typography>
                  <Typography variant="h6" className={classes.Text}>
                    درس {item.courseName}
                  </Typography>
                  <Typography variant="h6" className={classes.Text}>
                    تعداد مطالب {item.articlesCount}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </>
      );
    }
  }

  return (
    <Card style={{ paddingBottom: "20px" }}>
      <Carousel
        animation="slide"
        navButtonsAlwaysVisible
        style={{ padding: 30 }}
      >
        {items}
      </Carousel>
    </Card>
  );
}
