import Dropdown from "../../Dropdown/Dropdown";
import styles from "./style.module.css";
import { useState } from "react";
import { db } from "../../../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { SuccessSnackbar } from "../../Snackbar/Snackbar";

export default function AddProduct(props) {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(0);
  const [stock, setStock] = useState(0);
  const [perishable, setPerishable] = useState("Perishable");
  const [consumable, setConsumable] = useState("Consumable");
  const [serviceable, setServiceable] = useState("Serviceable");
  const [showSnack, setShowSnack] = useState(false);
  const storage = getStorage();

  const handlePickImage = async (e) => {
    var filename = e.target.value.replace(/^.*[\\\/]/, "");
    console.log(`Image: ${filename}`);
    const imageRef = ref(storage, `product-images/${filename}`);
    await uploadBytes(imageRef, e.target.files[0]);
    setImageUrl(await getDownloadURL(imageRef));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const dbRef = collection(db, "products");
    const newDoc = await addDoc(dbRef, {
      imageUrl,
      title,
      cost,
      stock,
      perishable,
      consumable,
      serviceable,
    });
    setShowSnack(true);
    setImageUrl("");
    setTitle("");
    setCost(0);
    setStock(0);
    console.log(`DOC: ${newDoc.id}`);
  };

  return (
    <div className={styles.modalWrapper}>
      <SuccessSnackbar
        showSnack={showSnack}
        setShowSnack={setShowSnack}
        message={"Product added successfully"}
      />
      <div className={styles.modalContainer}>
        <form className={styles.formContainer}>
          <h3 className={styles.formHeader}>Add Product</h3>
          <div className={styles.formInputContainer}>
            <label className={styles.inputLabel}>Image Path</label>
            {/* <input
              className={styles.formInput}
              placeholder="Image URL"
              type={"url"}
              value={imageUrl}
              required
              onChange={(e) => setImageUrl(e.target.value)}
            /> */}
            <input
              className={styles.formInput}
              placeholder="Pick Image"
              type={"file"}
              required
              onChange={handlePickImage}
            />
          </div>
          <div className={styles.formInputContainer}>
            <label className={styles.inputLabel}>Name</label>
            <input
              className={styles.formInput}
              type={"text"}
              placeholder="Product Name"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.formInputContainer}>
            <label className={styles.inputLabel}>Cost</label>
            <input
              className={styles.formInput}
              type={"number"}
              placeholder="Product Cost"
              required
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <div className={styles.formInputContainer}>
            <label className={styles.inputLabel}>Stock</label>
            <input
              className={styles.formInput}
              type={"number"}
              placeholder="Product Stock"
              required
              value={stock}
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
          <input
            className={styles.formBtn}
            type={"submit"}
            value="Add Product"
            onClick={addProduct}
          />
        </form>
      </div>
    </div>
  );
}
