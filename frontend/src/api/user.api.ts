import { appAxios } from "@/config/axios";

export const loginAdmin = (values: any) => {
  return appAxios.post("/admin/login", values);
};

export const registerUser = (values: any) => {
  return appAxios.post(`/user/register`, values);
};

export const loginUser = (values: any) => {
  return appAxios.post(`/user/login`, values);
}

export const getUsers = () => {
  return appAxios.get("/user");
}

export const deleteUserById = (id: number) => {
  return appAxios.delete(`/user/${id}`);
}

export const getUserById = (id: number) => {
  return appAxios.get(`/user/${id}`);
}

export const updateUser = (id: number, values: any) => {
  return appAxios.patch(`/user/${id}`, values);
}