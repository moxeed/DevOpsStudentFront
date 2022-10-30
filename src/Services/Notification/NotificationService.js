import HttpsEngine from "../Engines/APICore";

const Routes = {
  AddTicket: "/communication/ticket",
};

const NotificationService = {
  AddTicket: (form) => HttpsEngine.Post(Routes.AddTicket, form),
};

export default NotificationService;
