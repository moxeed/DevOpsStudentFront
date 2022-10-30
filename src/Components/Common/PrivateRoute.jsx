import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import {
  HideLoading,
  ShowLoading,
} from "../../Services/StoreSlices/LoadingSlice";
import { IsAuthenticated } from "../../Services/StoreSlices/UserSlice";
export const PrivateRoute = ({ component, path }) => {
  const isAuthenticated = useSelector(IsAuthenticated);
  const history = useHistory();
  const dispath = useDispatch();

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/v2/Identity/login");
    }
    if (isAuthenticated === undefined) dispath(ShowLoading());
    else dispath(HideLoading());
  }, [isAuthenticated, history, dispath]);

  return isAuthenticated === true ? (
    <Route path={path} component={component} />
  ) : null;
};
