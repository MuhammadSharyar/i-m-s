import styles from "./style.module.css";
import { useRouter } from "next/router";

export default function ProductCard(props) {
  const router = useRouter();

  return (
    <div
      className={styles.cardContainer}
      key={props.key}
      onClick={() => router.push(`/inventory/${props.id}`)}
    >
      <div className={styles.imageContainer}>
        <img src={props.imgSrc} className={styles.productImage} />
      </div>
      <p className={styles.productTitle}>{props.title}</p>
    </div>
  );
}
