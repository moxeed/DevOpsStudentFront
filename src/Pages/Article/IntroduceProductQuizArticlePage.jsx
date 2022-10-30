import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import "./ArticlePage.scss";
import picture from "../../Assets/Images/examPoster.jpg";
import ContentLoader from "react-content-loader";
import IntroduceProductQuizArticle from "../../Components/Quiz/Product/IntroduceProductQuizArticle";

const IntroduceProductQuizArticlePage = () => {
  const [dataCard, setDataCard] = useState([]);

  useEffect(() => {
    setDataCard({
      title: "معرفی آزمون های آنلاین برترها",
      createdDateTime: "2021-09-30T00:00:00",
      imageLink: picture,
    });
  }, []);

  return (
    <Grid container item xs={12} justifyContent="center">
      {dataCard ? (
        <Grid item xs={12} md={11} className={"Display-align"}>
          <div className={"styleArticleCard"}>
            <IntroduceProductQuizArticle data={dataCard} />
          </div>
        </Grid>
      ) : (
        <ContentLoader style={{ width: "100%", height: 200 }}>
          <rect x="30" y="5" rx="3" ry="3" width="100%" height="220" />
        </ContentLoader>
      )}
    </Grid>
  );
};
export default IntroduceProductQuizArticlePage;
