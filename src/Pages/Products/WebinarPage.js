import WebinarDetails from "../../Components/Webinar/WebinarDetails";
import WebinarTabs from "../../Components/Webinar/WebinarTabs";
import WebinarProvider from "../../Components/Webinar/WebinarProvider";
import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { ProductVitrine } from "../../Components/Financial/ProductVitrine";
import WebinarContent from "../../Services/Product/WebinarContent";
import ShowLink from "../../Components/Webinar/ShowLink";
import IDivider from "../../Components/Reusable/IDivider";
import { getDiffDateTime } from "src/v2/components/utility/time";

const useStyles = makeStyles((theme) => ({
  section: {
    paddingTop: "10px",
    "&>*": {
      padding: "10px",
    },
  },
  paper: {
    padding: 0,
    transition: "all 0.3s",
    marginBottom: 10,
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
    direction: "rtl",
    textAlign: "center",
    transition: "all 1s",
    border: "0px solid red",
    padding: "10px",
  },
  disableButton: {
    padding: " 7px 12px",
    backgroundColor: "#d9d9d9",
    color: "#808080",
    boxShadow: "none",
    border: "none",
    margin: "5px",
    borderRadius: "12px",
  },
  demo: {
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const WebinarPage = () => {
  const { id } = useParams();
  const [data, setdata] = useState();
  const [provider, setProvider] = useState();
  const [isPurchased, setIsPurchased] = useState();
  const [isOver, setIsOver] = useState(null);
  const classes = useStyles();

  const updateData = () => {
    WebinarContent.GetSingleProduct(id).then((res) => {
      setdata(res.data);
      setProvider(res.data.productProvider);
    });
  };

  useEffect(() => {
    if (id)
      WebinarContent.GetSingleProduct(id).then((res) => {
        setdata(res.data);
        setProvider(res.data.productProvider);

        getDiffDateTime(
          res.data?.webinarSchedules[res.data?.webinarSchedules.length - 1]
            .endDateTime
        ).then((time) => {
          setIsOver(time < 0);
          if (time > 0) setTimeout(updateData, Math.abs(time));
        });
      });
  }, []);

  if (data === null) {
    return (
      <Redirect to="/v2/store/error?title=همایش در حال حاضر وجود ندارد." />
    );
  }

  const WebinarIsOver = () => (
    <div className={classes.root}>
      <IDivider title="انتخاب بسته" />
      {data ? (
        <Grid
          item
          xs={12}
          style={{ height: "100%", position: "relative", paddingBottom: 10 }}
        >
          <Grid item xs={12}>
            <div className={classes.demo}>
              <List>
                <ListItem>
                  <Grid
                    container
                    item
                    xs={12}
                    justifyContent="space-between"
                    alignItems="center"
                    Style={{ padding: 5 }}
                  >
                    <Grid item>
                      <Typography variant="h5">{data.title}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">
                        قیمت : {data.price > 0 ? data.price : "رایگان"}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </div>
          </Grid>
          <button className={classes.disableButton} disabled>
            <Typography> زمان برگزاری همایش به پایان رسیده است.</Typography>
          </button>
        </Grid>
      ) : (
        <>
          <IDivider title="در حال دریافت" />
          <Grid
            item
            xs={12}
            style={{ height: "80%" }}
            container
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Grid>
        </>
      )}
    </div>
  );

  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      className={classes.section}
    >
      <Grid container item={12} style={{ flexWrap: "wrap" }}>
        <Grid
          container
          xs={12}
          md={4}
          justifyContent="center"
          item
          style={{ paddingLeft: 5 }}
        >
          <Grid xs={12} sm={10} md={12} item>
            <Paper className={classes.paper} style={{ textAlign: "center" }}>
              {isOver === true ? (
                <WebinarIsOver />
              ) : isOver === false ? (
                <ProductVitrine
                  subCategory={"Webinar"}
                  productId={id}
                  AfterPurchased={() =>
                    ShowLink({
                      webinarId: data?.webinarId,
                      setIsPurchased,
                      webinarSchedules: data?.webinarSchedules,
                    })
                  }
                />
              ) : (
                <CircularProgress size={50} color="inherit" />
              )}
            </Paper>
            <WebinarProvider provider={provider} />
          </Grid>
        </Grid>
        <Grid container item justifyContent="center" xs={12} md={8}>
          <WebinarDetails data={data} />
        </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Grid item xs={12}>
          <Paper style={{ width: "100%" }}>
            <WebinarTabs productId={id} isPurchased={isPurchased} data={data} />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WebinarPage;
