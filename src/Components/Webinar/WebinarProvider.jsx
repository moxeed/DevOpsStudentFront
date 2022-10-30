import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ContentLoader from "react-content-loader";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    marginBottom: 10,
    maxHeight: "200px",
    "@media (max-width: 970px)": {
      maxHeight: "200px",
      display: "none",
    },
    width: "100%",
  },
  bottomCard: {
    padding: 5,
  },
  profile: {
    height: "120px",
    "@media (max-width: 970px)": {
      height: "180px",
      width: "auto",
    },
  },
}));
export default function ProviderCard({ provider }) {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ maxHeight: "450px", overflow: "auto" }}
    >
      {provider ? (
        provider.map((p, i) => (
          <Paper className={classes.root} key={i}>
            <Grid container justifyContent="center" alignItems="center" item>
              <Grid item xs={6}>
                <img
                  className={classes.profile}
                  alt="profile"
                  src={"https://bamis.ir/files/app/" + p.profileFileId}
                  width="auto"
                  height="100%"
                />
              </Grid>
              <Grid item xs={6} className={classes.bottomCard}>
                <Typography
                  variant="h5"
                  component="p"
                  style={{ fontSize: "bold" }}
                >
                  {p.name + " "}
                  {p.lastName}
                </Typography>
                <Typography variant="h6" component="p">
                  <Rating readOnly value={p.starRate} />
                </Typography>
                <Typography variant="h6" component="p">
                  {p.jobTitle}
                </Typography>
                <Typography variant="h6" component="p">
                  {p.majorName}
                </Typography>
                <Typography variant="h6" component="p">
                  {p.universityName}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))
      ) : (
        <ContentLoader style={{ width: "100%", height: 200 }}>
          <rect x="30" y="5" rx="3" ry="3" width="100%" height="220" />
        </ContentLoader>
      )}
    </Grid>
  );
}
