import styles from "./style.module.css";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard/ProductCard";
import "reactjs-popup/dist/index.css";
import AddProduct from "../../components/Modals/AddProduct/AddProduct";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { getDocs, collection } from "firebase/firestore";
import ListProductCard from "../../components/ListProductCard/ListProductCard";

export default function Inventory() {
  const { user } = useAuth();
  const router = useRouter();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [docs, setDocs] = useState();
  const [tempDocs, setTempDocs] = useState();
  const [reportDocs, setReportDocs] = useState();
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState("Reports");
  const [selectedView, setSelectedView] = useState("Grid");

  const getProducts = () => {
    const dbRef = collection(db, "products");
    getDocs(dbRef).then((query) => {
      setDocs(query.docs);
      setTempDocs(query.docs);
    });
  };

  const searchProducts = (e) => {
    var searchedProducts = docs.filter((product) =>
      product._document.data.value.mapValue.fields.title.stringValue
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setTempDocs(searchedProducts);
  };

  const getStockTakeReport = async () => {
    var csvRow = [];
    var A = [["Id", "Name", "Cost", "Stock"]];

    const dbRef = collection(db, "products");
    await getDocs(dbRef).then(async (query) => {
      query.docs.map((doc, index) => {
        const data = doc._document.data.value.mapValue.fields;
        A.push([
          index,
          data.title.stringValue,
          data.cost.stringValue,
          data.stock.stringValue,
        ]);
      });
      for (var i = 0; i < A.length; ++i) {
        csvRow.push(A[i].join(","));
      }
      var csvString = csvRow.join("%0A");
      var a = document.createElement("a");
      a.href = "data:attachment/csv," + csvString;
      a.target = "_Blank";
      a.download = "StockTakeReport.csv";
      document.body.appendChild(a);
      a.click();
    });
  };

  const getPurchaseItemReport = async () => {
    var csvRow = [];
    var A = [["Id", "Name", "Cost", "Stock"]];

    const dbRef = collection(db, "products");
    await getDocs(dbRef).then(async (query) => {
      query.docs.map((doc, index) => {
        const data = doc._document.data.value.mapValue.fields;
        if (parseInt(data.stock.stringValue) < 50) {
          A.push([
            index,
            data.title.stringValue,
            data.cost.stringValue,
            data.stock.stringValue,
          ]);
        }
      });
      for (var i = 0; i < A.length; ++i) {
        csvRow.push(A[i].join(","));
      }
      var csvString = csvRow.join("%0A");
      var a = document.createElement("a");
      a.href = "data:attachment/csv," + csvString;
      a.target = "_Blank";
      a.download = "PurchaseItemReport.csv";
      document.body.appendChild(a);
      a.click();
    });
  };

  useEffect(() => {
    if (localStorage.getItem("selectedView") == null) {
      localStorage.setItem("selectedView", "Grid");
      setSelectedView("Grid");
    } else {
      setSelectedView(localStorage.getItem("selectedView"));
    }
    getProducts();
  }, [selectedView]);

  if (user === null) {
    router.push("/login");
  } else {
    return (
      <div>
        <div className={styles.container1}>
          <select
            required
            className={styles.dropdownContainer}
            value={selectedView}
            onChange={(e) => {
              localStorage.setItem("selectedView", e.target.value);
              setSelectedView(e.target.value);
            }}
          >
            <option value={"List"}>List</option>
            <option value={"Grid"}>Grid</option>
          </select>
          <div className={styles.searchContainer}>
            <input
              className={styles.searchField}
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                searchProducts();
                if (e.target.value === "") {
                  setTempDocs(docs);
                }
              }}
            />
            <button className={styles.searchBtn} onClick={searchProducts}>
              Search
            </button>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={() => setShowAddProductModal(true)}>
              Add Product
            </button>
            <select
              required
              className={styles.dropdownContainer}
              value={selectedReport}
              onChange={(e) => {
                setSelectedReport(e.target.value);
                if (e.target.value == "Stock Take Report") {
                  getStockTakeReport();
                } else if (e.target.value == "Purchase Item Report") {
                  getPurchaseItemReport();
                }
              }}
            >
              <option value={"Reports"}>Reports</option>
              <option value={"Purchase Item Report"}>
                Purchase Item Report
              </option>
              <option value={"Price Comparison Report"}>
                Price Comparison Report
              </option>
              <option value={"Stock Take Report"}>Stock Take Report</option>
            </select>
          </div>
        </div>
        {showAddProductModal ? (
          <div>
            <div className={styles.closeBtnContainer}>
              <button
                className={styles.closeBtn}
                onClick={() => setShowAddProductModal(false)}
              >
                x
              </button>
            </div>
            <AddProduct />
          </div>
        ) : null}
        <div
          className={
            selectedView == "Grid" ? styles.productContainer : styles.listView
          }
        >
          {tempDocs === undefined ? (
            <div className={styles.loadingContainer}>
              <p className={styles.loader}>Loading ...</p>
            </div>
          ) : (
            tempDocs.map((doc, index) => {
              const data = doc._document.data.value.mapValue.fields;
              return selectedView == "Grid" ? (
                <ProductCard
                  imgSrc={data.imageUrl.stringValue}
                  title={data.title.stringValue}
                  data={data}
                  id={doc.id}
                  key={index}
                />
              ) : (
                <ListProductCard
                  imgSrc={data.imageUrl.stringValue}
                  title={data.title.stringValue}
                  data={data}
                  id={doc.id}
                  key={index}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
}
