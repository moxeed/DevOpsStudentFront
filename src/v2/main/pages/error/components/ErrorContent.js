import React from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router-dom";
import classes from "./ErrorContent.module.scss";
import useQuery from "src/v2/components/hooks/QueryParam";
import useHistoryBack from "../../../../components/hooks/useHistoryBack";
import img404 from "src/v2/assets/images/notFound.png";
import img503 from "src/v2/assets/images/serviceUnavailable.png";
import imgError from "src/v2/assets/images/error.png";
import SupportText from "src/v2/components/reusable/SupportText/SupportText";

function ErrorTypes(code) {
  switch (code) {
    case "404":
      return {
        title: "صفحه\u200cی مورد نظر یافت نشد!",
        description:
          "صفحه ای که به دنبال آن هستید وجود ندارد. لطفا برای پیدا کردن بخش مورد نظر به صفحه\u200cی اصلی بروید.",
        src: img404,
      };
    case "503":
      return {
        title: "سایت در این لحظه پاسخگو نیست",
        description:
          "لطفا از سرعت اینترنت خود مطمئن شوید و درصورت روشن بودن VPN آن را خاموش کنید.\n" +
          "درصورتی که مدام به این صفحه انتقال پیدا می\u200cکنید، سایت درحال توسعه می\u200cباشد و به زودی دوباره در دسترس خواهد بود.",
        src: img503,
      };
    default:
      return {
        title: "بارگزاری صفحه با مشکل مواجه شد",
        description:
          "بارگزاری صفحه\u200cی مورد نظر با مشکل مواجه شده است. لطفا مجددا تلاش کنید و یا به پشتیبانی اطلاع دهید.",
        src: imgError,
      };
  }
}

export default function ErrorContent() {
  const history = useHistory();
  const query = useQuery();
  const error = query.get("text");
  const title = query.get("title");
  const { code } = useParams();

  return (
    <Grid className={classes.notFoundRoot} container>
      <Grid item xs={12} className={classes.paper} container>
        <Grid item xs={12}>
          <div style={{ margin: "0.5em auto" }}>
            <img
              src={ErrorTypes(title || error ? "" : code).src}
              alt="error"
              style={{ width: "100%", maxWidth: "30em" }}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <h1 className={classes.title}>{title ?? ErrorTypes(code).title}</h1>
          <h2>{error ?? ErrorTypes(code).description}</h2>{" "}
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.button}
            onClick={() => useHistoryBack(history)}
          >
            بازگشت به صفحه ی قبلی
          </Button>
        </Grid>
        <Grid item xs={12}>
          <SupportText />
        </Grid>
      </Grid>
    </Grid>
  );
}
