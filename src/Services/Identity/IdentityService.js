import HttpEngine from "../Engines/CoreEngine";
import CoreV2Engine from "../Engines/CoreV2Engine";

const routes = {
  SignUp: "/Identity/LoginByPhone",
  Register: "/Identity/Register",
  SignIn: "/Identity/VerifyPhoneLogin",
  GroupId: "/BasicInfo/Groups",
  GetCourseByGroupId: "BasicInfo/CoursesByGroupId?groupId=",
  ConfirmPhoneNumber: "/Identity/ConfirmPhoneNumber",
  ResendPhoneNumberConfirmCode: "/Identity/ResendPhoneNumberConfirmCode",
  UserRegisterByCounter: "/Identity/UserRegisterByCounter",
  KanoonLogin: "/Identity/KanoonLogin",
  UserRegisterByCounter2: "/Identity/UserRegisterByCounter2",
  ForgetPassSms: "/identity/ChangePasswordRequest",
  ResetPassword: "/identity/ResetPassword?BAT=",
};

const IdentityService = {
  SignUp: (phoneNumber) => {
    return CoreV2Engine.Post(routes.SignUp, { phoneNumber });
  },
  GroupId: () => {
    return HttpEngine.Get(routes.GroupId);
  },
  CourseId: (groupId) => {
    return HttpEngine.Get(routes.GetCourseByGroupId + groupId);
  },
  SignIn: (phoneNumber, token) => {
    return CoreV2Engine.Post(routes.SignIn, {
      phoneNumber,
      token,
    }).then((d) => d.data);
  },
  Register: (form) => {
    return CoreV2Engine.Post(routes.Register, {
      ...form,
      sex: form.sex === "true",
    });
  },
  ConfirmPhoneNumber: ({ phoneNumber, token }) => {
    return CoreV2Engine.Post(routes.ConfirmPhoneNumber, {
      phoneNumber,
      token,
    });
  },
  ResendPhoneNumberConfirmCode: (phoneNumber) => {
    return CoreV2Engine.Post(routes.ResendPhoneNumberConfirmCode, {
      phoneNumber,
    });
  },
  UserRegisterByCounter: (form) => {
    return HttpEngine.Post(routes.UserRegisterByCounter2, form);
  },
  KanoonLogin: (data) => HttpEngine.Post(routes.KanoonLogin, data),
  ForgetPassSms: (UserName) => {
    return HttpEngine.Post(routes.ForgetPassSms, { UserName });
  },
  ResetPassword: (NewPassword, BAT) => {
    return HttpEngine.Post(routes.ResetPassword + BAT, { NewPassword });
  },
};

export default IdentityService;
