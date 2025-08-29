import XLSX from "xlsx";
import fs from "fs";
import path from "path";

interface Product {
  categoria: string;
  marca: string;
  producto: string;
  caracteristicas: string;
  volumen: string;
  precio: string;
}

// __dirname apunta al archivo JS compilado, así que ajustamos la ruta al Excel
const excelPath = path.resolve(__dirname, "../scripts/productos_belleza.xlsx");
const jsonPath = path.resolve(__dirname, "../src/data/productos.json");

function excelToJson(filePath: string): Product[] {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  return data.map((row) => ({
    categoria: String(row["Categoría"] || "").trim(),
    marca: String(row["Marca"] || "").trim(),
    producto: String(row["Producto"] || "").trim(),
    caracteristicas: String(row["Características"] || "").trim(),
    volumen: String(row["Volumen"] || "").trim(),
    precio: String(row["Precio"] || "").trim(),
  }));
}

const products = excelToJson(excelPath);
fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), "utf-8");

console.log("✅ Conversión completada. Archivo src/data/productos.json generado.");
