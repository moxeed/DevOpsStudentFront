import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProviderService from "../../Services/Provider/ProviderService";
import IconArray from "../../Assets/Images/IconArray";
import {
  Button,
  CircularProgress,
  makeStyles,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: "#f2f1ed !important",
    padding: "12px",
    margin: "8px",
    color: "#808080 !important",
    "&:hover": {
      backgroundColor: "#E6E7F8 !important",
      color: "#000 !important",
    },
  },
  outer: {
    display: "inline-block",
    width: "22%",
    marginInline: 5,
    "@media (max-width:700px)": {
      width: "100%",
    },
  },
  card: {
    backgroundColor: "#fff !important",
    transition: " .5s ease-in",
  },
  active: {
    backgroundColor: "#E6E7F8 !important",
  },
}));

const TutoringSelection = ({ color }) => {
  const { groupId } = useParams();
  const [filtersG3, setFiltersG3] = useState([]);
  const [group, setGroup] = useState(3);

  const [filtersC, setFiltersC] = useState();
  const classes = useStyles();
  useEffect(() => {
    setGroup(groupId ? +groupId : 3);
  }, [groupId]);

  const buttons = filtersG3.map((item, i) =>
    i > 3 ? (
      <Button
        className={group === item.id ? "Button" : classes.button}
        onClick={() => {
          setGroup(item.id);
          window.history.replaceState(
            null,
            "Tutoring",
            `/Selection/Product/Tutoring/${item.id}`
          );
        }}
      >
        {item.name}
      </Button>
    ) : (
      <div
        onClick={() => {
          setGroup(item.id);
          window.history.replaceState(
            null,
            "Tutoring",
            `/Selection/Product/Tutoring/${item.id}`
          );
        }}
        className={classes.outer}
      >
        <Card
          className={
            group === item.id
              ? classes.card + " " + classes.active
              : classes.card
          }
          key={item.id}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="75"
              image={IconArray.images[i].src}
              alt={item.name}
              style={{ width: "auto", display: "inline", marginTop: 20 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    )
  );

  useEffect(() => {
    ProviderService.GetTutoringFilter("Tutoring", {
      GroupIds: [group],
    }).then((res) => {
      setFiltersG3(res.data.GroupIds.options);
      setFiltersC(res.data.CourseIds.options);
    });
  }, [group]);

  return (
    <div
      style={{
        minHeight: "90vh",
        padding: "30px",
        display: "grid",
        placeItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          textAlign: "center",
          borderTop: "2px solid #5433d6",
          backgroundColor: "white",
          padding: 20,
          minWidth: "90%",
        }}
      >
        <>
          <Typography style={{ fontSize: "14px", marginBottom: 25 }}>
            گروه مورد نظر خود را میتوانید از دکمه های زیر انتخاب کنید.
          </Typography>
          <Grid container direction="column" justifyContent="center">
            <Grid item>{buttons.slice(0, 4)}</Grid>
            <Grid item>{buttons.slice(4)}</Grid>
          </Grid>
        </>
        <div style={{ marginTop: 25 }}>
          <Typography
            style={{ fontSize: "15px", color: color ? color : "#808080" }}
          >
            درس مورد نظر خود را میتوانید از دکمه های زیر انتخاب کنید.
          </Typography>

          {filtersC ? (
            <>
              <>
                {filtersC.length > 0
                  ? filtersC.map((item) => (
                      <Link
                        key={item.id}
                        to={`/Selection/Provider/Tutoring/${group}/${item.id}`}
                      >
                        <Button className={"Button"}>{item.name}</Button>
                      </Link>
                    ))
                  : "درسی ثبت نشده"}
              </>
            </>
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    </div>
  );
};
export default TutoringSelection;
