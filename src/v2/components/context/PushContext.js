import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState, createContext } from "react";
import UUID from "../storage/ClientId";
import { useLoginPush } from "./Methods/useLoginPush";
import { TicketResponse } from "./Methods/TicketResponse";

const PushContext = createContext(null);
const PushContextProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useLoginPush(connection);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("https://api.bamis.ir/Push?clientId=" + UUID.get(), {
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
    return () => connect?.stop();
  }, []);

  useEffect(() => {
    if (retryCount < 3 && connection) {
      connection
        .start()
        .catch(() => setTimeout(() => setRetryCount(retryCount + 1), 2000));
    }
  }, [connection, retryCount]);

  return (
    <PushContext.Provider value={connection}>
      {children}
      <TicketResponse connection={connection} />
    </PushContext.Provider>
  );
};

export { PushContextProvider, PushContext };
