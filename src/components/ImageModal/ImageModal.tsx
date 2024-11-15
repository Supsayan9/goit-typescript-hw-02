import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";
import { useEffect } from "react";

ReactModal.setAppElement("#root");

interface Image {
  urls: {
    regular: string;
  };
  alt_description?: string;
  description?: string;
  user: {
    name: string;
  };
  likes: number;
}

interface ImageModalProps {
  image: Image;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      closeTimeoutMS={200}
    >
      <div>
        <img
          src={image.urls.regular}
          alt={image.alt_description || "Image"}
          className={styles.image}
        />
        <h2>{image.description || "No description"}</h2>
        <p>Автор: {image.user.name}</p>
        <p>Лайки: {image.likes}</p>
        <button onClick={onClose} className={styles.closeBtn}>
          Закрыть
        </button>
      </div>
    </ReactModal>
  );
};

export default ImageModal;
