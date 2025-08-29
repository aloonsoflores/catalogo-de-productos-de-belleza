import React, { useRef } from 'react';
import { Upload, Download, FileSpreadsheet } from 'lucide-react';
import { readExcelFile, downloadSampleExcel } from '../utils/excelReader';
import { Product } from '../types/Product';
import toast from 'react-hot-toast';

interface FileUploaderProps {
  onDataLoad: (products: Product[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onDataLoad }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ];
    
    if (!validTypes.includes(file.type)) {
      toast.error('Por favor, selecciona un archivo Excel (.xlsx) o CSV (.csv)');
      return;
    }

    try {
      toast.promise(
        async () => {
          const products = await readExcelFile(file);
          
          if (products.length === 0) {
            return;
          }
          
          onDataLoad(products);
        },
        {
          loading: 'Cargando productos...',
          success: 'Productos cargados exitosamente',
          error: 'El archivo no contiene productos válidos',
        }
      );
      
      // Limpiar el input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      toast.error('Error al cargar el archivo. Verifica el formato.');
    }
  };

  const handleDownloadSample = () => {
    try {
      downloadSampleExcel();
      toast.success('Archivo de ejemplo descargado');
    } catch (error) {
      toast.error('Error al descargar el archivo de ejemplo');
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-lg shadow-md mb-6 border border-pink-100">
      <div className="text-center">
        <FileSpreadsheet className="mx-auto h-12 w-12 text-pink-600 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Cargar Catálogo de Productos
        </h3>
        <p className="text-gray-600 mb-6">
          Sube un archivo Excel (.xlsx) o CSV con tus productos de belleza
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
            >
              <Upload className="mr-2 h-5 w-5" />
              Seleccionar Archivo
            </label>
          </div>
          
          <button
            onClick={handleDownloadSample}
            className="inline-flex items-center px-6 py-3 bg-white text-pink-600 font-medium rounded-lg border-2 border-pink-500 hover:bg-pink-50 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Descargar Ejemplo
          </button>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>
            <strong>Formato esperado:</strong> Categoría | Marca | Producto | Características | Volumen | Precio
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;