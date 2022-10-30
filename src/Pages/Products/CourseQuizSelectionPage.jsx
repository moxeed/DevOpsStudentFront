import ClassOnlinePakageService from "../../Services/Product/ClassOnlinePakageService";
import CourseQuizList from "../../Components/CourseQuiz/CourseQuizList";
import QuizSelection from "../../Components/CourseQuiz/QuizSelection";
import React from "react";

const CourseQuizSelectionPage = () => {
  return (
    <>
      <QuizSelection
        getFilters={(filters) =>
          ClassOnlinePakageService.GetFilters("CourseQuiz", filters)
        }
        getData={(filters) =>
          ClassOnlinePakageService.GetProducts("CourseQuiz", filters)
        }
        pageList={CourseQuizList}
      />
    </>
  );
};
export default CourseQuizSelectionPage;
