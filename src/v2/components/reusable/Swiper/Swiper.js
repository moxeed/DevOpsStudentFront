import React from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/swiper.scss";

import PropTypes from "prop-types";
import { Autoplay, Pagination, Navigation, Lazy } from "swiper";
import "./Swiper.scss";

const BamisSwiper = ({ components }) => {
  return (
    <Swiper
      spaceBetween={30}
      loop={true}
      lazy={true}
      autoplay={{
        delay: 7000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      centeredSlides={true}
      className={"mySwiper"}
      modules={[Autoplay, Pagination, Navigation, Lazy]}
    >
      {components.map((Component, id) => (
        <SwiperSlide key={id}>{Component}</SwiperSlide>
      ))}
    </Swiper>
  );
};
BamisSwiper.propTypes = {
  components: PropTypes.array.isRequired,
};

export default BamisSwiper;
