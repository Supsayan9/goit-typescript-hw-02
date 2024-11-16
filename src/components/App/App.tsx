import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import styles from "../ImageGallery/ImageGallery.module.css";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import LoaderComponent from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchImages } from "../Services/api";
import ImageModal from "../ImageModal/ImageModal";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
  description?: string;
  user: {
    name: string;
  };
  likes: number;
}

interface FetchImagesResponse {
  results: Image[];
  total: number;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    const getImages = async () => {
      if (!query) return;

      setIsLoading(true);
      setError(null);

      try {
        const data: FetchImagesResponse = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(Math.ceil(data.total / 12));
      } catch (err) {
        setError("Error fetching images. Please try again.");
        console.error("Error fetching images:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSearchSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleImageClick = (image: Image) => {
    if (selectedImage?.id !== image.id) {
      setSelectedImage(image);
    }
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      {isLoading && <div className={styles.loader} />}
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.gallery}>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description || "Gallery"}
            onClick={() => handleImageClick(image)}
            className={styles.image}
          />
        ))}
      </div>
      {page < totalPages && !isLoading && !error && (
        <button className={styles.loadMoreBtn} onClick={handleNextPage}>
          Load More
        </button>
      )}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          isOpen={!!selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
