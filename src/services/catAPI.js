import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY;
const baseURL = "https://api.thecatapi.com";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "x-api-key": api_key,
  },
});

export async function getCatImage() {
  try {
    const response = await api.get("/v1/images/search");
    const catImage = response.data[0].url;
    console.log("URL da imagem da API:", catImage);
    return catImage;
  } catch (error) {
    console.log("Erro ao buscar imagem da API:", error);
    throw error;
  }
}
