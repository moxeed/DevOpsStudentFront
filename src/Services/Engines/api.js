import axios from "axios";
import { toast } from "react-toastify";
import { GApushData } from "src/v2/components/GAlog/GAlog";
import {
  GetToken,
  GetUserId,
  RemoveToken,
} from "../Authentication/useAuthentication";

export const engine = (url) => {
  const main = axios.create({
    baseURL: url,
  });

  main.interceptors.request.use((config) => {
    const token = GetToken();
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    return config;
  });

  main.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if (error.request.status === 401) {
        RemoveToken();
        return Promise.Reject();
      }
      if (error.request?.status === 400 && error.response.data?.errors) {
        toast.error(error.response.data.errors[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return Promise.reject(error.response);
      }
      if (error.request?.status === 404) {
        return Promise.reject(error.response);
      }
      toast.info("خطا در ارتباط با سرور، مجدد امتحان کنید.", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.href("/v2/error/503");
      GApushData("server error", {
        userId: GetUserId(),
      });
      return 500;
    }
  );
  return main;
};
