import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MainFooter from "../../components/layout/Footer/MainFooter";
import MainHeader from "../../components/layout/MainHeader";
import AboutAppPage from "../pages/about-app/AboutAppPage";
import AboutUsPage from "../pages/about-us/AboutUsPage";
import ErrorPage from "../pages/error/ErrorPage";
import LandingPage from "../pages/landing/LandingPage";
import WorkWithUsPage from "../pages/work-with-us/WorkWithUs";

export default function MainRoutes() {
  return (
    <Switch>
      <Route
        path="/v2/error/:code?"
        component={() => (
          <>
            <MainHeader hideHelper />
            <ErrorPage />
            <MainFooter />
          </>
        )}
      />
      <Route
        path="/v2/work-with-us"
        component={() => (
          <>
            <MainHeader hideHelper />
            <WorkWithUsPage />
            <MainFooter />
          </>
        )}
      />
      <Route
        path="/v2/about-us"
        component={() => (
          <>
            <MainHeader hideHelper />
            <AboutUsPage />
            <MainFooter />
          </>
        )}
      />
      <Route
        path="/v2/about-app"
        component={() => (
          <>
            <MainHeader hideHelper />
            <AboutAppPage />
            <MainFooter />
          </>
        )}
      />
      <Route exact path="/v2">
        <MainHeader />
        <LandingPage />
        <MainFooter />
      </Route>
      <Route path="/v2/*">
        <Redirect to="/v2/error/404" />
      </Route>
    </Switch>
  );
}
