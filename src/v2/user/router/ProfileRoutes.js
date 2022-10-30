import { Container } from "@mui/material";
import React from "react";
import { Route, Switch } from "react-router-dom";
import ChangePasswordPage from "../pages/change-password/ChangePasswordPage";

const ProfileRoutes = () => {
  return (
    <Container>
      <Switch>
        <Route
          path="/v2/profile/change-password"
          component={ChangePasswordPage}
        />
      </Switch>
    </Container>
  );
};

export default ProfileRoutes;
