import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../../user/pages/auth/LoginPage";
import ResetPasswordPage from "../pages/reset-password/ResetPasswordPage";
import SendResetLinkPage from "../pages/send-reset-link/SendResetLinkPage";
import ConfirmPhoneNumberPage from "../pages/confirmPhoneNumber/ConfirmPhoneNumberPage";
import RegisterPage from "../../user/pages/register/RegisterPage";
import ChangePhoneNumberPage from "../pages/change-phone-number/ChangePhoneNumberPage";

const IdentityRoutes = () => {
  return (
    <Switch>
      <Route path="/v2/identity/register/:phone?" component={RegisterPage} />
      <Route path="/v2/identity/login" component={LoginPage} />
      <Route
        path="/v2/identity/send-reset-link/:user?/:userName?"
        component={SendResetLinkPage}
      />
      <Route
        path="/v2/identity/reset-password/:token?"
        component={ResetPasswordPage}
      />
      <Route
        path="/v2/identity/confirm-phone-number/:id"
        component={ConfirmPhoneNumberPage}
      />
      <Route 
        path="/v2/identity/change-phone-number"
        component={ChangePhoneNumberPage}
      />
    </Switch>
  );
};

export default IdentityRoutes;
