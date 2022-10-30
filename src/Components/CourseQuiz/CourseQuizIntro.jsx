import React from "react";
import { Typography, Button } from "@material-ui/core";
export const CourseQuizIntro = () => {
  return (
    <>
      <Typography
        style={{
          fontSize: "16px",
          textAlign: "justifyContent",
          padding: "6px",
          color: "red",
        }}
      >
        آزمون های آنلاین بر اساس مقطع تحصیلی شما نمایش داده شده است.
      </Typography>
      <Typography
        style={{
          fontSize: "14px",
          textAlign: "justifyContent",
          padding: "6px",
        }}
      >
        برای شرکت در آزمون های آنلاین، آزمون مورد نظر خود را از جدول انتخاب
        کنید،در ضمن شما میتوانید با کلیک روی دکمه انتخاب همه تمام آزمون های
        ارائه شده در این جدول را انتخاب کنید.
      </Typography>
      {/* <a
        className="wrap-important"
        href="http://core.bamis.ir/api/v1/File/Download/Hbd8U1HvVezV2FzgRZsT"
        rel="noreferrer"
        target="_blank"
      >
        <button className="button-important">
          دانلود شیوه نامه شرکت در آزمون های آنلاین
        </button>
      </a> */}

      <a
        href="https://uupload.ir/view/whatsapp_video_2021-10-11_at_10.15.11_knw9.mp4/"
        target="_blank"
        rel="noreferrer"
      >
        <Button className="Button" variant="contained">
          <Typography style={{ padding: 2 }}>
            {" "}
            دانلود فیلم نحوه شرکت در آزمون های آنلاین
          </Typography>
        </Button>
      </a>
    </>
  );
};
