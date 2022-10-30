import React from "react";
import { BottomNavigation, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./MainFooter.module.scss";

const Links = {
  consult: {
    title: "مشاوره و برنامه‌ریزی",
    links: [
      {
        label: "مشاوره و برنامه‌ریزی آنلاین گروه ریاضی و فیزیک",
        link: "/Selection/Provider/Consultation/1",
      },
      {
        label: "مشاوره و برنامه‌ریزی آنلاین گروه علوم تجربی",
        link: "/Selection/Provider/Consultation/3",
      },
      {
        label: "مشاوره و برنامه‌ریزی آنلاین گروه علوم انسانی",
        link: "/Selection/Provider/Consultation/3",
      },
      {
        label: "مشاوره و برنامه‌ریزی آنلاین گروه هنر",
        link: "/Selection/Provider/Consultation/7",
      },
    ],
  },
  webinar: {
    title: "همایش های آنلاین",
    links: [
      {
        label: "همایش‌های آنلاین رایگان",
        link: "/Selection/Product/Webinar/3/free",
      },
      {
        label: "همایش‌های گروه علوم تجربی",
        link: "/Selection/Product/Webinar/3",
      },
      {
        label: "همایش‌های گروه علوم انسانی",
        link: "/Selection/Product/Webinar/5",
      },
      {
        label: "همایش‌های گروه ریاضی و فیزیک",
        link: "/Selection/Product/Webinar/1",
      },
      {
        label: "همایش‌های گروه هنر",
        link: "/Selection/Product/Webinar/7",
      },
    ],
  },
  tutoring: {
    title: "تدریس خصوصی",
    links: [
      {
        label: "تدریس خصوصی آنلاین گروه تجربی",
        link: "/Selection/Product/Tutoring/3",
      },
      {
        label: "تدریس خصوصی آنلاین گروه ریاضی و فیزیک",
        link: "/Selection/Product/Tutoring/1",
      },
      {
        label: "تدریس خصوصی آنلاین گروه انسانی",
        link: "/Selection/Product/Tutoring/3",
      },
      {
        label: "تدریس خصوصی آنلاین گروه هنر",
        link: "/Selection/Product/Tutoring/7",
      },
    ],
  },
  overall: {
    title: "درباره برترها",
    links: [
      {
        label: "صفحه اصلی",
        link: "/v2",
      },
      {
        label: "ورود به سایت",
        link: "/v2/identity/login",
      },
      {
        label: "درباره برترها",
        link: "/v2/about-us",
      },
      {
        label: "همکاری با ما",
        link: "/v2/work-with-us",
      },
    ],
  },
};

const MainFooter = () => {
  return (
    <BottomNavigation className={classes.Footer}>
      <Grid
        container
        justifyContent={"space-between"}
        className={classes.container}
      >
        <Grid container sx={{ p: 5, backgroundColor: "white" }}>
          <Grid item xs={12} sm={6} md={3} sx={{ p: 1, cursor: "pointer" }}>
            <Typography variant="h5" className={classes.title}>
              {Links["consult"].title}{" "}
            </Typography>
            <ul className="list-style">
              {Links["consult"].links.map((item) => (
                <li key={item.label}>
                  <Link to={item.link}>
                    <Typography className={classes.link}>
                      {item.label}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ p: 1, cursor: "pointer" }}>
            <Typography variant="h5" className={classes.title}>
              {Links["webinar"].title}{" "}
            </Typography>
            <ul className="list-style">
              {Links["webinar"].links.map((item) => (
                <li key={item.label}>
                  <Link to={item.link}>
                    <Typography className={classes.link}>
                      {item.label}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ p: 1, cursor: "pointer" }}>
            <Typography variant="h5" className={classes.title}>
              {Links["tutoring"].title}{" "}
            </Typography>
            <ul className="list-style">
              {Links["tutoring"].links.map((item) => (
                <li key={item.label}>
                  <Link to={item.link}>
                    <Typography className={classes.link}>
                      {item.label}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ p: 1, cursor: "pointer" }}>
            <Typography variant="h5" className={classes.title}>
              {Links["overall"].title}
            </Typography>
            <ul className="list-style">
              {Links["overall"].links.map((item) => (
                <li key={item.label}>
                  <Link to={item.link}>
                    <Typography className={classes.link}>
                      {item.label}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.navbar}>
          <Typography variant="h6" sx={{ color: "white" }}>
            تمامی حقوق این وبسایت متعلق به موسسه قلم چی می باشد. هرگونه کپی
            برداری پیگرد قانونی دارد.
          </Typography>
        </Grid>
      </Grid>
    </BottomNavigation>
  );
};

export default MainFooter;
