import React from 'react';
import { Product } from '../types/Product';

interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No hay productos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Categoría
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Marca
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Producto
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Características
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Volumen
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Precio
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr 
              key={index} 
              className="hover:bg-pink-50 transition-colors duration-200"
            >
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                  {product.categoria}
                </span>
              </td>
              <td className="px-4 py-3 text-sm font-semibold text-gray-700">
                {product.marca}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                {product.producto}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {product.caracteristicas || '-'}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                {product.volumen}
              </td>
              <td className="px-4 py-3 text-sm font-bold text-rose-600">
                {product.precio}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;