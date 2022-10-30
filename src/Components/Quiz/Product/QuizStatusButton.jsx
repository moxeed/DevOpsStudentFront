import { Typography } from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import StatusButton from "../../CourseQuiz/StatusButton";
import * as React from "react";

const QuizStatusButton = ({ status, quizId, startDate, resultDate }) => {
  const count = (d) => {
    const end = new Date(d);
    const now = new Date();
    return Date.now() + Math.abs(end - now);
  };
  if (status === 0)
    return (
      <Typography style={{ padding: 10 }}>
        لطفا آزمون را خریداری نمایید
      </Typography>
    );

  if (status === 5)
    return (
      <Typography style={{ padding: 10 }}>
        <Countdown
          value={count(startDate)}
          format=" شروع آزمون تا DD روز HH ساعت mm دقیقه ss ثانیه دیگر"
          onFinish={() => alert("صفحه را رفرش کنید")}
        />
      </Typography>
    );
  if (status === 4)
    return (
      <Typography style={{ padding: 10 }}>
        {resultDate ? (
          <Countdown
            value={count(resultDate)}
            format=" دریافت کارنامه تا DD روز HH ساعت mm دقیقه ss ثانیه دیگر"
            onFinish={() => alert("صفحه را رفرش کنید")}
          />
        ) : (
          <>کارنامه آماده نمیباشد،تا پایان زمان آزمون صبر کنید</>
        )}
      </Typography>
    );
  else return <StatusButton status={status} quizId={quizId} />;
};

export default QuizStatusButton;
