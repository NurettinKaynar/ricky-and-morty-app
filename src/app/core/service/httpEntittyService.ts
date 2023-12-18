import axios from "axios";
import { ApiService } from "../utils/ApiUrl";

export const get = (apiUrl: string) => {
  return axios.get(ApiService.BASE_URL + apiUrl);
};
