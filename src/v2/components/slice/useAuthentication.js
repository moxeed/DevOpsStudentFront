import { useDispatch } from "react-redux";
import {
  SetIsAuthecticated,
  SetName,
} from "../../../Services/StoreSlices/UserSlice";
import { AuthService } from "src/v2/user/service/authService";
import Token from "../storage/Token";
import UserInfo from "../storage/UserInfo";

export const useAuthentication = () => {
  const dispatch = useDispatch();

  const RegisterUser = (body) => {
    dispatch(SetIsAuthecticated(true));
    if (body.value) Token.set(body);
  };

  const SetUserName = (name) => {
    dispatch(SetName(name));
  };

  const LogoutUser = () => {
    Token.remove();
    UserInfo.remove();
    dispatch(SetIsAuthecticated(false));
  };

  const CheckExpiration = () => {
    if (Token.get()) {
      if (Token.expired()) {
        AuthService.renew().then((res) => {
          dispatch(SetIsAuthecticated(true));
          Token.set(res.data.token);
        }, Token.remove);
      } else {
        dispatch(SetIsAuthecticated(true));
      }
    }
  };

  return {
    SetUserName,
    RegisterUser,
    LogoutUser,
    CheckExpiration,
  };
};
