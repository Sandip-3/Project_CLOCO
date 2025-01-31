import { appAxios } from "@/config/axios";

export const loginAdmin = (values: any) => {
  return appAxios.post("/admin/login", values);
};