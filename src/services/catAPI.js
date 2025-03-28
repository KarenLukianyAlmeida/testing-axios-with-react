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
    return catImage;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Nenhuma imagem de gato encontrada!");
      } else if (error.response?.status) {
        throw new Error(
          `Erro ao buscar imagem de gato: Status ${error.response.status}`
        );
      } else if (error.request) {
        throw new Error(
          "Erro ao buscar imagem de gato: Sem resposta do servidor"
        );
      } else {
        throw new Error(`Erro ao buscar imagem de gato: ${error.message}`);
      }
    } else {
      throw new Error("Erro inesperado ao buscar imagem de gato");
    }
  }
}
