import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { tomanConverter } from "../../../../../../components/utility/converters";

function createData(date, code, price, status, orders) {
  return {
    date, 
    // todo
    // add date converter
    code,
    price: tomanConverter(price),
    status,
    orders: orders.map((item) => {
      return {
        name: item.name,
        price: tomanConverter(price),
        provider: item.provider,
      };
    }),
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.date}</TableCell>
        <TableCell align="center">{row.code}</TableCell>
        <TableCell align="center">{row.price}</TableCell>
        <TableCell align="center">
          <Chip
            label={row.status === 0 ? "پرداخت شده" : "لغو شده"}
            color={row.status === 0 ? "success" : "secondary"}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                فاکتور
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {factorColumns.map((item, i) => (
                      <TableCell key={"tableOrderFactor_" + i}>
                        {item}
                      </TableCell>
                    ))}

                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orders.map((ordersRow, i) => (
                    <TableRow key={"tableOrderFactorColumns_" + i}>
                      <TableCell>{ordersRow.name}</TableCell>
                      <TableCell>{ordersRow.price}</TableCell>
                      <TableCell>{ordersRow.provider}</TableCell>
                      <TableCell align="right">
                        <Button
                          color="primary"
                          size="small"
                          variant="contained"
                        >
                          نمایش محصول
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
Row.propTypes = {
  row: PropTypes.shape({
    date: PropTypes.string.isRequired,
    code: PropTypes.number.isRequired,
    price: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
    orders: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.object.isRequired,
        provider: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

// todo
// add service
const rows = [
  createData("1400/8/8", 15942424, 600000, 0, [
    {
      name: "همایش عیدانه دروس عمومی",
      price: 600000,
      provider: "جمعی از مشاوران",
    },
  ]),
  createData("1400/8/8", 22421237, 120000, 1, [
    {
      name: "تماس دقیقه ای آفلاین",
      price: 60000,
      provider: "رضا گلزار",
    },
    {
      name: "تدریس خصوصی",
      price: 60000,
      provider: "احمد پورسلیمی",
    },
  ]),
];

// todo
// add service
const columns = ["تاریخ تراکنش", "کد رهگیری", "مبلغ", "وضعیت"];
const factorColumns = ["نام محصول", "قیمت", "ارائه دهنده"];

function FinancialTransactionsTable() {
  return (
    <TableContainer>
      <Table aria-label={"financial table"}>
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((item, i) => (
              <TableCell key={"tableOrder_" + i} align="center">
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <React.Fragment key={"rowFTable_" + i}>
              <Row row={row} />
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FinancialTransactionsTable;
