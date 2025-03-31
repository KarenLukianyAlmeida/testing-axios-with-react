import "./style.css";

type InfoCardProps = {
  imageUrl: string;
};

function InfoCard({ imageUrl }: InfoCardProps) {
  return <img className="cat-picture" src={imageUrl} alt="Cat picture" />;
}

export default InfoCard;
