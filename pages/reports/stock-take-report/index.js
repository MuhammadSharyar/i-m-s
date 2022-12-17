import React, { useState, useEffect } from "react";
import { db } from "../../../firebase.config";
import { getDocs, collection } from "firebase/firestore";
import XLSX from "xlsx";
import { async } from "@firebase/util";

export default function StockPageReport() {
  const [docs, setDocs] = useState();
  const [csvData, setCsvData] = useState();
  const [csvString, setCsvString] = useState();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
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

  var csv_data = [
    { name: "Ali", age: "19" },
    { name: "Umar", age: "19" },
    { name: "Wahab", age: "19" },
    { name: "Yasir", age: "19" },
  ];

  const exportCsv = async () => {
    // var csvRow = [];
    // var A = [["id", "name", "age"]];

    // for (var i = 0; i < csv_data.length; i++) {
    //   A.push([i, csv_data[i].name, csv_data[i].age]);
    // }
    // for (var i = 0; i < A.length; ++i) {
    //   csvRow.push(A[i].join(","));
    // }
    // var csvString = csvRow.join("%0A");
    var a = document.createElement("a");
    a.href = "data:attachment/csv," + csvString;
    a.target = "_Blank";
    a.download = "StockTakeReport.csv";
    document.body.appendChild(a);
    a.click();
  };

  return (
    <div>
      <button onClick={exportCsv}>Download Pdf</button>
    </div>
  );
}
