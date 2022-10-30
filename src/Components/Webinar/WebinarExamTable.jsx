import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  Button,
} from "@material-ui/core";
import JDate from "jalali-date";
import { ShowModal } from "../../Services/StoreSlices/ModalSlice";
import { useDispatch } from "react-redux";
import HandleModalStatus from "../Quiz/HandleModalStatus";
import ProductService from "../../Services/Product/PackageService";
import { useParams } from "react-router-dom";

export default function WebinarExamTable({ data }) {
  const dispatch = useDispatch(data?.webinarId);

  const { id } = useParams();

  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    ProductService.GetProductVitrine("Webinar", id)
      .then((res) => {
        setIsPurchased(res.item.isPurchased);
      })
      .catch();
  }, []);
  return (
    <>
      {data.webinarQuizzes?.length > 0 ? (
        <TableContainer style={{ padding: "0 10px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="right"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Kalameh",
                  }}
                >
                  نام آزمون
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Kalameh",
                  }}
                >
                  قابل شرکت{" "}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Kalameh",
                  }}
                >
                  تاریخ برگزاری
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Kalameh",
                  }}
                >
                  وضعیت
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.webinarQuizzes.map((item, i) => (
                <TableRow key={i}>
                  <TableCell align="right" style={{ fontFamily: "Kalameh" }}>
                    <Typography>{item.title ?? "آزمون همایش"}</Typography>
                  </TableCell>
                  <TableCell align="center" style={{ fontFamily: "Kalameh" }}>
                    <Typography>
                      {item.isActive ? "آماده برگزاری" : "غیرفعال"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" style={{ fontFamily: "Kalameh" }}>
                    <Typography>
                      {new JDate(new Date(item?.startDateTime)).format(
                        "dddd DD MMMM YYYY"
                      )}
                      <span style={{ margin: "8px" }}> ساعت</span>
                      {("0" + new Date(item?.startDateTime).getHours()).slice(
                        -2
                      ) +
                        ":" +
                        (
                          "0" + new Date(item?.startDateTime).getMinutes()
                        ).slice(-2)}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontFamily: "Kalameh", minWidth: "220px" }}
                  >
                    {item.isFree || isPurchased ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{
                          padding: "10px 24px",
                        }}
                        onClick={() => {
                          dispatch(
                            ShowModal(() =>
                              HandleModalStatus(item.quizId, data.webinarId)
                            )
                          );
                        }}
                      >
                        شرکت در آزمون
                      </Button>
                    ) : (
                      <span style={{ color: "red" }}>
                        ابتدا همایش خریداری شود
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
          }}
        >
          آزمونی تعریف نشده است
        </Typography>
      )}
    </>
  );
}
