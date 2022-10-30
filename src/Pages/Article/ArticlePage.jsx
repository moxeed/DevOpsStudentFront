import React, { useState, useEffect } from "react";
import ServiceArticels from "../../Services/Content/ContentService";
import ArticleCard from "../../Components/Content/ArticleCard";
import ArticleDetail from "../../Components/Content/ArticleDetail";
import Carousel from "react-material-ui-carousel";
import { useParams, Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import "./ArticlePage.scss";
import {
  ShowLoading,
  HideLoading,
} from "../../Services/StoreSlices/LoadingSlice";
import { useDispatch } from "react-redux";
import ContentLoader from "react-content-loader";

const ArticlePage = () => {
  const { id } = useParams();
  const [dataCard, setDataCard] = useState([]);
  const [importantData, setImportantData] = useState([]);
  const dispatch = useDispatch();

  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  useEffect(() => {
    dispatch(ShowLoading());
    ServiceArticels.GetFreeCotentsId(id).then(
      (res) => {
        setDataCard(res);
        dispatch(HideLoading());
      },
      () => dispatch(HideLoading())
    );
  }, [id, dispatch]);
  useEffect(() => {
    dispatch(ShowLoading());
    ServiceArticels.GetFreeContentGetImportant().then((res) =>
      setImportantData(res)
    );
    ServiceArticels.GetFreeCotentsId(id).then(
      (res) => {
        setDataCard(res);
        dispatch(HideLoading());
      },
      () => dispatch(HideLoading())
    );
  }, [id, dispatch]);
  const sliderItems =
    importantData.length >= 3 && width > 970
      ? 3
      : importantData.length < 2 && width > 970
      ? 2
      : 1;
  const items = [];

  for (let i = 0; i < 8; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
        <>
          {importantData.slice(i, i + sliderItems).map((da, index) => {
            return (
              <Link
                key={index}
                to={`/Articles/${da.contentId}`}
                style={{ width: "150%", margin: 10, direction: "rtl" }}
              >
                <ArticleCard key={index.toString()} data={da} />
              </Link>
            );
          })}
        </>
      );
    }
  }
  return (
    <Grid container item xs={12} justifyContent="center">
      {importantData.length >= 1 ? (
        <Carousel
          animation="slide"
          navButtonsAlwaysVisible
          timeout={300}
          className={"carsulStyle"}
        >
          {items}
        </Carousel>
      ) : null}
      {dataCard ? (
        <>
          <Grid item xs={11} className={"Display-align"}>
            <div className={"styleArticleCard"}>
              <ArticleDetail data={dataCard} />
            </div>
          </Grid>
          {/* <Grid item xs={10}>
            <Paper style={{ width: "100%", marginBottom: 20 }}>
              <ArticleComments id={id} />
            </Paper>
          </Grid> */}
        </>
      ) : (
        <ContentLoader style={{ width: "100%", height: 200 }}>
          <circle cx="120" cy="100" r="100" />
        </ContentLoader>
      )}
    </Grid>
  );
};
export default ArticlePage;
