import { engine } from "./api";

const HttpsEngine = {
  Post: (url, data) =>
    engine(window.config.API_ORIGINAL).post(url, data, {
      timeout: 3 * 60 * 1000,
    }),
  Get: (url) => engine(window.config.API_ORIGINAL).get(url),
};

export default HttpsEngine;
