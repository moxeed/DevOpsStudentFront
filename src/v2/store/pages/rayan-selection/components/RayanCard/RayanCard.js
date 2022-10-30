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
import classes from "./RayanCard.module.scss";
import { tomanConverter } from "src/v2/components/utility/converters";
import BlueButton from "src/v2/components/reusable/BlueButton/BlueButton";
import WebinarImage from "src/Assets/Images/webinar.jpg";
import { Link } from "react-router-dom";

const RayanCard = ({ item }) => {
  if (!item) {
    return <Skeleton variant="rectangular" width={240} height={180} />;
  }
  return (
    <Card className={classes.RayanCard}>
      <CardMedia
        component="img"
        image={item.src ? item.src : WebinarImage}
        alt={item.alt}
      />
      <div className={classes.containerContent}>
        <CardContent sx={{ textAlign: "center", p: 2, width: "100%" }}>
          <Typography className={classes.name} gutterBottom variant="h1">
            {item.name ?? "همایش ویژه برترها"}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
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
              <BlueButton
                label={"مشاهده کلاس"}
                type={Link}
                link={`/v2/store/rayan/${item.id}`}
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
                {tomanConverter(+item.price, +item.price === 0)}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </div>
    </Card>
  );
};

export default RayanCard;
