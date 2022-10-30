
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  table: {
    "& th ": { fontSize: 14 },
    width: "100%",
    overflow: "auto",
    alignItems: "center",
  },
 
  heading: {
    fontWeight: "bold",
  },
 
});

export default function TableDetais({ dataWorkBook }) {
  const classes = useStyles();

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} variant="h6">
            جزئیات
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            className="div-scroll"
            style={{
              width: "100%",
              display: "flex",
              overflow: "auto",
              alignItems: "center",
            }}
          >
            <Table
              className={classes.table + "div-scroll"}
              aria-label="caption table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="right">نام آزمون</TableCell>
                  <TableCell align="right">تعداد سوال</TableCell>
                  <TableCell align="right">درست</TableCell>
                  <TableCell align="right">غلط</TableCell>
                  <TableCell align="right">نزده</TableCell>
                  <TableCell align="right">درصد</TableCell>
                  <TableCell align="right">دهک</TableCell>
                  {/* <TableCell align="right">رتبه</TableCell> */}
                  {/* <TableCell align="right">مدت زمان</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataWorkBook?.data.courses.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell align="right">{item.courseName}</TableCell>
                    <TableCell align="right">{item.questionCount}</TableCell>
                    <TableCell align="right">{item.correctCount}</TableCell>
                    <TableCell align="right">{item.wrongCount}</TableCell>
                    <TableCell align="right">{item.whiteCount}</TableCell>
                    <TableCell align="right" style={{ direction: "ltr" }}>
                      {item.coursePercent.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">{item.decile}</TableCell>
                    {/* <TableCell align="right">{item.percentRank}</TableCell> */}
                    {/* <TableCell align="right">
                      {dataWorkBook.data.isPdfMode === false ? (
                        <>
                          {new Date(
                            dataWorkBook.data.totalSumDurationSeconds * 1000
                          )
                            .toISOString()
                            .substr(11, 8)}
                        </>
                      ) : (
                        <span>----</span>
                      )}
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
