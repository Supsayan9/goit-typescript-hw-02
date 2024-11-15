import styles from "./ImageCard.module.css";

interface Image {
  urls: {
    small: string,
  };
  alt_description: string;
}

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <li className={styles.cardItem}>
      <div className={styles.cardImageContainer}>
        <img
          src={image.urls.small}
          alt={image.alt_description || "Image"}
          onClick={() => onClick(image)}
        />
      </div>
    </li>
  );
};

export default ImageCard;
