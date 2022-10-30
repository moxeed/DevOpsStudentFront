import { toast } from "react-toastify";

export const FillFieldsError = () =>
  toast.error("تمام فیلد ها را پر کنید", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  export const WrongToken = () =>
  toast.error("توکن تعویض رمز شما منقضی شده است", {
    position: "top-center",
    autoClose: 80000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const WrongAuthInputs = () =>
  toast.error("نام کاربری یا رمز صحیح نیست", {
    position: "top-center",
    autoClose: 80000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const SuccessfullLogin = () =>
  toast.success("شما با موفقیت وارد شدید", {
    position: "top-center",
    autoClose: 10000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
