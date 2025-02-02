import { appAxios } from "@/config/axios";

export const getMusic = (id: number) => {
  return appAxios.get(`/music/artist/${id}`);
};

export const deleteMusicById = (id: number) => {
  return appAxios.delete(`/music/${id}`);
};

export const createMusic = (values: any) => {
  return appAxios.post(`/music/create`, values);
};

export const getMusicById = (id: number) => {
  return appAxios.get(`/music/${id}`);
};

export const updateMusic = (id: number, values: any) => {
  return appAxios.patch(`/music/${id}`, values);
};
