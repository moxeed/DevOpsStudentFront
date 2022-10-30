import React from "react";
import { Grid, Hidden, Typography } from "@mui/material";
import SlidersContainer from "src/v2/components/reusable/Slider/Slider";
import ColoredTitle from "src/v2/components/reusable/ColoredTitle/ColoredTitle";
import theme from "src/v2/styles/theme";
import ProviderService from "src/Services/Provider/ProviderService";
import { Link } from "react-router-dom";
import More from "src/v2/assets/images/Icons/More.svg";
import TutoringCard from "src/v2/components/reusable/cards/TutoringCard/TutoringCard";

const TutoringSliders = () => {
  const [teachers, setTeachers] = React.useState({ data: [...Array(6)] });

  React.useEffect(() => {
    ProviderService.GetProviders("Tutoring", {
      GroupIds: [1, 3],
      CourseIds: [],
    }).then(setTeachers);
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <ColoredTitle
          color={theme.palette.blueBell}
          title={"مدرسین گروه برترها"}
        />
      </Grid>
      <Grid
        container
        justifyContent={"space-between"}
        sx={{
          paddingBlock: 5,
        }}
      >
        <Hidden mdDown>
          <SlidersContainer
            Card={TutoringCard}
            slides={teachers.data}
            slidePerView={{
              xs: "0 0 50%",
              sm: "0 0 18%",
              md: "0 0 15%",
              lg: "0 0 10%",
            }}
          />
        </Hidden>
        <Hidden mdUp>
          <Grid container justifyContent={"center"} alignItems={"center"}>
            {teachers.data
              .map((value) => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)
              .slice(0, 4)
              .map((item, id) => (
                <Grid
                  item
                  key={id}
                  sm={6}
                  xs={12}
                  container
                  alignItems="center"
                  justifyContent={"center"}
                  sx={{ p: 2 }}
                >
                  <TutoringCard item={item} />
                </Grid>
              ))}
            <Grid
              item
              xs={12}
              container
              justifyContent={"center"}
              sx={{ mt: 4 }}
            >
              <Link to={"/Selection/Product/Tutoring/3"}>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.darkSpaceCadet }}
                >
                  <img src={More} alt="More" style={{ padding: 10 }} />
                  مشاهده‌ی بیشتر
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
};

export default TutoringSliders;
