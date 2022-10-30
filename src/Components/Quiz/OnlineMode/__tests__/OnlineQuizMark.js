/* eslint-disable no-undef */
import { render, fireEvent } from "@testing-library/react";
import CardOnlineQuiz from "../CardOnlineQuiz";
import React from "react";

it("Radio group change value and new value updated and last value no more checked", () => {
  const mark = 1;
  const { container, getByTestId } = render(
    <CardOnlineQuiz
      // eslint-disable-next-line no-unused-vars
      handleAnswer={(i, mark, ty) => (mark = i)}
      dataOnline={{
        examId: 1006,
        questionNo: 1,
        questionText: "متولد کدام ماه هستید؟",
        questionImage: "1.png",
        choice1Image: null,
        choice2Image: null,
        choice3Image: null,
        choice4Image: null,
        choice1: " دی ",
        choice2: " بهمن",
        choice3: " مرداد",
        choice4: "فروردین",
        answerNum: 2,
        mark: 1,
        situationMark: 1,
        questionLevel: 0,
        timeLeft: -1555517.0208291,
        totalQuestions: 40,
        answeredCount: 5,
      }}
      questionNo="1"
    />
  );

  // Change selection
  const withValueRadioButton = getByTestId("Mark1");
  fireEvent.click(withValueRadioButton, { target: { checked: true } });
  expect(withValueRadioButton.checked).toEqual(true);

  // Old value is no more checked
  // eslint-disable-next-line no-unused-vars
  const radio = getByTestId("Mark-button");
  fireEvent.click(withValueRadioButton, { target: { checked: true } });
  container.querySelector("#Mark1").click();
  expect(mark).toBe(1);
});
