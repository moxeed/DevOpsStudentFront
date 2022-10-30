import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import JDate from "jalali-date";
import IDivider from "../Reusable/IDivider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  btn: {
    width: "100px",
    margin: "5px",
  },
  header: {
    width: "300px",
    fontWeight: "bold",
    color: "#41B64E",
    boxShadow: "none",
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Schedule({ items, onSelect }) {
  const classes = useStyles();
  const withoutTime = function (dateTime) {
    const date = new Date(dateTime.getTime());
    date.setHours(0, 0, 0, 0);
    return date;
  };
  const groupBy = function (xs) {
    return xs.reduce(function (rv, x) {
      const key = withoutTime(new Date(x["startDateTime"]));
      (rv[key] = rv[key] || []).push(x);
      return rv;
    }, {});
  };
  if (items) {
    const time = groupBy(items);

    return (
      <Grid
        container
        justifyContent="center"
        style={{
          textAlign: "center",
          backgroundColor: "white",
          maxHeight: "550px",
          height: "100%",
          overflow: "auto",
        }}
      >
        <br />
        <Grid item xs={11}>
          <IDivider title="برنامه هفتگی " />
        </Grid>
        {items.length > 0 ? (
          <>
            <Grid item xs={11}>
              <Typography>
                ابتدا زمانی که تمایل دارید را رزرو کنید، انتخاب کنید
              </Typography>
            </Grid>
            {Object.keys(time).map((k, i) => (
              <Grid key={i}>
                <Box variant="contained" className={classes.header}>
                  {new JDate(new Date(k)).format("dddd DD MMMM YYYY")}
                  <ChevronLeftIcon />
                </Box>
                {time[k].map((item, i) => (
                  <Button
                    key={i}
                    variant="contained"
                    className={classes.btn + " Button"}
                    onClick={() => onSelect(item.startDateTime)}
                  >
                    {item.name}
                  </Button>
                ))}
              </Grid>
            ))}
          </>
        ) : (
          <Grid item xs={11}>
            <Typography>
              ظرفیت رزرو این پشتیبان تکمیل شده است . شما می توانید از خدمات
              پشتیبان های دیگر استفاده کنید یا در زمان دیگری مراجعه کنید.
            </Typography>
          </Grid>
        )}
      </Grid>
    );
  }
  return null;
}
