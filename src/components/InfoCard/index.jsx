import "./style.css";

function InfoCard({ imageUrl }) {
  return <img className="cat-picture" src={imageUrl} alt="Cat picture" />;
}

export default InfoCard;
