import { DateTime } from "../../../Utility/Date/DateTime";
import QuizStatusButton from "./QuizStatusButton";

export const ConvertValues = (arr) => {
  arr.forEach((obj) => {
    obj["status"] = (
      <QuizStatusButton
        status={obj["status"]}
        quizId={obj["quizId"]}
        startDate={obj["startDate"]}
        resultDate={obj["resultDate"]}
      />
    );
    obj["startDate"] = <DateTime date={new Date(obj["startDate"])} />;
    obj["endDate"] = <DateTime date={new Date(obj["endDate"])} />;
  });
  return arr;
};
