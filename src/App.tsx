import { Button } from "@mui/material";
import "./App.css";
import InfoCard from "./components/InfoCard";
import { useEffect, useState } from "react";
import { getCatImage } from "./services/catAPI";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [infoCat, setInfoCat] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getInitialData = async () => {
      try {
        const catImage = await getCatImage();
        setInfoCat(catImage);
      } catch (err) {
        setError(err as string);
      } finally {
        setLoading(false);
      }
    };

    getInitialData();
  }, []);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const imageUrl = await getCatImage();
      setInfoCat(imageUrl);
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
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
