const USER_KEY = "OWN";
const GROUPID_KEY = "OGC";
const USERID_KEY = "IUO";

const UserInfo = {
  set: (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(GROUPID_KEY, user.groupId);
    localStorage.setItem(USERID_KEY, user.userId);
  },
  get: () => {
    const data = localStorage.getItem(USER_KEY);
    return JSON.parse(data);
  },
  get_userid: () => {
    const data = localStorage.getItem(USER_KEY);
    if (data) {
      return +JSON.parse(data)?.userId;
    } else return null;
  },
  get_name: () => {
    const data = localStorage.getItem(USER_KEY);
    if (data) {
      return JSON.parse(data)?.fullName;
    } else return "ثبت نشده";
  },
  get_groupid: () => {
    const data = localStorage.getItem(USER_KEY);
    if (data) {
      return +JSON.parse(data)?.groupId;
    } else return 1;
  },
  remove: () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(GROUPID_KEY);
  },
};

export default UserInfo;
