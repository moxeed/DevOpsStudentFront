import * as React from "react";
import { Grid } from "@mui/material";
import classes from "./LoginContainer.module.scss";
import { useState } from "react";
import FixedPassword from "../forms/FixedPassword/FixedPassword";
import IdentityContainer from "../../../../components/IdentityContainer/IdentityContainer";

const LoginContainer = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => setToggleState(index);

  return (
    <IdentityContainer
      Component={() => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Grid container>
            <Grid item xs={6}>
              <button
                className={
                  toggleState === 1
                    ? `${classes.tabs} ${classes.activeTabs}`
                    : classes.tabs
                }
                onClick={() => toggleTab(1)}
              >
                ورود با شمارنده
              </button>
            </Grid>
            <Grid item xs={6} container justifyContent={"end"}>
              <button
                className={
                  toggleState === 2
                    ? `${classes.tabs} ${classes.activeTabs}`
                    : classes.tabs
                }
                onClick={() => toggleTab(2)}
              >
                ورود با شماره تماس
              </button>
            </Grid>
          </Grid>
          <div className={classes.tabsContainer}>
            <div
              className={
                toggleState === 1
                  ? `${classes.contentTabs}  ${classes.activeContent}`
                  : classes.contentTabs
              }
            >
              <FixedPassword isCounter={true} />
            </div>
            <div
              className={
                toggleState === 2
                  ? `${classes.contentTabs}  ${classes.activeContent}`
                  : classes.contentTabs
              }
            >
              <FixedPassword isCounter={false} />
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default LoginContainer;
