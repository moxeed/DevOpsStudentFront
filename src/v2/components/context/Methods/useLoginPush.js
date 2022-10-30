import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthentication } from "src/Services/Authentication/useAuthentication";
import { successToast } from "../../utility/toast";

export const useLoginPush = (connection) => {
  const history = useHistory();
  const { RegisterUser } = useAuthentication();

  useEffect(() => {
    if (connection) {
      connection.on("ResetSucceded", (body) => {
        RegisterUser(body.token);
        history.push("/");
        successToast("ورود شما موفقیت آمیز بود");
      });
    }
  }, [connection]);
};
