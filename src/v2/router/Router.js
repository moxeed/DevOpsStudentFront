import React from "react";
import { Route, Switch } from "react-router-dom";
import IdentityRoutes from "../user/router/IdentityRoutes";
import ProfileRoutes from "../user/router/ProfileRoutes";
import StoreRoutes from "../store/router/StoreRoutes";
import MainRoutes from "../main/router/MainRoutes";

const V2Router = () => {
  return (
    <Switch>
      <Route path="/v2/identity">
        <IdentityRoutes />
      </Route>
      <Route path="/v2/profile">
        <ProfileRoutes />
      </Route>
      <Route path="/v2/store">
        <StoreRoutes />
      </Route>
      <Route path="/v2/">
        <MainRoutes />
      </Route>
    </Switch>
  );
};

export default V2Router;
