import React from "react";
import Carousel from "react-material-ui-carousel";
import TestApiExams from "./testAPIs/TestApiExams";
import { Typography } from "@material-ui/core";

export default function ExamsCarousel() {
  const exams = TestApiExams?.data;
  const items = [];
  const carouselNumber = window.innerWidth >= 700 ? 3 : 1;
  const textWidth = window.innerWidth >= 700 ? "20%" : "60%";

  for (let i = 0; i < exams.length; i += 1) {
    if (i % carouselNumber === 0) {
      items.push(
        <>
          {exams.slice(i, i + carouselNumber).map((item, i) => (
            <Typography
              key={i}
              gutterBottom
              variant="h6"
              style={{
                width: textWidth,
                margin: "40px 30px 10px",
                direction: "rtl",
                backgroundColor: "rgba(0,191,3, 0.1)",
                padding: "0.4em",
                borderRadius: "4px",
              }}
            >
              {item.title}
            </Typography>
          ))}
        </>
      );
    }
  }

  return (
    <div style={{ margin: "2em auto" }}>
      <Carousel
        animation="slide"
        navButtonsAlwaysVisible
        style={{ padding: 30 }}
      >
        {items}
      </Carousel>
    </div>
  );
}
