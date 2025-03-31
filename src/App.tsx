import { Button } from "@mui/material";
import "./App.css";
import InfoCard from "./components/InfoCard";
import { useState } from "react";
import { getCatImage } from "./services/catAPI";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [infoCat, setInfoCat] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      const imageUrl = await getCatImage();
      setInfoCat(imageUrl);
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <div>
      {error ? (
        <ErrorMessage errorData={error} />
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
