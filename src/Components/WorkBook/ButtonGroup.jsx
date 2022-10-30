import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Done, Close } from "@material-ui/icons";

export default function ButtonGroup({ dataOffline, number, handleButton }) {
  const [choice, setChoice] = useState(
    dataOffline !== undefined ? `${dataOffline[number - 1].answer}` : null
  );
  const [correctAnswerNo, setCorrectAnswerNo] = useState(
    dataOffline !== undefined
      ? `${dataOffline[number - 1].correctAnswerNo}`
      : null
  );
  useEffect(() => {
    setChoice(`${dataOffline[number - 1].answer}`);
    setCorrectAnswerNo(`${dataOffline[number - 1].correctAnswerNo}`);
  }, [dataOffline, number]);
  const handleChange = () => {
    handleButton();
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        margin: 0,
        textAlign: "center",
        direction: "ltr",
      }}
    >
      {[...Array(4)].map((e, i) => (
        <button
          key={i}
          onClick={handleChange}
          value={i + 1}
          style={{ marginTop: 10, marginRight: 2 }}
          className={
            "Btn-Quiz" +
            (choice === `${i + 1}`
              ? choice === correctAnswerNo
                ? " correct"
                : " wrong"
              : "") +
            (correctAnswerNo === `${i + 1}` ? " active" : "")
          }
        >
          {choice === `${i + 1}` ? (
            choice === correctAnswerNo ? (
              <Done style={{ color: "black" }} />
            ) : (
              <Close />
            )
          ) : correctAnswerNo === `${i + 1}` ? (
            <Done style={{ color: "green" }} />
          ) : (
            i + 1
          )}
        </button>
      ))}
    </Grid>
  );
}
