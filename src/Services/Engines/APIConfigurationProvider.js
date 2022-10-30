import { engine } from "./api";

const APIConfigurationProvider = {
  Post: (url, data) =>
    engine(window.config.Provider_BASE).post(url, data, {
      timeout: 3 * 60 * 1000,
    }),
  Get: (url) => engine(window.config.Provider_BASE).get(url),
};

export default APIConfigurationProvider;
