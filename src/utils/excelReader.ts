import * as XLSX from 'xlsx';
import { Product } from '../types/Product';

export const readExcelFile = (file: File): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convertir a JSON con headers específicos
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
        
        // Saltar la primera fila (headers) y convertir a objetos Product
        const products: Product[] = jsonData.slice(1).map((row) => ({
          categoria: row[0] || '',
          marca: row[1] || '',
          producto: row[2] || '',
          caracteristicas: row[3] || '',
          volumen: row[4] || '',
          precio: row[5] || ''
        })).filter(product => product.categoria && product.marca && product.producto);
        
        resolve(products);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Error leyendo el archivo'));
    reader.readAsBinaryString(file);
  });
};

export const downloadSampleExcel = () => {
  const sampleData = [
    ['Categoría', 'Marca', 'Producto', 'Características', 'Volumen', 'Precio'],
    ['CREMAS', '3INA', 'THE SORBET FACE CREAM', 'Crema Hidratación', '50ml', '20€'],
    ['CREMAS', 'Biotherm', 'AQUASOURCE HYDRA BARRIER CREAM', '', '50ml', '32€'],
    ['MASCARILLA', 'Origins', 'CLEAR IMPROVEMENT MASK', 'Purificante', '75ml', '28€'],
    ['OTROS', 'MAC', 'LIPSTICK RUBY WOO', 'Labial Mate', '3g', '25€']
  ];
  
  const ws = XLSX.utils.aoa_to_sheet(sampleData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Productos');
  XLSX.writeFile(wb, 'productos_belleza_ejemplo.xlsx');
};