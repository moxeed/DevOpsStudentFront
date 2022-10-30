import Page from "src/v2/components/reusable/PageContainer/_page";
import { Payment } from "./Payment/Payment";

const PaymentPage = () => {
  return (
    <div style={{ margin: "auto", display: "block" }}>
      <Page Component={Payment} />
    </div>
  );
};

export default PaymentPage;
