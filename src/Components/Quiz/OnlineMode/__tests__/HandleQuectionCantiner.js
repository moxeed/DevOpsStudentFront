/* eslint-disable no-undef */
/** @format */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import CardOnlineQuiz from "../CardOnlineQuiz";
import axios from "axios";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
  const fakeUser = {
    data: {
      examId: 1780,
      questionNo: 1,
      questionText:
        "نورونها را از نظر ............... به 3 دسته حسي، حركتي و رابط تقسيم ميكنند. ",
      questionImage:
        "https://konkooracademy.com/Content/Lessons/images/%D8%AF%D8%B3%D8%AA%DA%AF%D8%A7%D9%87%20%DA%AF%D9%88%D8%A7%D8%B1%D8%B4.JPG",
      choice1Image: null,
      choice2Image: null,
      choice3Image: null,
      choice4Image: null,
      choice1: "شكل",
      choice2: "سرعت هدايت پيام",
      choice3: "عملكرد",
      choice4: "اندازه",
      answerNum: 0,
      mark: 0,
      situationMark: 0,
      questionLevel: 1,
      timeLeft: 299.8040668,
      totalQuestions: 10,
      answeredCount: 0,
    },
    success: true,
    message: "Question Sent Successfully!",
  };
  jest.spyOn(axios, "post").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser),
    })
  );

  let answer;

  await act(async () => {
    render(
      <CardOnlineQuiz
        // eslint-disable-next-line no-unused-vars
        handleAnswer={(i, mark, ty) => (answer = i)}
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
          mark: 2,
          situationMark: 1,
          questionLevel: 0,
          timeLeft: -1555517.0208291,
          totalQuestions: 40,
          answeredCount: 5,
        }}
        questionNo="1"
      />,
      container
    );
    // container.querySelector("#ChoiceMark3").click();
  });
  container.querySelector("#ChoiceMark3").click();
  expect(answer).toBe("3");
});
