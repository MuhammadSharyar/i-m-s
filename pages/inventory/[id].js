import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import styles from "./details.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { SuccessSnackbar } from "../../components/Snackbar/Snackbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ProductDetails(props) {
  const router = useRouter();
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(0);
  const [stock, setStock] = useState(0);
  const [perishable, setPerishable] = useState("Perishable");
  const [consumable, setConsumable] = useState("Consumable");
  const [serviceable, setServiceable] = useState("Serviceable");
  const [showSnack, setShowSnack] = useState(false);

  const getProduct = async () => {
    const docRef = doc(db, "products", router.query.id);
    await getDoc(docRef).then((query) => {
      try {
        setImageUrl(query.data().imageUrl);
        setTitle(query.data().title);
        setCost(query.data().cost);
        setStock(query.data().stock);
        setPerishable(query.data().perishable);
        setConsumable(query.data().consumable);
        setServiceable(query.data().serviceable);
      } catch (e) {}
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "products", router.query.id);
    await updateDoc(docRef, {
      imageUrl,
      title,
      cost,
      stock,
      perishable,
      consumable,
      serviceable,
    }).then(() => setShowSnack(true));
    getProduct();
  };

  const deleteProduct = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "products", router.query.id);
    await deleteDoc(docRef).then(() => router.push("/inventory"));
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (user === null) {
    router.push("/login");
  } else {
    return (
      <div className={styles.productContainer}>
        <SuccessSnackbar
          showSnack={showSnack}
          setShowSnack={setShowSnack}
          message={"Product updated successfully"}
        />
        <img className={styles.productImage} src={imageUrl} />
        <div className={styles.formWrapper}>
          <form className={styles.formContainer} onSubmit={updateProduct}>
            <div className={styles.formInputContainer}>
              <label className={styles.inputLabel}>Name</label>
              <input
                className={styles.formInput}
                type={"text"}
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.formInputContainer}>
              <label className={styles.inputLabel}>Cost Rs.</label>
              <input
                className={styles.formInput}
                type={"number"}
                value={cost}
                required
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
            <div className={styles.formInputContainer}>
              <label className={styles.inputLabel}>Stock</label>
              <input
                className={styles.formInput}
                type={"number"}
                value={stock}
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <Dropdown
              value={perishable}
              onChange={(e) => setPerishable(e.target.value)}
              options={["Perishable", "Non-perishable"]}
            />
            <Dropdown
              value={consumable}
              onChange={(e) => setConsumable(e.target.value)}
              options={["Consumable", "Non-consumable"]}
            />
            <Dropdown
              value={serviceable}
              onChange={(e) => setServiceable(e.target.value)}
              options={["Serviceable", "Non-serviceable"]}
            />
            <div className={styles.submitContainer}>
              <input
                className={styles.formBtn}
                type={"submit"}
                value="Update Product"
              />
              <FontAwesomeIcon
                icon={faTrash}
                className={styles.trashIcon}
                onClick={deleteProduct}
                cursor={"pointer"}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
