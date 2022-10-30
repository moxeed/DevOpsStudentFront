import React from "react";
import { Grid } from "@material-ui/core";
import TabOrder from "./TabOrders";
import UserProfile from "./UserProfile";

export default function OrderTab() {
  return (
    <Grid container justifyContent="center">
      <UserProfile />
      <TabOrder />
    </Grid>
  );
}
