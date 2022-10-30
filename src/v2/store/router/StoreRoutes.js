import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MainFooter from "src/v2/components/layout/Footer/MainFooter";
import MainHeader from "src/v2/components/layout/MainHeader";
import useQuery from "../../components/hooks/QueryParam";
import TrendPage from "../pages/trend/TrendPage";
import PaymentPage from "../pages/payment/PaymentPage";
import RayanSelectionPage from "../pages/rayan-selection/RayanSelectionPage";
import RayanPage from "../pages/rayan/RayanPage";

export default function StoreRoutes() {
  const query = useQuery();
  const error = query.get("text");
  const title = query.get("title");

  return (
    <Switch>
      <Route
        path="/v2/store/trend"
        component={() => (
          <>
            <MainHeader hideHelper />
            <TrendPage />
            <MainFooter />
          </>
        )}
      />
      <Route path="/v2/store/error">
        <Redirect to={`/v2/error?text=${error}&title=${title}`} />
      </Route>
      <Route
        path="/v2/store/rayan/:productId"
        component={() => (
          <>
            <MainHeader hideHelper />
            <RayanPage />
            <MainFooter />
          </>
        )}
      />
      <Route
        path="/v2/store/selection/rayan"
        component={() => (
          <>
            <MainHeader hideHelper />
            <RayanSelectionPage />
            <MainFooter />
          </>
        )}
      />

      <Route
        path="/v2/store/payment/:id"
        component={() => (
          <>
            <MainHeader hideHelper />
            <PaymentPage />
            <MainFooter />
          </>
        )}
      />
    </Switch>
  );
}
