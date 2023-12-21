import axios from "axios";
import { ApiService } from "../utils/ApiUrl";

export const get = (apiUrl: string) => {
  return axios.get(ApiService.BASE_URL + apiUrl);
};
export const getByParams = (apiUrl: string, params: object) => {
  return axios.get(ApiService.BASE_URL + apiUrl, {
    params: params,
  });
};

export const getById = (apiURL: string, id: string) => {
  return axios.get(ApiService.BASE_URL + apiURL + "/" + id);
};
