import { GetUserId } from "src/Services/Authentication/useAuthentication";
import { GApushData } from "src/v2/components/GAlog/GAlog";
import Token from "src/v2/components/storage/Token";

export const SendRequest = async (route, body = undefined) => {
  const headers = {
    "content-Type": "application/json; charset=utf-8",
    Authorization: "Bearer " + Token.get(),
  };

  let res = null;
  if (body !== undefined) {
    res = await fetch(route, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
  } else {
    res = await fetch(route, {
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
  if (res.status >= 500) {
    GApushData("server error", {
      userId: GetUserId(),
    });
    window.location.href("/v2/error/503");
  }
  const error = await res.json();
  throw error;
};

export const SendRequestWithNo500 = async (route, body = undefined) => {
  const headers = {
    "content-Type": "application/json; charset=utf-8",
    Authorization: "Bearer " + Token.get(),
  };

  let res = null;
  if (body !== undefined) {
    res = await fetch(route, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
  } else {
    res = await fetch(route, {
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
  if (res.status >= 500) {
    GApushData("server error", {
      userId: GetUserId(),
    });
  }
  const error = await res.json();
  throw error;
};

//

const baseUrl = window.config.Front_Panel;

const APIPanelPost = async (url, body = {}) =>
  SendRequestWithNo500(baseUrl + url, body).catch(console.log);

const APIPanelGet = async (url) =>
  SendRequestWithNo500(baseUrl + url).catch(console.log);

export { APIPanelPost, APIPanelGet };
