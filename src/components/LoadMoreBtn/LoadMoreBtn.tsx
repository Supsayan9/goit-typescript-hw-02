import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.loadMoreBtn}>
      Загрузить еще
    </button>
  );
};

export default LoadMoreBtn;