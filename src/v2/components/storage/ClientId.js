import { v4 as uuidv4 } from "uuid";

const UUID_KEY = "WCLS";

const UUID = {
  set: () => {
    if (localStorage.getItem(UUID_KEY) === null) {
      localStorage.setItem(UUID_KEY, uuidv4());
    }
  },
  get: () => {
    let currentId = localStorage.getItem(UUID_KEY);
    if (currentId === null) {
      currentId = uuidv4();
      localStorage.setItem(UUID_KEY, currentId);
    }
    return currentId;
  },
};

export default UUID;
