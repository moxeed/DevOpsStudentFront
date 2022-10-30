const TOKEN_KEY = "BJTM";
const RECALL_RENEW = "EXD";
const USER_NORMAL_ID = "USNMLIDS";


const Token = {
  set: (token) => {
    localStorage.setItem(TOKEN_KEY, token.value);
    localStorage.setItem(USER_NORMAL_ID, token.userNormalId);
    localStorage.setItem(RECALL_RENEW, new Date());
  },
  get: () => {
    return localStorage.getItem(TOKEN_KEY) || "";
  },
  getUNI: () => {
    return localStorage.getItem(USER_NORMAL_ID) || "";
  },
  remove: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_NORMAL_ID);
  },
  expired: () => {
    const date1 = new Date(localStorage.getItem(RECALL_RENEW));
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 7;
  },
};

export default Token;
