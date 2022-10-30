import { makeStyles, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";

const useStyles = makeStyles(() => ({
  text: {
    fontSize: "12px",
    padding: "0 20px",
  },
}));

const ProviderIntro = () => {
  const classes = useStyles();

  const createData = (rankTitle, duration, price) => {
    return { rankTitle, duration, price };
  };

  const rows = [
    createData("بالای 500 کشوری", "یک دقیقه", "1050"),
    createData("بین 50 تا 500 کشوری", "یک دقیقه", "2000 "),
    createData("زیر 50 کشوری", "یک دقیقه", "3400 "),
  ];

  return (
    <>
      <Typography className={"Main-text-Intro"}>مشاوره درسی آنلاین</Typography>
      <a
        className="wrap-important"
        href="https://www.uplooder.net/files/d2ce752ae7d6a53c1d067472527f253b/Explain-Moshavereh.wmv.html"
        rel="noreferrer"
        target="_blank"
      >
        <button className="button-important">
          دانلود فیلم راهنمای خرید مشاوره
        </button>
      </a>
      <p className={"Text-Type-Ex " + classes.text}>
        {`
جهت تماس صوتی با رتبه های برتر ابتدا وارد صفحه شخصی مشاور مورد نظر شوید، در صورتی که این مشاور هم اکنون آنلاین باشد می توانید یکی از بازه های زمانی مکالمه را انتخاب کنید.(بازه های زمانی: 10 دقیقه، 20دقیقه، 30دقیقه)

`}
      </p>
      <p className={"Text-Type-Ex " + classes.text}>
        {`
اگر مشاور مورد نظر شما در این زمان آنلاین نباشد می توانید از بخش تماس های رزرو شده یا آفلاین اقدام کنید.
سپس یکی از بسته های مکالمه را انتخاب کنید.
                `}
      </p>
      <p className={"Text-Type-Ex " + classes.text}>
        {`
 می توانید روز و بازه زمانی مورد نظرتان را انتخاب کنید.
بعد از نهایی کردن پرداخت در بازه زمانی انتخاب شده
منتظر تماس مشاور از شماره ثابت  02141023000  باشید.
                `}
      </p>
      <TableContainer style={{ padding: "0 10px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="right"
                style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
              >
                رتبه
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
              >
                مدت مکالمه
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
              >
                مبلغ پرداخت (تومان)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="right" style={{ fontFamily: "Kalameh" }}>
                  {row.rankTitle}
                </TableCell>
                <TableCell align="center" style={{ fontFamily: "Kalameh" }}>
                  {row.duration}
                </TableCell>
                <TableCell align="center" style={{ fontFamily: "Kalameh" }}>
                  {row.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProviderIntro;
