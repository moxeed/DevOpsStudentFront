import * as React from "react";
import { Grid } from "@mui/material";
import TutoringSliders from "./TutoringSlider/TutoringSliders";
import WebinarSliders from "./WebinarSlider/WebinarSliders";
import BartarhaApp from "./AboutApp/AboutApp";
import AboutUs from "./AboutUs/AboutUs";
import MainBanner from "./MainBanner/MainBanner";
import ConsultSliders from "./ConsultSlider/ConsultSliders";
import ContactUs from "./ContactUs/ContactUs";
import OnlineExams from "./Exams/OnlineExams";
import { PanelService } from "src/v2/api/front-panel";

const Main = () => {
  const [orders, setOrders] = React.useState();

  React.useEffect(() => {
    PanelService.GetOrders()
      .then((res) => setOrders(res))
      .catch(console.log);
  }, []);

  const Components = {
    main: <MainBanner />,
    bestWebinars: <WebinarSliders filter={"bestWebinars"} />,
    tajrobiWebinars: <WebinarSliders filter={"tajrobiWebinars"} />,
    ensaniWebinars: <WebinarSliders filter={"ensaniWebinars"} />,
    bestConsulters: <ConsultSliders />,
    bestTeachers: <TutoringSliders />,
    socialMedia: <ContactUs />,
    aboutUs: <AboutUs />,
    aboutApp: <BartarhaApp />,
    examCourses: <OnlineExams />,
  };
  return (
    <React.Fragment>
      <Grid
        container
        direction={"column"}
        sx={{
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div style={{ margin: "12px 0px" }}></div>
        {!orders &&
          [
            {
              id: "bestWebinars",
              content: "همایش های برگزیده",
              display: true,
              type: "webinar-carousel",
            },
            {
              id: "bestConsulters",
              content: "مشاوران برترها",
              display: true,
              type: "consult-carousel",
            },
            {
              id: "bestTeachers",
              content: "مدرسان برترها",
              display: true,
              type: "tutoring-carousel",
            },
          ].map((item) => {
            if (item.display) return Components[item.id];
            else return null;
          })}
        {orders &&
          (orders?.length === 0 ? (
            <div style={{ minHeight: "80vh" }}></div>
          ) : (
            orders.map((item) => {
              if (item.display) return Components[item.id];
              else return null;
            })
          ))}
      </Grid>
    </React.Fragment>
  );
};

export default Main;
