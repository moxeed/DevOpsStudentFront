import React from "react";
import { makeStyles, Grid, Card } from "@material-ui/core";
import Background from "../../Assets/Images/background.jpg";
import CompleteProfileForm from "../../Components/ProfileOrder/CompleteProfileForm";

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: `url(${Background})`,
    "grid-template-columns": "60%",
    "& .MuiTextField-root": {
      width: "100%",
      maxWidth: "260px",
    },
  },
}));

const EditProfilePage = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="center"
      className={classes.root + " Form-Paper"}
    >
      <Card
        style={{
          textAlign: "center",
          maxWidth: "700px",
          width: "100%",
          padding: "20px 0",
        }}
      >
        <CompleteProfileForm />
      </Card>
    </Grid>
  );
};

export default EditProfilePage;
