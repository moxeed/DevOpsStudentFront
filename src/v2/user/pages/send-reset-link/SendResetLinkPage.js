import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IsAuthenticated } from "src/v2/../Services/StoreSlices/UserSlice";
import Page from "src/v2/components/reusable/PageContainer/_page";
import ResetPasswordForm from "./components/ResetPasswordForm/ResetPasswordForm";
import useHistoryBack from "src/v2/components/hooks/useHistoryBack";


const SendResetLinkPage = () => {
  const history = useHistory();

  const isAuthenticated = useSelector(IsAuthenticated);
  React.useEffect(() => {
    if (isAuthenticated) {
      useHistoryBack(history);
    }
  }, [isAuthenticated, history]);

  return <Page Component={ResetPasswordForm} />;
};

export default SendResetLinkPage;
