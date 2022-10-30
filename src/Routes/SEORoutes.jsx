import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

function SEORoutes() {
    return (
        <Switch>
            <Route path="/Identity/*" exact>
                <Redirect to="/v2/Identity/login" />
            </Route>
            <Route path="/IntroduceQuiz" exact>
                <Redirect to="/" />
            </Route>
            <Route path="/Provider/Consultation" exact>
                <Redirect to="/Selection/Provider/Consultation/3" />
            </Route>
        </Switch>
    );
}

export default SEORoutes;
