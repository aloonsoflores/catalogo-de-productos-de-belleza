"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// __dirname apunta al archivo JS compilado, así que ajustamos la ruta al Excel
const excelPath = path_1.default.resolve(__dirname, "../scripts/productos_belleza.xlsx");
const jsonPath = path_1.default.resolve(__dirname, "../src/data/productos.json");
function excelToJson(filePath) {
    const workbook = xlsx_1.default.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx_1.default.utils.sheet_to_json(sheet, { defval: "" });
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
fs_1.default.writeFileSync(jsonPath, JSON.stringify(products, null, 2), "utf-8");
console.log("✅ Conversión completada. Archivo src/data/productos.json generado.");
