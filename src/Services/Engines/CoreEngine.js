import { engine } from "./api";

const HttpEngine = {
  Post: (url, data) =>
    engine(window.config.API_BASE).post(url, data, { timeout: 3 * 60 * 1000 }),
  Get: (url) => engine(window.config.API_BASE).get(url),
};

export default HttpEngine;
