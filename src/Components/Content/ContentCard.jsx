import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import ContentLoader from "react-content-loader";
import Images from "../../Assets/Images/images.png";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    borderRadius: 5,
    border: "1px solid #F4F4F4",
    color: theme.palette.text.secondary,
  },
  tag: {
    backgroundColor: "#259F2D",
    padding: 5,
    color: "white",
    textAlign: "center",
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  card: {
    position: "relative",
    backgroundColor: "#ACEBFF",
  },
}));

export default function ContentCard({ data }) {
  const classes = useStyles();
  return (
    <>
      {data ? (
        <Grid container className={classes.root}>
          <Grid
            item
            xs={12}
            md={12}
            container
            className={classes.card + " Display-align"}
          >
            {data.bartarhaImageLink ? (
              <img
              src={data.bartarhaImageLink}
              alt="poster"
              style={{
                backgroundSize: "cover",
                width: 90,
                height: 90,
              }}
            />
            ) : (data.imageLink ? (
              <img
                src={data.imageLink}
                alt="poster"
                style={{
                  backgroundSize: "cover",
                  width: 90,
                  height: 90,
                }}
              />
            ) : (
              <img
                src={Images}
                alt="img"
                style={{
                  backgroundSize: "cover",
                  width: "auto",
                  maxHeight: 100,
                }}
              />
            ))}
            <>
           { data.writerProviderName?<div className={classes.tag}>
              <span>{data.writerProviderName}</span>
            </div>:null}
            </>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={12}
            style={{
              fontSize: "12px",
              fontWeight: "200",
              paddingTop: " 10px",
              right: 5,
            }}
          >
            <Grid item xs={12} md={12} style={{ padding: 10 }}>
              <Typography
                variant="h6"
                component="p"
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "#727272",
                }}
              >
                {" "}
                {data.title}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <ContentLoader style={{ width: "100%", height: 200 }}>
          <rect x="50" y="8" rx="3" ry="3" width="200" height="50" />
        </ContentLoader>
      )}
    </>
  );
}
