import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import ServiceProvider from "../../Services/Product/PackageService";
import { IsAuthenticated } from "../../Services/StoreSlices/UserSlice";
import { GetUserId } from "../../Services/Authentication/useAuthentication";
import { useDispatch, useSelector } from "react-redux";
import { ShowModal } from "../../Services/StoreSlices/ModalSlice";
import ModalTutoringClass from "./ModalTutoringClass";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles(() => ({
  text: {
    fontSize: "12px",
    padding: "0 20px",
  },
}));

const TutoringIntro = ({ providerId }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(IsAuthenticated);
  const studentId = GetUserId();
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    ServiceProvider.GetServiceProvidrTimeSheet(Number(providerId)).then((res) =>
      setData(res)
    );
  }, [providerId]);

  return (
    <>
      <Typography className={"Main-text-Intro"}>زمان بندی حضور مدرس</Typography>
      {isAuthenticated ? (
        <>
          <button
            className="button-important"
            onClick={() =>
              dispatch(
                ShowModal(() => (
                  <ModalTutoringClass
                    studentId={studentId}
                    providerId={providerId}
                  />
                ))
              )
            }
          >
            کلاس های دانش آموز
          </button>
        </>
      ) : null}
      <TableContainer style={{ padding: "10px 10px", width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="right"
                style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
              >
                بازه های ساعتی برگزاری جلسه
              </TableCell>
              <TableCell
                align="center"
                style={{ fontWeight: "bold", fontFamily: "Kalameh" }}
              >
                روز هفته
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, i) => (
              <TableRow key={i}>
                <TableCell align="right" style={{ fontFamily: "Kalameh" }}>
                  {row.timeSheetDetails}
                </TableCell>
                <TableCell align="center" style={{ fontFamily: "Kalameh" }}>
                  {row.weekDay === 0 ? (
                    <>یکشنبه</>
                  ) : row.weekDay === 1 ? (
                    <>دوشنبه</>
                  ) : row.weekDay === 2 ? (
                    <>سه شنبه</>
                  ) : row.weekDay === 3 ? (
                    <>چهارشنبه</>
                  ) : row.weekDay === 4 ? (
                    <>پنج شنبه</>
                  ) : row.weekDay === 5 ? (
                    <>جمعه</>
                  ) : row.weekDay === 6 ? (
                    <>شنبه</>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p className={"Text-Type-Ex " + classes.text}>
        {`
برای مشاهده لینک ورود به جلسه بر روی ورود کلیک کنید 

`}
      </p>
    </>
  );
};

export default TutoringIntro;
