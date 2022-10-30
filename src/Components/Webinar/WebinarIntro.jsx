import React from "react";
import { Grid, Typography } from "@material-ui/core";

export const WebinarIntro = () => {
  return (
    <>
      <Grid item xs={12}>
        <Typography className={"Main-text-Intro"}>
          کلاس های آنلاین نکته و تست ویژه دانش آموزان
        </Typography>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <ul
          style={{
            padding: "10px 20px 10px 0",
            textAlign: "right",
            listStyle: "none",
          }}
        >
          <li>
            <Typography
              style={{
                fontSize: "15px",
                margin: "5px",
              }}
            >
              ویژگی های مهم کلاس های آنلاین برتر ها
            </Typography>
          </li>
          <li>
            <Typography
              style={{
                fontSize: "14px",
                margin: "5px",
              }}
            >
              1-مدرسان این دوره دبیران مدارس برتر تهران وطراحان سوالات آزمون های
              قلم چی و رتبه های برتر کنکور می باشند، دبیران دارای بیش از 15 سال
              سابقه تدریس در تهران و شهرستان هستند.
            </Typography>
          </li>
          <li>
            <Typography
              style={{
                fontSize: "14px",
                margin: "5px",
              }}
            >
              2-در این کلاس ها دروس مقاطع دهم و یازدهم و دوازدهم به صورت کامل
              توسط مدرسان تدریس می شود(این کلاسها به صورت آموزش صفر تا صد نکات
              کتاب های درسی و حل تست های شناسنامه دار می باشد.).
            </Typography>
          </li>
          <li>
            <Typography
              style={{
                fontSize: "14px",
                margin: "5px",
              }}
            >
              3-در این کلاس‌ها، رفع اشکال درسی و ارائه تکلیف به دانش آموزان به
              صورت هفتگی توسط رتبه های برتر کنکور انجام می‌شود.
            </Typography>
          </li>
          <li>
            <Typography
              style={{
                fontSize: "14px",
                margin: "5px",
              }}
            >
              4-مشاوره و پشتیبانی ویژه و هدایت تحصیلی توسط رتبه های برتر کنکور
              برای تمامی دانش آموزان انجام می‌گردد.
            </Typography>
          </li>
          <li>
            <Typography
              style={{
                fontSize: "14px",
                margin: "5px",
              }}
            >
              5-آزمون‌های آنلاین مبحثی مطابق با برنامه کلاس‌ها برگزار می‌شود.
            </Typography>
          </li>
          <li>
            <Typography
              style={{
                fontSize: "14px",
                margin: "5px",
              }}
            >
              6-جزوه تایپ شده، طرح درس و خلاصه درس ویژه هر جلسه به دانش آموزان
              ارائه می‌گردد.
            </Typography>
          </li>
          <li>
            <Typography
              style={{
                fontSize: "14px",
                margin: "5px",
              }}
            >
              7-فیلم ضبط شده کلاس‌های برگزار شده در اختیار دانش آموزان قرار داده
              می‌شود.
            </Typography>
          </li>
        </ul>
      </Grid>
    </>
  );
};
