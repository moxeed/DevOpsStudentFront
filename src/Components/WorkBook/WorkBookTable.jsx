import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableDetais from "./TableDetails";

const useStyles = makeStyles({
  table: {
    "& th ": { fontSize: 16, fontWeight: "bold" },
    width: "100%",
    overflow: "auto",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#2B982B",
    color: "white",
    padding: 10,
    margin: 15,
  },
  heading: {
    fontWeight: "bold",
  },
  root: {
    width: "100%",
    display: "flex",
    overflow: "auto",
    alignItems: "center",
  },
});

export default function TableWorkBook({ dataWorkBook }) {
  const classes = useStyles();
  const changeDecile = (item) => {
    switch (item) {
      case 1:
        return <>دهک اول</>;
      case 2:
        return <>دهک دوم</>;
      case 3:
        return <>دهک سوم</>;
      case 4:
        return <>دهک چهارم</>;
      case 5:
        return <>دهک پنجم</>;
      case 6:
        return <>دهک ششم</>;
      case 7:
        return <>دهک هفتم</>;
      case 8:
        return <>دهک هشتم</>;
      case 9:
        return <>دهک نهم</>;
      case 10:
        return <>دهک دهم</>;
      case 0:
        return <>0</>;
      default:
        break;
    }
  };
  return (
    <>
      <div className={classes.root + " div-scroll"}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="right">نام آزمون</TableCell>
              <TableCell align="right">تعداد سوال</TableCell>
              <TableCell align="right">درست</TableCell>
              <TableCell align="right">غلط</TableCell>
              <TableCell align="right">نزده</TableCell>
              <TableCell align="right">درصد</TableCell>
              {dataWorkBook.data.courses.length >= 2 ? null : (
                <TableCell align="right">دهک</TableCell>
              )}
              <TableCell align="right">مدت زمان</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataWorkBook.data.courses.length >= 2 ? (
              <>
                {
                  <TableRow>
                    <TableCell align="right">
                      {dataWorkBook?.data.quizTitle}
                    </TableCell>
                    <TableCell align="right">
                      {dataWorkBook?.data.allQuestionCount}
                    </TableCell>
                    <TableCell align="right">
                      {dataWorkBook?.data.allCorrectCount}
                    </TableCell>
                    <TableCell align="right">
                      {dataWorkBook?.data.allWrongCount}
                    </TableCell>
                    <TableCell align="right">
                      {dataWorkBook?.data.allWhiteCount}
                    </TableCell>
                    <TableCell align="right" style={{ direction: "ltr" }}>
                      {dataWorkBook?.data.totalPercent.toFixed(2)}%
                    </TableCell>
                    {/* <TableCell align="right">
                      {changeDecile(item.decile)}
                    </TableCell> */}
                    <TableCell align="right">
                      <>
                        {new Date(
                          dataWorkBook.data.totalSumDurationSeconds * 1000
                        )
                          .toISOString()
                          .substr(11, 8)}
                      </>
                      {/* {dataWorkBook.data.isPdfMode === false ? (
                        <>
                          {new Date(
                            dataWorkBook.data.totalSumDurationSeconds * 1000
                          )
                            .toISOString()
                            .substr(11, 8)}
                        </>
                      ) : (
                        <span>----</span>
                      )} */}
                    </TableCell>
                  </TableRow>
                }
              </>
            ) : (
              <>
                {dataWorkBook?.data.courses.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell align="right">{item.courseName}</TableCell>
                    <TableCell align="right">{item.questionCount}</TableCell>
                    <TableCell align="right">{item.correctCount}</TableCell>
                    <TableCell align="right">{item.wrongCount}</TableCell>
                    <TableCell align="right">{item.whiteCount}</TableCell>
                    <TableCell align="right" style={{ direction: "ltr" }}>
                      {item.coursePercent.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">
                      {changeDecile(item.decile)}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(
                        dataWorkBook?.data.totalSumDurationSeconds * 1000
                      )
                        .toISOString()
                        .substr(11, 8)}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {dataWorkBook.data.courses.length >= 2 ? (
        <TableDetais dataWorkBook={dataWorkBook} />
      ) : null}
    </>
  );
}
