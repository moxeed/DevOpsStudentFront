import { GetUserId } from "src/Services/Authentication/useAuthentication";
import { GApushData } from "src/v2/components/GAlog/GAlog";
import UUID from "../../../components/storage/ClientId";
import Token from "../../../components/storage/Token";

const BaseUrl = window.config.Identity_BASE;

export const IdentitySendRequest = async (route, body = undefined) => {
  UUID.set();
  const headers = {
    "content-Type": "application/json; charset=utf-8",
    clientid: UUID.get(),
    Authorization: "Bearer " + Token.get(),
  };

  let res = null;
  if (body !== undefined) {
    res = await fetch(BaseUrl + route, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
  } else {
    res = await fetch(BaseUrl + route, {
      method: "GET",
      headers: headers,
    });
  }
  if (res.status < 400) {
    try {
      const text = await res.text();
      const json = JSON.parse(text);
      return json;
    } catch (err) {
      return true;
    }
  }
  if (res.status === 500) {
    GApushData("server error", {
      userId: GetUserId(),
    });
  }
  const error = await res.json();
  throw error;
};
