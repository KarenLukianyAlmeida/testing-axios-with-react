import "./style.css";

type ErrorMessageProps = {
  errorData: string;
};

function ErrorMessage({ errorData }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <h1>{errorData}</h1>
      <img src="/cat-error.jpg" alt="cat staring" />
    </div>
  );
}

export default ErrorMessage;
