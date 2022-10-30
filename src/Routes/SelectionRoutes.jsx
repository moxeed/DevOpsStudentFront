import React from "react";
import { Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import ProviderSelectionPage from "../Pages/Products/ProviderSelectionPage";
import WebinarSelectionPage from "../Pages/Products/WebinarSelectionPage";
import QuizSelectionPage from "../Pages/Products/QuizSelectionPage";
import ToturingSelectionPage from "../Pages/Products/TutoringSelectionPage";
import TutoringSelection from "../Pages/Products/TutoringSelection";

export function SelectionRoutes() {
  return (
    <Switch>
      <Route
        path="/Selection/Product/Tutoring/:groupId/:course?"
        component={TutoringSelection}
      />
      <Route
        path="/Selection/Provider/Consultation/:group"
        component={ProviderSelectionPage}
      />
      <Route
        path="/Selection/Provider/Tutoring/:group/:course"
        component={ToturingSelectionPage}
      />
      <Route
        path="/Selection/Product/Webinar/:group/:FreeWebinars?"
        component={WebinarSelectionPage}
      />
      <Route
        path="/Selection/Product/CourseQuiz/:group/:course"
        component={QuizSelectionPage}
      />
      <Route
        path="/Selection/Product/CourseQuiz"
        component={QuizSelectionPage}
      />
    </Switch>
  );
}

