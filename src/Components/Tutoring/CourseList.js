import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Typography, Grid } from "@material-ui/core";
import "../../Common/ListPage/Styles/scrollbar.scss";

const useStyles = makeStyles(() => ({
  text: {
    fontSize: "12px",
    padding: "0 20px",
  },
  card: {
    minHeight: "375px",
    "@media (max-width:910px)": {
      minHeight: "auto",
    },
  },
}));

export default function CustomizedMenus({ profile, handleClick }) {
  const classes = useStyles();
  return (
    <Grid
      class={classes.card}
      container
      style={{ display: "flex", alignItems: "center" }}
    >
      <div>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            style={{ fontFamily: "Kalameh", marginBottom: "5px" }}
          >
            {profile.name + " " + profile.lastName}
          </Typography>
          <Typography
            variant="h6"
            style={{ fontsize: 18, fontWeight: "bold", padding: 10 }}
          >
            درس مورد نظر خود را انتخاب کنید و وارد صفحه تدریس خصوصی شوید:
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <ul className="div-scroll">
            {profile?.courseProvided?.map((item) => (
              <Link
                key={item.courseId}
                to={`/Provider/GetTutoringProviderProfile/${profile.providerId}/${item.courseId}`}
                style={{ textAlign: "center" }}
              >
                <li
                  style={{
                    fontSize: "14px",
                    listStyleType: "none",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontFamily: "Kalameh",
                    padding: 1,
                    color: "#469820",
                  }}
                >
                  {item.courseName}
                </li>
              </Link>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12}>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick}
            className="Button"
            style={{ padding: 10 }}
          >
            بستن
          </Button>
        </Grid>
      </div>
    </Grid>
  );
}
