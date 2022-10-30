import React from "react";
import { Grid, Typography } from "@mui/material";
import NoiseControlOffIcon from "@mui/icons-material/NoiseControlOff";
import classes from "./OnlineExam.module.scss";
import ColoredTitle from "src/v2/components/reusable/ColoredTitle/ColoredTitle";
import theme from "src/v2/styles/theme";
import BlueButton from "src/v2/components/reusable/BlueButton/BlueButton";
import { Link } from "react-router-dom";
import ClassOnlinePakageService from "src/Services/Product/ClassOnlinePakageService";
import { ExamButtons } from "./components/ExamButtons/ExamButtons";

const OnlineExams = () => {
  const [filters, setFilters] = React.useState([]);
 
  React.useEffect(() => {
    ClassOnlinePakageService.GetAllFilters([3, 1, 5, 7]).then((res) =>
      setFilters(res.data)
    );
  }, []);

  return (
    <Grid container className={classes.Exam}>
      <Grid className={classes.parentOfTitle}>
        <ColoredTitle
          color={theme.palette.lightCyan}
          title={"آزمون های آنلاین برترها"}
        />
      </Grid>
      <Grid container justifyContent={"space-between"}>
        <Grid xs={12} md={6} sx={{ mb: 5 }}>
          <Typography
            variant="h5"
            sx={{ mb: 10, fontWeight: "bold", color: "#1e2756" }}
          >
            درس مورد نظر خود را میتوانید از طریق گزینه های زیر انتخاب کنید:
          </Typography>
          <Grid container sx={{ mt: 4, minHeight: "70vh" }}>
            {filters.map((item, id) => (
              <Grid xs={6} key={id} sx={{ mb: 5 }}>
                <Typography variant="h5" sx={{ mb: 8 }}>
                  <NoiseControlOffIcon
                    sx={{ color: "#ffe057", verticalAlign: "middle", mr: 2 }}
                  />
                  {item.group.name} :
                </Typography>
                <ExamButtons item={item} id={id} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"space-between"}
          xs={12}
          md={5}
          sx={{
            pr: { md: 6, xs: 0 },
            flexDirection: { md: "row", sm: "row-reverse" },
          }}
        >
          <Grid
            container
            xs={6}
            md={12}
            justifyContent="center"
            alignItems={"center"}
            className={classes.courseIntro}
          >
            <BlueButton
              label="معرفی آزمون های درس محور"
              type={Link}
              link={"/IntroduceQuiz"}
            ></BlueButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OnlineExams;
