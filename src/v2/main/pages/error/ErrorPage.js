import * as React from "react";
import Page from "src/v2/components/reusable/PageContainer/_page";
import ErrorContent from "./components/ErrorContent";

const ErrorPage = () => {
  return (
    <div style={{ margin: "auto", display: "block" }}>
      <Page Component={ErrorContent} />
    </div>
  );
};

export default ErrorPage;
