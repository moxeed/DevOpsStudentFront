import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { WebinarIntro } from "../../Components/Webinar/WebinarIntro";

export default function NewYearHolidaysWebinarPage() {
  return (
    <div
      style={{
        minHeight: "90vh",
        padding: "30px",
        display: "grid",
        placeItems: "center",
        width: "100%",
        backgroundColor: "white",
        borderRadius: "12px",
      }}
    >
      <WebinarIntro />
      <div>
        <Typography
          style={{ fontSize: "18px", color: "#43bf46", marginBottom: 15 }}
        >
          برای ورود به همایش های گروه آزمایشی خود کلیک کنید
        </Typography>
        <div>
          <Link to="/Selection/Product/Webinar/1">
            <Button className="Button">ریاضی نظام جدید</Button>
          </Link>
          <Link to="/Selection/Product/Webinar/3">
            <Button className="Button">تجربی نظام جدید</Button>
          </Link>
          <Link to="/Selection/Product/Webinar/5">
            <Button className="Button">انسانی نظام جدید</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
