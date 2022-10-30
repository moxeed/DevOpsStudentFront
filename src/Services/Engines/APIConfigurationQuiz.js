import { engine } from "./api";

const QuizEngine = {
  Post: (url, data) =>
    engine(window.config.EXAM_BASE).post(url, data, { timeout: 3 * 60 * 1000 }),
  Get: (url) => engine(window.config.EXAM_BASE).get(url),
};

export default QuizEngine;
