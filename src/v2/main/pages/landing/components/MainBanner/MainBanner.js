import React from "react";
import { Box, Hidden } from "@mui/material";
import BamisSwiper from "src/v2/components/reusable/Swiper/Swiper";
import { PanelService } from "src/v2/api/front-panel";
import { GApushData } from "src/v2/components/GAlog/GAlog";

const MainBanner = () => {
  const [dSlides, setDSlides] = React.useState([]);
  const [mSlides, setMSlides] = React.useState([]);
  const [posters, setPosters] = React.useState([]);

  React.useEffect(() => {
    PanelService.GetPosters()
      .then((res) => setPosters(res))
      .catch(() => {
        GApushData("front-panel", {});
      });
  }, []);

  React.useEffect(() => {
    setDSlides(
      posters
        .filter((item) => item.mobile === false)
        .map((item, index) => (
          <a href={item.link} key={index}>
            <Box
              key={index}
              component="img"
              alt="banner"
              src={item.hash}
              sx={{
                height: "auto",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            />
          </a>
        ))
    );
    setMSlides(
      posters
        .filter((item) => item.mobile === true)
        .map((item, index) => (
          <a href={item.link} key={index}>
            <Box
              key={index}
              component="img"
              alt="banner"
              src={item.hash}
              sx={{
                height: "auto",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "0 auto",
              }}
            />
          </a>
        ))
    );
  }, [posters]);
  if (posters.length > 0)
    return (
      <>
        <Hidden smUp>
          <BamisSwiper components={mSlides} />
        </Hidden>
        <Hidden smDown>
          <BamisSwiper components={dSlides} />
        </Hidden>
      </>
    );
  return <div></div>;
};

export default MainBanner;
