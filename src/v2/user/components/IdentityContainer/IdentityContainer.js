import * as React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/LogoV2.png";
import classes from "./IdentityContainer.module.scss";

const IdentityContainer = ({ Component }) => {
  return (
    <div className={`${classes.authPageContainer}`}>
      <div>
        <div className={classes.authPageForm}>
          <Grid item xs={12} sx={{ my: 6 }}>
            <Link
              to="/"
              style={{
                display: "grid",
                placeItems: "center",
                width: "100%",
                minHeight: "100px",
              }}
            >
              <img
                src={logo}
                alt="bartarha"
                style={{ height: "100px", width: "auto" }}
              />
            </Link>
          </Grid>
          <div className={classes.componentContainer}>{Component()}</div>
        </div>
        <div className={classes.helpText}>
          درصورت بروز مشکل در هنگام ثبت نام، با شماره پشتیبانی
          <a
            href="tel:02141023000"
            style={{ color: "red", margin: "0 .2em", fontSize: "1em" }}
          >
            02141023000
          </a>
         
          تماس بگیرید.
        </div>
      </div>
    </div>
  );
};

export default IdentityContainer;
