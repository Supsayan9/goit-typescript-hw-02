import styles from "./ImageGallery.module.css";

interface Image {
  id: string;
  urls: {
    small: string,
  };
  alt_description?: string;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <div className={styles.galleryWrapper}>
      <ul className={styles.imageGrid}>
        {images.map((image) => (
          <li
            key={image.id}
            className={styles.gridItem}
            onClick={() => onImageClick(image)}
          >
            <img
              src={image.urls.small}
              alt={image.alt_description || "Image"}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
