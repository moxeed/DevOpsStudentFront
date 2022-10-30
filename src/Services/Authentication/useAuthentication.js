import { useDispatch } from "react-redux";
import HttpEngine from "../Engines/CoreV2Engine";
import { SetIsAuthecticated } from "../StoreSlices/UserSlice";

const tokenCookieName = "BJTM";
const userInfoCoookieName = "IUO";
const userGroupIdCoookieName = "OGC";

const tokenValidationUrl = "/Identity/Renew";

const GetToken = () => localStorage.getItem(tokenCookieName);
const RemoveToken = () => localStorage.removeItem(tokenCookieName);
const RemoveGroupId = () => localStorage.removeItem(userGroupIdCoookieName);
const RemoveUserId = () => localStorage.removeItem(userInfoCoookieName);
const GetUserId = () => +localStorage.getItem(userInfoCoookieName);
const GetGroupId = () => +localStorage.getItem(userGroupIdCoookieName);

export const useAuthentication = () => {
  const dispatch = useDispatch();

  const SetToken = (token) => {
    localStorage.setItem(tokenCookieName, token);
    dispatch(SetIsAuthecticated(true));
  };
  const SetUserGroupId = (userInfo) => {
    localStorage.setItem(userGroupIdCoookieName, userInfo.groupId);
    localStorage.setItem("nF", userInfo.name + " " + userInfo.lastName);
  };
  const SetUserInfoWithGroupId = (userInfo) => {
    localStorage.setItem(userGroupIdCoookieName, userInfo.groupId);
    localStorage.setItem(userInfoCoookieName, userInfo.bamisUser.id);
    localStorage.setItem(
      "nF",
      userInfo.bamisUser.name + " " + userInfo.bamisUser.lastName
    );
    dispatch(SetIsAuthecticated(true));
  };

  const SetUserInfo = (userInfo) => {
    localStorage.setItem(userInfoCoookieName, userInfo.id);
    dispatch(SetIsAuthecticated(true));
  };

  const ResetToken = () => {
    RemoveToken();
    RemoveGroupId();
    RemoveUserId();
    localStorage.removeItem("nF");
    dispatch(SetIsAuthecticated(false));
  };

  const RefreshToken = () => {
    HttpEngine.Post(tokenValidationUrl).then((res) => {
      dispatch(SetIsAuthecticated(true));
      SetToken(res.data.token);
    }, ResetToken);
  };

  return {
    SetToken,
    GetToken,
    SetUserInfo,
    ResetToken,
    RefreshToken,
    SetUserInfoWithGroupId,
    SetUserGroupId,
  };
};

export { RemoveToken, GetToken, GetUserId, GetGroupId };
