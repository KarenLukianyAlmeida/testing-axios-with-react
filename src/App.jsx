import { Button } from "@mui/material";
import "./App.css";
import InfoCard from "./components/InfoCard";
import { useState } from "react";
import { getCatImage } from "./services/catAPI";

function App() {
  const [infoCat, setInfoCat] = useState("");
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      const imageUrl = await getCatImage();
      setInfoCat(imageUrl);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div>
      {error && error.message === "Nenhuma imagem de gato encontrada!" ? (
        <p>
          Desculpe, não encontramos nenhuma imagem de gato agora. Tente
          novamente!
        </p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        infoCat && <InfoCard imageUrl={infoCat} />
      )}
      <Button sx={{ mt: 1 }} variant="outlined" onClick={handleClick}>
        CLICK ME!
      </Button>
    </div>
  );
}

export default App;
