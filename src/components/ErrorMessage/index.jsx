import catErrorImage from "../../images/cat-error.jpg";
import "./style.css";

function ErrorMessage({ errorData }) {
  return (
    <div className="error-message">
      <h1>{errorData}</h1>
      <img src={catErrorImage} alt="cat staring" />
    </div>
  );
}

export default ErrorMessage;
