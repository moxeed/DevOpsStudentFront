import CourseQuizDetails from "../../Components/CourseQuiz/CourseQuizDetails";
import CourseQuizInfoTab from "../../Components/CourseQuiz/CourseQuizInfoTab";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClassOnlineService from "../../Services/Product/ClassOnlineService";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import CourseQuizProduct from "../../Components/CourseQuiz/CourseQuizProduct";
import { ProductVitrine } from "../../Components/Financial/ProductVitrine";

const useStyles = makeStyles(() => ({
  section: {
    paddingTop: "10px",
    "&>*": {
      padding: "10px",
      "@media (max-width: 970px)": {
        padding: "5px 0",
      },
    },
  },
  paper: {
    padding: 0,
    transition: "all 0.3s",
    marginBottom: 10,
  },
}));

const CourseQuizPage = () => {
  const { productId } = useParams();
  const [data, setdata] = useState();

  const classes = useStyles();
  useEffect(() => {
    ClassOnlineService.GetSingleProduct(productId, "CourseQuiz").then((res) =>
      setdata(res)
    );
  }, [productId]);
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      className={classes.section}
    >
      <Grid container item>
        <Grid container xs={12} md={3} justifyContent="center" item>
          <Grid xs={12} sm={10} md={12} item>
            <Paper className={classes.paper} style={{ textAlign: "center" }}>
              <CourseQuizProduct data={data} />
            </Paper>
            <Paper>
              <ProductVitrine subCategory="CourseQuiz" productId={productId} />
            </Paper>
          </Grid>
        </Grid>
        <Grid container item justifyContent="center" xs={12} md={9}>
          <CourseQuizDetails data={data} />
        </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Grid item xs={12}>
          <Paper style={{ width: "100%" }}>
            <CourseQuizInfoTab productId={productId} />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CourseQuizPage;
