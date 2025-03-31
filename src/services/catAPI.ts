import axios, { AxiosResponse } from "axios";
import { handleApiError } from "../utils/handleApiErrors";

const API_KEY: string = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.thecatapi.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-api-key": API_KEY,
  },
});

type CatImageResponse = {
  url: string;
};

export async function getCatImage(): Promise<string> {
  try {
    const response: AxiosResponse<CatImageResponse[]> = await api.get(
      "/v1/images/search"
    );
    const catImage = response.data[0].url;
    return catImage;
  } catch (error) {
    throw handleApiError(error);
  }
}
