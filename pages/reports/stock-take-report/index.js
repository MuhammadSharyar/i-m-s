import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { db } from "../../../firebase.config";
import { getDocs, collection } from "firebase/firestore";
import { scopedCssBaselineClasses } from "@mui/material";

export default function StockPageReport() {
  const [docs, setDocs] = useState();
  const [tempDocs, setTempDocs] = useState();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    const dbRef = collection(db, "products");
    getDocs(dbRef).then((query) => {
      setDocs(query.docs);
      setTempDocs(query.docs);
    });
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.setFont("Helvertica", "normal", 0.5);
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
  };
  return (
    <div>
      <button onClick={generatePdf}>Download Pdf</button>
    </div>
  );
}
