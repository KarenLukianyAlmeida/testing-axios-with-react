import { Button } from "@mui/material";
import "./App.css";
import InfoCard from "./components/InfoCard";
import { useState } from "react";
import { getCatImage } from "./services/catAPI";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [infoCat, setInfoCat] = useState("");
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      const imageUrl = await getCatImage();
      setInfoCat(imageUrl);
    } catch (error) {
      setError(error);
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
