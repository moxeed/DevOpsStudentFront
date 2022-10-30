/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import PropTypes from "prop-types";
import { Container } from "@mui/material";

const PrevButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
);

const NextButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
);

const ResponsiveCarousel = ({
  slides,
  slidesPerView = {
    xs: "0 0 100%",
    sm: "0 0 33%",
    md: "0 0 25%",
    lg: "0 0 20%",
  },
  loop = true,
}) => {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: loop,
    speed: 5,
    skipSnaps: false,
    align: "center",
    startIndex:
      slides.length % 2 === 0 ? slides.length / 2 : (slides.length + 1) / 2,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <Container
              className="embla__slide"
              sx={{
                flex: {
                  xs: slidesPerView.xs,
                  sm: slidesPerView.sm,
                  md: slidesPerView.md,
                  lg: slidesPerView.lg,
                },
              }}
              key={index}
            >
              <div className="embla__slide__inner">{slide}</div>
            </Container>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  );
};
ResponsiveCarousel.propTypes = {
  slides: PropTypes.array.isRequired,
  slidesPerView: PropTypes.shape({
    xs: PropTypes.string.isRequired,
    sm: PropTypes.string.isRequired,
    md: PropTypes.string.isRequired,
    lg: PropTypes.string.isRequired,
  }),
  loop: PropTypes.bool,
};

export default ResponsiveCarousel;
