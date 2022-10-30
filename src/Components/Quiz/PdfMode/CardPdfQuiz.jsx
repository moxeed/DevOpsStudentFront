import React from "react";
import CardQuestion from "./CardQuestion";
const CardPdfQuiz = ({ number, dataOffline, examId }) => {
  return (
    <>
      {[...Array(10)].map((e, i) => (
        <CardQuestion
          key={i}
          number={number + i}
          examId={examId}
          dataOffline={dataOffline}
        />
      ))}
    </>
  );
};

export default CardPdfQuiz;
