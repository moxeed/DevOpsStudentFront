/* eslint-disable no-undefined */
import { toast } from "react-toastify";

// After every submit if it was OK
export const successToast = (text) => {
  return toast.success(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// After every submit if res is > 400
export const errorToast = (text) => {
  return toast.error(text, {
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// After every submit if front has problem
export const warningToast = (text) => {
  return toast.warning(text, {
    position: "top-right",
    autoClose: 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

// Add other toasts
