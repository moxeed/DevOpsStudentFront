import { engine } from "./api";

const ApIConfigurationBroadCast = {
  Post: (url, data) =>
    engine(window.config.Broad_BASE).post(url, data, {
      timeout: 3 * 60 * 1000,
    }),
  Get: (url) => engine(window.config.Broad_BASE).get(url),
};

export default ApIConfigurationBroadCast;
