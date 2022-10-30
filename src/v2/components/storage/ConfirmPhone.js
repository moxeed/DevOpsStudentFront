const IF_SET = "IFS";
const RECALL_RENEW = "CEXD";

const ConfirmPhone = {
  set: (confirm) => {
    localStorage.setItem(IF_SET, confirm);
    localStorage.setItem(RECALL_RENEW, new Date());
  },
  get: () => {
    return localStorage.getItem(IF_SET) || "";
  },
  remove: () => {
    alert(".");
    localStorage.removeItem(IF_SET);
    localStorage.removeItem(RECALL_RENEW);
  },
  expired: () => {
    const date1 = new Date(localStorage.getItem(RECALL_RENEW));
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 120;
  },
};

export default ConfirmPhone;
