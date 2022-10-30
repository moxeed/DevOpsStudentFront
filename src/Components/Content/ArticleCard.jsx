import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import ContentLoader from "react-content-loader";
import Images from "../../Assets/Images/images.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    minHeight: 100,
    color: theme.palette.text.secondary,
    backgroundColor: (props) => props.color,
    borderRadius: 5,
    border: "2px solid #f4f4f4",
    transition: "0.4s ease",
    "&:hover": {
      background: "white",
      boxShadow: "-1px 2px 27px -7px rgba(0,0,0,0.5) !important",
    },
  },
}));

export default function ArticleCard({ data, color = "#fff" }) {
  const props = { color: color };
  const classes = useStyles(props);
  return (
    <Grid
      container
      className={classes.paper}
      alignItems="center"
      justifyContent="space-between"
    >
      {data ? (
        <>
          <Grid item xs={3} className={"Display-flex-center"}>
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
          </Grid>
          <Grid item xs={9} style={{ paddingRight: "10px" }}>
            {data.provider ? (
              <Typography component="p">{data.writerProviderName}</Typography>
            ) : null}

            {data.title.length > 100 ? (
              <marquee
                width="100%"
                direction="right"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Kalameh",
                  paddingTop: 10,
                  paddingRight: 5,
                }}
              >
                {" "}
                <Typography variant="h6" component="p">
                  {data.title}
                </Typography>
              </marquee>
            ) : (
              <Typography
                variant="h6"
                component="p"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Kalameh",
                  paddingTop: 10,
                  paddingRight: 5,
                }}
              >
                {data.title}
              </Typography>
            )}
          </Grid>
        </>
      ) : (
        <ContentLoader style={{ width: "100%", height: 200 }}>
          <circle cx="120" cy="100" r="100" />
        </ContentLoader>
      )}
    </Grid>
  );
}
