import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Avatar from "@material-ui/core/Avatar";
import JDate from "jalali-date";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ProvidersIntro from "../../Components/Tutoring/ProvidersIntro";
import ContentLoader from "react-content-loader";
const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: "white",
    borderRadius: 5,
    border: "1px solid #F8F8F8",
    padding: 10,
    "& h6": {
      padding: 5,
    },
    marginBottom: 50,
  },

  textType: {
    textAlign: "right",
    color: "#7d7d7d",
    fontWeight: "bold",
    paddingTop: 10,
    "@media (max-width: 970px)": {
      padding: "0 10px",
    },
  },
  hashtagStyle: {
    backgroundColor: "#80b3dd",
    width: "10%",
    color: "white",
    height: 20,
    border: "none",
    borderRadius: 5,
    textAlign: "center",
    padding: 5,
    margin: 2,
    cursor: "pointer",
  },
  table: {
    "& td": { border: "1px solid black", padding: 10 },
  },
}));

export default function ArticleDetail({ data }) {
  const classes = useStyles();

  return (
    <>
      {data ? (
        <Grid container item xs={12} md={12} className={classes.paper}>
          <Grid item md={6} xs={12}>
            <Typography variant="h4" className={classes.textType}>
              {data?.title}
            </Typography>

            {data.createdDateTime ? (
              <Grid
                item
                md={12}
                style={{
                  display: "flex",
                  // justifyContent: "center",
                  padding: 10,
                }}
              >
                <CalendarTodayIcon />
                <Typography style={{ color: "#7d7d7d", paddingRight: 10 }}>
                  {new JDate(new Date(data?.createdDateTime)).format(
                    "dddd DD MMMM YYYY"
                  )}
                </Typography>
              </Grid>
            ) : null}
            <Grid item xs={12} md={12} style={{ display: "flex", padding: 10 }}>
              {data.providerImageLink ? (
                <Avatar
                  alt="Remy Sharp"
                  src={data.providerImageLink}
                  style={{
                    backgroundColor: "#ACEBFF",
                    marginTop: -5,
                    marginLeft: 5,
                  }}
                ></Avatar>
              ) : null}
              {data.provider ? (
                <>
                  <Typography
                    variant="h5"
                    style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
                  >
                    {data.provider?.name} {data.provider?.lastName} _
                  </Typography>
                  <Typography
                    component={"span"}
                    style={{ color: "#7d7d7d", paddingTop: 10 }}
                  >
                    {" "}
                    {data.provider?.jobTitle}
                  </Typography>
                </>
              ) : null}
            </Grid>
            <Grid
              item
              md={12}
              style={{
                display: "flex",
                padding: 10,
              }}
            >
              <AccessTimeIcon style={{ margin: "0px 5px 0px 5px" }} />
              <Typography variant="caption">
                زمان مطالعه : {data?.timeToStudy} دقیقه
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              justifyContent: "center",
              display: "flex",
            }}
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
            ) : data.imageLink ? (
              <img
                src={data.imageLink}
                alt="poster"
                style={{
                  backgroundSize: "cover",
                  width: 90,
                  height: 90,
                }}
              />
            ) : null}
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            style={{
              padding: 10,
            }}
          >
            <Grid item>
              <Grid item md={6} style={{ paddingTop: 20, paddingRight: 20 }}>
                {data.course ? (
                  <span className={classes.hashtagStyle}>
                    #{data?.course.courseName}
                  </span>
                ) : null}
                {data.group ? (
                  <span className={classes.hashtagStyle}>
                    #{data?.group.mainName}
                  </span>
                ) : null}
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            style={{
              fontSize: "12px",
              fontWeight: "200",
              paddingTop: " 15px",
              right: 10,
            }}
          >
            <Typography
              variant="h5"
              component={"span"}
              style={{ padding: 10, lineHeight: 2 }}
            >
              <div
                className="ck-content"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></div>
            </Typography>

            <Grid container style={{ padding: 15 }}>
              {" "}
              <ProvidersIntro
                providerId={data.provider?.providerId}
                category="Consulation"
              />
            </Grid>
            <Grid container style={{ padding: 15 }}>
              {data.fileList?.length > 0 ? (
                <>
                  <Grid item md={12}>
                    <Typography
                      style={{ fontWeight: "bold", fontSize: "14px" }}
                    >
                      {" "}
                      فایل های ضمیمه :
                    </Typography>
                  </Grid>
                  {data.fileList.map((item, i) => (
                    <Grid
                      key={i}
                      item
                      md={12}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <a
                        className="wrap-important"
                        href={item.fileLink}
                        rel="noreferrer"
                        target="_blank"
                        style={{ width: "100%" }}
                      >
                        <Button
                          className="Button"
                          style={{ maxWidth: "80%", padding: "10px" }}
                        >
                          {item.fileName}
                        </Button>
                      </a>
                    </Grid>
                  ))}
                </>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <ContentLoader style={{ width: "100%", height: 200 }}>
          <circle cx="120" cy="100" r="100" />
        </ContentLoader>
      )}
    </>
  );
}
