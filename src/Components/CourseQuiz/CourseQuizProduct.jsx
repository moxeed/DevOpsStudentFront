import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import { IsAuthenticated } from "../../Services/StoreSlices/UserSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const CourseQuizProduct = ({ data }) => {
  const isAuthenticated = useSelector(IsAuthenticated);
  if (!data) return <CircularProgress />;
  return (
    <Grid style={{ padding: 10, color: "#595352" }} spacing={1} container>
      <Grid item xs={12}>
        <Typography variant="h4"> {data?.title}</Typography>
      </Grid>
      <Grid item xs={12} container alignItems="center" justifyContent="center">
        <MenuBookIcon style={{ marginLeft: "5px" }} />
        <Typography> {data?.courseName}</Typography>
      </Grid>
      <Grid item xs={12} container alignItems="center" justifyContent="center">
        <LocalLibraryIcon style={{ marginLeft: "5px" }} />
        <Typography>{data?.groupName}</Typography>
      </Grid>
      {isAuthenticated ? (
        <Grid item xs={12}>
          <Link to="/Profile/Exam">
            <Button className="Button"> آزمون های من </Button>
          </Link>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Link to="/v2/Identity/login">
            <Button className="Button"> ورود برای شرکت در آزمون </Button>
          </Link>
        </Grid>
      )}
    </Grid>
  );
};
export default CourseQuizProduct;
