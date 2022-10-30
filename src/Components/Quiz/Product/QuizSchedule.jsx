import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    textAlign: "center",
  },
  paper: {
    marginBottom: theme.spacing(2),
  },
  table: {
    maxWidth: 750,
  },
}));

export default function QuizSchedule() {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Typography variant="h6" style={{ fontSize: "bold" }}>
        برنامه برگزاری آزمون های آنلاین
      </Typography>
      <Table
        className={classes.table}
        aria-labelledby="tableTitle"
        size={"small"}
      >
        <TableHead style={{ backgroundColor: "#54ACD2" }}>
          <TableRow>
            <TableCell align="center">روز</TableCell>
            <TableCell align="center">نام درس</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">شنبه</TableCell>
            <TableCell align="center">
              زیست شناسی ( تجربی ) / فلسفه و منطق ( انسانی )
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">یکشنیه</TableCell>
            <TableCell align="center">
              فیزیک ( ریاضی ) / علوم و فنون ( انسانی )
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">سه شنبه</TableCell>
            <TableCell align="center">
              شیمی (تجربی و ریاضی ) / عربی اختصاصی (انسانی)
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
