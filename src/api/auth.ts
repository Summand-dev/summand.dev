import { api } from "./api";

export async function getCaptcha() {
  const response = await api.post("auth/captcha", {
    id: 1,
  });
  if (response.status === 200 && response.data.status == "success") {
    return response.data;
  }
}

export async function getToken(
  username: string,
  password: string,
  captcha: string,
  captcha_id: string
) {
  var bodyFormData = new FormData();
  bodyFormData.append("client_id", process.env.NEXT_PUBLIC_CLIENT_ID);
  bodyFormData.append("client_secret", process.env.NEXT_PUBLIC_CLIENT_SECRET);
  bodyFormData.append("username", username);
  bodyFormData.append("password", password);
  bodyFormData.append("scope", "*");
  bodyFormData.append("captcha_id", captcha_id);
  bodyFormData.append("captcha", captcha);
  const response = await api.post("auth/token", bodyFormData);
  if (response.status === 200 && response.data.status == "success") {
    return response.data;
  }
}
