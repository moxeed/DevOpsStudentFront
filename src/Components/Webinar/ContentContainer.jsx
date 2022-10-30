import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import SlideshowIcon from "@material-ui/icons/Slideshow";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  icon1: {
    color: "#38ad4c",
  },
  icon2: {
    color: "#d92323",
  },
  icon3: {
    color: "#d96c23",
  },
  title: {
    flexShrink: 0,

    "@media (max-width: 710px)": {
      textOverflow: "ellipsis",
      overflow: "hidden",
      width: "200px",
      fontSize: "14px",
    },
  },
}));

export default function ContentContainer({ item, isPurchased }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const mainContent = () => (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Grid container justifyContent="space-around">
          <Grid item md={8} xs={12}>
            <Typography className={classes.title} variant="h5">
              {item.title}
            </Typography>
          </Grid>
          <Grid item md={2} className="Display-align">
            <LockOpenIcon className={classes.icon1} fontSize="normal" />
            دردسترس
          </Grid>
          <Grid item md={2}>
            <a
              href={item.downloadLink}
              target="_blank"
              rel="noreferrer"
              download
            >
              {item.contentType.contentTypeId === 1 ? (
                <Button className="Display-align">
                  <SlideshowIcon className={classes.icon3} fontSize="normal" />
                  دانلود
                </Button>
              ) : item.contentType.contentTypeId === 2 ? (
                <Button className="Display-align">
                  <PictureAsPdfIcon
                    className={classes.icon3}
                    fontSize="normal"
                  />
                  دانلود
                </Button>
              ) : item.contentType.contentTypeId === 3 ? (
                <Button className="Display-align">
                  <VolumeUpIcon className={classes.icon3} fontSize="normal" />
                  دانلود
                </Button>
              ) : null}
            </a>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"baseline"}
          style={{
            margin: "10px",
          }}
        >
          <Grid item md={5} xs={12}>
            <Typography style={{ marginLeft: "5px" }} variant="h6">
              توضیحات:{" "}
              {item.description ? (
                <span
                  className="ck-content"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></span>
              ) : (
                "محتوای همایش"
              )}
            </Typography>
          </Grid>
          <Grid item md={2} xs={6}>
            <Typography style={{ margin: "0 12px" }} variant="h6">
              قسمت ({item.part})
            </Typography>
          </Grid>
          <Grid item md={2} xs={6}>
            <Typography style={{ margin: "0 12px" }} variant="h6">
              {item.session === 0
                ? " مرتبط به همایش"
                : " مرتبط به جلسه " + item.session}
            </Typography>
          </Grid>
          <Grid item md={2} xs={8}>
            <Typography style={{ color: item.isFree ? "green" : "red" }}>
              {item.isFree ? "رایگان ببینید" : "ابتدا محصول را خریداری کنید."}
            </Typography>
          </Grid>
          <Grid item md={2} xs={4}>
            <a
              href={item.downloadLink}
              target="_blank"
              rel="noreferrer"
              download
            >
              <Button className="Display-align Button">دانلود</Button>
            </a>
          </Grid>
          {item.streamLink !== 0 && item.contentType.contentTypeId === 1 ? (
            <>
              {item.streamLink.includes("iframe") ? (
                <span
                  dangerouslySetInnerHTML={{ __html: item.streamLink }}
                  style={{ width: "100%", height: "500" }}
                ></span>
              ) : (
                <iframe
                  src={item.streamLink}
                  height="500"
                  width="100%"
                  style={{ border: "none" }}
                  title={item.title}
                ></iframe>
              )}
            </>
          ) : (
            <>
              {item.contentType.contentTypeId === 1 ? (
                <Grid item md={3} xs={6}>
                  <Button variant="contained" color="secondary" disabled>
                    در حال حاضر محتوا قابل نمایش نمی باشد
                  </Button>
                </Grid>
              ) : (
                <div> </div>
              )}
            </>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <>
      {item.length !== 0 ? (
        item.isFree ? (
          mainContent()
        ) : isPurchased ? (
          item.isActive ? (
            mainContent()
          ) : (
            <Grid item xs={12}>
              <Typography>محتوای این همایش فعال نمیباشد.</Typography>
            </Grid>
          )
        ) : (
          <Grid item md={4} className="Display-align">
            <LockIcon className={classes.icon2} fontSize="normal" />
            برای دیدن محتوا، ابتدا همایش را خریداری کنید
          </Grid>
        )
      ) : null}
    </>
  );
}
