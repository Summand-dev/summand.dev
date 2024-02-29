import { api } from "./api";

export async function getDashboard() {
  const response = await api.get("users/dashboard");
  if (response.status === 200 && response.data.status == "success") {
    return response.data.dashboard || [];
  }
}

export async function getUsers() {
  const response = await api.get("users");
  if (response.status === 200 && response.data.status == "success") {
    return response.data.users || [];
  }
}

export async function createUser(
  username: string,
  password: string,
  passwordConfirm: string,
  name: string,
  principals: [],
  cameras: []
) {
  const response = await api.post("users", {
    username: username,
    password: password,
    passwordConfirm: passwordConfirm,
    name: name,
    principals: principals,
    cameras: cameras,
  });
  if (
    response &&
    response.status === 200 &&
    response.data.status == "success"
  ) {
    return response.data.user || {};
  }
}

export async function updateUser(
  userId: string,
  username: string,
  password: string,
  passwordConfirm: string,
  name: string,
  principals: [],
  cameras: [],
  status: number | null = null
) {
  const response = await api.put("users/" + userId, {
    username: username,
    password: password,
    passwordConfirm: passwordConfirm,
    name: name,
    principals: principals,
    cameras: cameras,
    status: status,
  });
  if (response.status === 200 && response.data.status == "success") {
    return response.data.user || {};
  }
}

export async function deleteUser(userId: string) {
  const response = await api.delete("users/" + userId);
  if (response.status === 200 && response.data.status == "success") {
    return response.data.user || {};
  }
}
