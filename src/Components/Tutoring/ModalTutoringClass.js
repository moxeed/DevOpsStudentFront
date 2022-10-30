import React, { useEffect, useState } from "react";
import { Typography, Button, Grid } from "@material-ui/core";
import ServiceProvider from "../../Services/Product/PackageService";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import JDate from "jalali-date";
import { ShowModal } from "../../Services/StoreSlices/ModalSlice";
import StartSession from "../../Services/Product/StartSession";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ModalTutoringClass = ({ studentId, providerId }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (providerId && studentId)
      ServiceProvider.MyPendingTutorings(
        Number(studentId),
        Number(providerId)
      ).then((res) => setData(res));
  }, [studentId, providerId]);

  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item>
          {" "}
          <Typography className={"Main-text-Intro"}>
            {" "}
            کلاس های دانش آموز
          </Typography>
        </Grid>
        <Grid item>
          {" "}
          <Button component={Link} className="Button" to="/Profile/Orders">
            ورود به صفحه سفارشات
          </Button>
        </Grid>
      </Grid>

      <TableContainer style={{ padding: "30px 10px", width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="right"
                style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
              >
                نام درس
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
              >
                وضعیت درس
              </TableCell>
              {/* <TableCell
                align="center"
                style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
              >
                ساعت خرید
              </TableCell> */}
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
              >
                ساعت شروع کلاس
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
              >
                لینک ورود به کلاس
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="right" style={{ fontFamily: "Kalameh" }}>
                  {row.courseName}
                </TableCell>
                <TableCell align="right" style={{ fontFamily: "Kalameh" }}>
                  {row.status}
                </TableCell>
                {/* <TableCell align="center" style={{ fontFamily: "Kalameh" }}>
                  <Typography>
                    {new JDate(new Date(row?.purchasedDate)).format(
                      "dddd DD MMMM YYYY"
                    )}{" "}
                  </Typography>
                  <Typography>
                    {("0" + new Date(row?.purchasedDate).getHours()).slice(-2) +
                      ":" +
                      ("0" + new Date(row?.purchasedDate).getMinutes()).slice(
                        -2
                      )}
                  </Typography>
                </TableCell> */}
                <TableCell align="center" style={{ fontFamily: "Kalameh" }}>
                  <Typography>
                    {new JDate(new Date(row?.startDateRange)).format(
                      "dddd DD MMMM YYYY"
                    )}{" "}
                  </Typography>
                  <Typography>
                    {("0" + new Date(row?.startDateRange).getHours()).slice(
                      -2
                    ) +
                      ":" +
                      ("0" + new Date(row?.startDateRange).getMinutes()).slice(
                        -2
                      )}
                  </Typography>
                </TableCell>
                <TableCell>
                  <button
                    className="linkbutton"
                    onClick={() =>
                      dispatch(
                        ShowModal(() => (
                          <StartSession tutoringId={row.tutoringId} />
                        ))
                      )
                    }
                  >
                    ورود به کلاس
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ModalTutoringClass;
