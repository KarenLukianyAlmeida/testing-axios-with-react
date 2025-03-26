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
      console.log(infoCat);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return (
    <div>
      {error ? (
        <div>Erro ao carregar imagem: {error.message}</div>
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
