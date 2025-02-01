import { appAxios } from "@/config/axios";

export const getArtists = () => {
  return appAxios.get("/artist");
};

export const registerArtist = (values: any) => {
  return appAxios.post(`/artist/register`, values);
};

export const deleteArtistById = (id: number) => {
  return appAxios.delete(`/artist/${id}`);
}

export const getArtistById = (id: number) => {
  return appAxios.get(`/artist/${id}`);
}

export const updateArtist = (id: number, values: any) => {
  return appAxios.patch(`/artist/${id}`, values);
}