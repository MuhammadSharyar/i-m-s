import styles from "./style.module.css";
import { useRouter } from "next/router";

export default function ListProductCard(props) {
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
      <div className={styles.productCost}>
        <p className={styles.heading}>Cost: </p>
        <p>{props.data.cost.stringValue}</p>
      </div>
      <div className={styles.productStock}>
        <p className={styles.heading}>Stock: </p>
        <p>{props.data.stock.stringValue}</p>
      </div>
      <p className={styles.productOption}>
        {props.data.perishable.stringValue}
      </p>
      <p className={styles.productOption}>
        {props.data.consumable.stringValue}
      </p>
      <p className={styles.productOption}>
        {props.data.serviceable.stringValue}
      </p>
    </div>
  );
}
