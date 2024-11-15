import { ThreeDots } from "react-loader-spinner";
import styles from "./Loader.module.css";

const LoaderComponent: React.FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <ThreeDots color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default LoaderComponent;
