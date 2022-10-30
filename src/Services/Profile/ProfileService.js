import HttpEngine from "../Engines/CoreEngine";
import Examengine from "../Engines/APIConfigurationQuiz";
import BroadCastengine from "../Engines/ApIConfigurationBroadCast";
import { GetUserId } from "../../Services/Authentication/useAuthentication";
const routes = {
  getUserProfile: "identity/GetUserProfile/",
  getTutoringProfile: "Tutoring/MyTutorings/",
  postEditeProfile: "identity/EditProfile/",
  getOrders: "Order/GetOrdersByCustomerId",
  postProfileQuiz: "/Main/api/MyQuiz",
  profileQuizFilters: "/Main/MyQuizFilters",
  profileTutoringFilters: "/Tutoring/TutoringFilters",
  postProfileAttempt: "Tutoring/ProfileAttempt",
};

const Profile = {
  GetOrders: async () => await HttpEngine.Get(routes.getOrders),
  GetUserProfile: async () => {
    const { data } = await HttpEngine.Get(routes.getUserProfile + GetUserId());
    return data;
  },
  PostEditeProfile: ({ Name, LastName, PhoneNumber, Sex, GroupId }) =>
    HttpEngine.Post(routes.postEditeProfile, {
      Name,
      LastName,
      PhoneNumber,
      Sex,
      GroupId,
    }),

  ProfileQuizFilters: async () =>
    await Examengine.Get(routes.profileQuizFilters),
  ProfileTutoringFilters: async () =>
    await BroadCastengine.Get(routes.profileTutoringFilters),
  GetTutoringProfile: async (id) => {
    const { data } = await BroadCastengine.Get(
      routes.getTutoringProfile + GetUserId() + `/${id}`
    );
    return data;
  },
  PostProfileAttempt: ({ tutoringId, status, userId }) =>
    BroadCastengine.Post(routes.postProfileAttempt, {
      tutoringId,
      status,
      userId,
    }),
  PostProfileQuiz: ({ studentId, filterIds }) =>
    Examengine.Post(routes.postProfileQuiz, { studentId, filterIds }),
};

export default Profile;
