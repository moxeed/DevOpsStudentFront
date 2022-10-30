import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
} from "@material-ui/core";
import JDate from "jalali-date";

export default function WebinarDetailTable({ data }) {
  const dateExpire = (date, cancle) => {
    return {
      textDecoration:
        new Date().getTime() - new Date(date).getTime() > 0 || cancle
          ? "line-through"
          : "none",
    };
  };
  return (
    <>
      <TableContainer
        style={{ maxHeight: "50vh", overFlowY: "auto", padding: "0 10px" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="right"
                style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
              >
                عنوان
              </TableCell>
              {data.productProvider.length > 2 && (
                <TableCell
                  align="center"
                  style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
                >
                  ارائه دهنده
                </TableCell>
              )}
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
              >
                تاریخ برگزاری جلسه
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
              >
                ساعت شروع
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
              >
                ساعت پایان
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.webinarSchedules?.map((item, i) => (
              <TableRow key={i}>
                <TableCell align="right" style={{ fontFamily: "Kalameh" }}>
                  <Typography
                    style={dateExpire(item?.endDateTime, item?.isCanceled)}
                  >
                    {item.subject ? item.subject : "جلسه آنلاین"}
                  </Typography>
                </TableCell>
                {data.productProvider.length > 2 && (
                  <TableCell align="center" style={{ fontFamily: "Kalameh" }}>
                    <Typography
                      style={dateExpire(item?.endDateTime, item?.isCanceled)}
                    >
                      {item.provider && item.provider.fullName
                        ? item.provider.fullName
                        : "گروه مدرسین"}
                    </Typography>
                  </TableCell>
                )}
                <TableCell align="center" style={{ fontFamily: "Kalameh" }}>
                  <Typography
                    style={dateExpire(item?.endDateTime, item?.isCanceled)}
                  >
                    {new JDate(new Date(item?.startDateTime)).format(
                      "dddd DD MMMM YYYY"
                    )}{" "}
                  </Typography>
                </TableCell>
                <TableCell align="center" style={{ fontFamily: "Kalameh" }}>
                  <Typography
                    style={dateExpire(item?.endDateTime, item?.isCanceled)}
                  >
                    {("0" + new Date(item?.startDateTime).getHours()).slice(
                      -2
                    ) +
                      ":" +
                      ("0" + new Date(item?.startDateTime).getMinutes()).slice(
                        -2
                      )}
                  </Typography>
                </TableCell>
                <TableCell align="center" style={{ fontFamily: "Kalameh" }}>
                  <Typography
                    style={dateExpire(item?.endDateTime, item?.isCanceled)}
                  >
                    {("0" + new Date(item?.endDateTime).getHours()).slice(-2) +
                      ":" +
                      ("0" + new Date(item?.endDateTime).getMinutes()).slice(
                        -2
                      )}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
