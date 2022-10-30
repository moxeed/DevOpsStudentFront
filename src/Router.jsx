import ProviderPage from "./Pages/Products/ProviderPage";
import WebinarPage from "./Pages/Products/WebinarPage";
import { Route, Switch, Redirect } from "react-router-dom";
import PaymentResultPage from "./Pages/Products/PaymentResultPage";
import PollPage from "./Pages/Main/PollPage";
import "antd/dist/antd.css";
import ProfilePage from "./Pages/Profile/ProfilePage";
import WorkBookPage from "./Pages/Quiz/WorkBookPage";
import QuizReasult from "./Pages/Quiz/QuizReasult";
import { Grid } from "@material-ui/core";
import { PrivateRoute } from "./Components/Common/PrivateRoute";
import QuizPage from "./Pages/Quiz/QuizPage";
import PublicArticlePage from "./Pages/Article/PublicArticlePage";
import ArticlePage from "./Pages/Article/ArticlePage";
import OrderCheckoutPage from "./Pages/Products/OrderCheckoutPage";
import CourseQuizPage from "./Pages/Products/CourseQuizPage";
import IntroduceProductQuizArticlePage from "./Pages/Article/IntroduceProductQuizArticlePage";
import ValidationQuiz from "./Pages/Quiz/ValidationQuiz";
import TutoringPage from "./Pages/Products/TutoringPage";
import TrendProduct from "./Pages/Products/TrendProduct";
import InventoryPage from "./Pages/Profile/InventoryPage";
import GroupSelection from "./Pages/Demo/ArticlesGroupSelection";
import ArticlesPage from "./Pages/Demo/ArticlesPage";
import { SelectionRoutes } from "./Routes/SelectionRoutes";

function Router({ isOffline }) {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/v2" />
      </Route>
      {/*Demo*/}
      <Route path="/Demo/Articles/:groupId" component={ArticlesPage} />
      <Route path="/Demo" exact component={GroupSelection} />
      {/*Demo*/}
      <Route path="/error">
        <Redirect to="/v2/error/503" />
      </Route>
      <Route path="/Poll/:id" component={PollPage} />
      <Route path="/ActiveWebinars" component={InventoryPage} />
      <Route path="/aboutus">
        <Redirect to="/v2/about-us" />
      </Route>
      <Route path="/AboutApp">
        <Redirect to="/v2/about-app" />
      </Route>
      {/* <Route path="/AboutApp" component={AboutAppPage} /> */}
      <Route path="/Public/Articles" component={PublicArticlePage} />
      <Route path="/Articles/:id" component={ArticlePage} />
      <Route path="/ValidationQuiz" component={ValidationQuiz} />
      <Route
        path="/IntroduceQuiz"
        component={IntroduceProductQuizArticlePage}
      />
      <Route path="/TrendProduct" component={TrendProduct} />
      <PrivateRoute path="/WorkBook/:id" component={WorkBookPage} />
      <PrivateRoute path="/QuizReasult/:id" component={QuizReasult} />
      <PrivateRoute path="/payment" component={PaymentResultPage} />
      <PrivateRoute
        path="/Quiz/:quizId/:quizMode/:webinarId"
        component={() => <QuizPage isOffline={isOffline} />}
      />
      <PrivateRoute path="/order/checkout" component={OrderCheckoutPage} />
      <PrivateRoute path="/Profile" component={ProfilePage} />
      <Route path="/Identity/*" exact>
        <Redirect to="/v2/Identity/login" />
      </Route>
      <Route path="/IntroduceQuiz" exact>
        <Redirect to="/" />
      </Route>
      <Route path="/Provider/Consultation" exact>
        <Redirect to="/Selection/Provider/Consultation/3" />
      </Route>
      <Route path="/Selection">
        <Grid
          container
          justifyContent="center"
          style={{ background: "#FFFBFA", minHeight: "90vh" }}
        >
          <Grid md={10} container item>
            <SelectionRoutes />
          </Grid>
        </Grid>
      </Route>
      <Route>
        <Grid
          container
          justifyContent="center"
          style={{ background: "#FFFBFA", minHeight: "90vh" }}
        >
          <Grid md={10} container item justifyContent="center">
            <Switch>
              <Route
                path="/Provider/Consultation/:providerId"
                component={ProviderPage}
              />
              <Route
                path="/Provider/GetTutoringProviderProfile/:providerId/:courseId"
                component={TutoringPage}
              />
              <Route path="/Product/Webinar/:id" component={WebinarPage} />

              <Route
                path="/Product/CourseQuiz/:productId"
                component={CourseQuizPage}
              />
              <Route path="*">
                <Redirect to="/v2/error/404" />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Route>
    </Switch>
  );
}

export default Router;
