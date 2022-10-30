import * as React from "react";
import Page from "../../../components/reusable/PageContainer/_page";
import ChangePasswordForm from "./components/ChangePasswordForm/ChangePasswordForm";

const ChangePasswordPage = () => {
  return (
    <div style={{ margin: "auto", display: "block" }}>
      <Page Component={ChangePasswordForm} />
    </div>
  );
};

export default ChangePasswordPage;
