import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { useBasket } from "../../../Basket/Hooks/useBasket";
import { ShowBasketButton } from "../../../Basket/Components/ShowBasketButton";
import NoResult from "../../Reusable/NoResult";
import { useSelector } from "react-redux";
import { IsAuthenticated } from "../../../Services/StoreSlices/UserSlice";

const headCells = [
  { id: "row", label: "شماره" },
  { id: "quizTitle", label: "نام آزمون" },
  {
    id: "startDate",
    label: "تاریخ شروع",
  },
  {
    id: "startDate",
    label: "تاریخ اتمام ",
  },
  { id: "status", label: "وضعیت آزمون" },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, isAuthenticated } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Button
            onClick={onSelectAllClick}
            color="primary"
            variant="contained"
            style={{ minWidth: 100 }}
            disabled={!isAuthenticated}
          >
            انتخاب همه
          </Button>
        </TableCell>
        {headCells.map((headCell, i) => (
          <TableCell key={i} align={"center"} padding={"normal"}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = ({ numSelected }) => {
  const { reset } = useBasket();

  useEffect(() => {
    reset();
  }, []);
  return (
    <>
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subtitle1" component="div">
          {numSelected} انتخاب شده
        </Typography>
      ) : (
        <Typography variant="h6" id="tableTitle" component="div">
          آزمون های آنلاین
        </Typography>
      )}
      <ShowBasketButton />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function QuizTable({ rows }) {
  const classes = useStyles();
  const { addItem, removeItem, addRange, isSelected } = useBasket();
  const isAuthenticated = useSelector(IsAuthenticated);
  const handleSelectAllClick = () => {
    addRange(rows);
  };

  const handleClick = (quiz) => {
    if (isSelected(quiz)) {
      removeItem(quiz);
    } else {
      addItem(quiz);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div style={{ padding: "18px" }}>
          <EnhancedTableToolbar numSelected={0} />
        </div>
        {rows.length > 0 ? (
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={"medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={0}
                order={"asc"}
                orderBy={"startDate"}
                onSelectAllClick={handleSelectAllClick}
                isAuthenticated={isAuthenticated}
                rowCount={rows.length}
              />
              <TableBody>
                {rows.map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={() =>
                        isAuthenticated ? handleClick(row) : null
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        {row.isPurchased ? null : isAuthenticated ? (
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        ) : null}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{row.quizTitle}</TableCell>
                      <TableCell align="center">{row.startDate}</TableCell>
                      <TableCell align="center">{row.endDate}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <NoResult />
          </div>
        )}
      </Paper>
    </div>
  );
}
