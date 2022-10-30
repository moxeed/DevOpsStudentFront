import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IsAuthenticated } from "../../../../Services/StoreSlices/UserSlice";
import Page from "../../../components/reusable/PageContainer/_page";
import RegisterForm from "./component/RegisterForm";
import useHistoryBack from "../../../components/hooks/useHistoryBack";

const RegisterPage = () => {
  const isAuthenticated = useSelector(IsAuthenticated);
  const history = useHistory();
  React.useEffect(() => {
    if (isAuthenticated) {
      useHistoryBack(history);
    }
  }, [isAuthenticated, history]);
  return <Page Component={RegisterForm} />;
};

export default RegisterPage;
