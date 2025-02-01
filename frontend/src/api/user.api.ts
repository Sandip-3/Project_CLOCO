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