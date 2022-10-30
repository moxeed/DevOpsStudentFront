import React from "react";
import JDate from "jalali-date";
const DateTime = ({ date }) => {
  const dateTime = new Date(date);
  return (
    <>
      {new JDate(dateTime).format("dddd DD MMMM")} ساعت{" "}
      {dateTime.getMinutes() < 10
        ? "0" + dateTime.getMinutes()
        : dateTime.getMinutes()}{" "}
      :{" "}
      {dateTime.getHours() < 10
        ? "0" + dateTime.getHours()
        : dateTime.getHours()}{" "}
    </>
  );
};

const GetTime = ({ date }) => {
  const dateTime = new Date(date);
  return (
    <>
      {dateTime.getMinutes() < 10
        ? "0" + dateTime.getMinutes()
        : dateTime.getMinutes()}{" "}
      :{" "}
      {dateTime.getHours() < 10
        ? "0" + dateTime.getHours()
        : dateTime.getHours()}{" "}
    </>
  );
};

const formatDate = (date) => {
  const d = new Date(date),
    year = d.getFullYear(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    hour = "" + d.getHours(),
    minute = "" + d.getMinutes(),
    second = "" + d.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hour.length < 2) hour = "0" + hour;
  if (minute.length < 2) minute = "0" + minute;
  if (second.length < 2) second = "0" + second;

  return `${[year, month, day].join("-")}T${hour}:${minute}:${second}`;
};

export { DateTime, GetTime, formatDate };
