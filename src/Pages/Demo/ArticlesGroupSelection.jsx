import React from "react";
import { Link } from "react-router-dom";
import TestApiGroups from "./testAPIs/TestApiGroups";
import {
  makeStyles,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  outer: {
    display: "inline-block",
    width: "22%",
    marginInline: 5,
    marginTop: "2em",
    "@media (max-width:700px)": {
      width: "100%",
    },
  },
  card: {
    backgroundColor: "#fff !important",
    transition: " .5s",
    "&:hover": {
      backgroundColor: "#c9ffbd !important",
    },
  },
}));

const TutoringSelection = () => {
  const classes = useStyles();
  const data = TestApiGroups?.data;

  const groups = data.map((item, index) => (
    <Link to={`/Demo/Articles/${item.id}`} key={index}>
      <div className={classes.outer}>
        <Card className={classes.card} key={item.id}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="75"
              image={item.icon}
              alt={item.name}
              style={{ width: "auto", display: "inline", marginTop: 20 }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{ color: "#43BF46" }}
              >
                {item.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                تعداد مدرس: {item.teachersCount}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                تعداد دروس: {item.coursesCount}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                تعداد مطالب: {item.articlesCount}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      {index === 2 ? <br /> : <span> </span>}
    </Link>
  ));

  return (
    <div
      style={{
        margin: "120px 60px 60px",
        textAlign: "center",
        borderTop: "2px solid #43BF46",
        backgroundColor: "white",
        padding: 20,
      }}
    >
      <>
        {" "}
        <Typography style={{ fontSize: "14px", marginTop: "2em" }}>
          گروه مورد نظر خود را میتوانید از دکمه های زیر انتخاب کنید.
        </Typography>
        {groups}
      </>
    </div>
  );
};
export default TutoringSelection;
