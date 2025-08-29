import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Sparkles, Package } from 'lucide-react';
import { Product } from './types/Product';
import { useProductFilters } from './hooks/useProductFilters';
import { sampleProducts } from './data/sampleProducts';
import FileUploader from './components/FileUploader';
import FilterControls from './components/FilterControls';
import ProductTable from './components/ProductTable';
import InfoBanner from './components/InfoBanner';

function App() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const { filters, setFilters, categories, brands, filteredProducts } = useProductFilters(products);

  const handleDataLoad = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-pink-500 to-rose-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Sparkles className="h-10 w-10 text-pink-500" />
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-rose-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Beauty Catalog
                </h1>
                <p className="text-gray-600 text-sm font-medium">
                  Catálogo de Productos de Belleza
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Información importante */}
        <InfoBanner />

        {/* Carga de archivos */}
        {/* <FileUploader onDataLoad={handleDataLoad} /> */}

        {/* Estadísticas */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="relative md:flex items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Package className="h-6 w-6 text-pink-500" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Productos en el catálogo
                </h2>
                <p className="text-sm text-gray-600">
                  Total: {products.length} productos | Mostrando: {filteredProducts.length}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-pink-50 px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold text-pink-600">{categories.length}</div>
                <div className="text-xs text-gray-600">Categorías</div>
              </div>
              <div className="bg-rose-50 px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold text-rose-600">{brands.length}</div>
                <div className="text-xs text-gray-600">Marcas</div>
              </div>
              <div className="bg-purple-50 px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{filteredProducts.length}</div>
                <div className="text-xs text-gray-600">Filtrados</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controles de filtro */}
        <FilterControls
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
          brands={brands}
        />

        {/* Tabla de productos */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Catálogo de Productos
            </h2>
            <p className="text-gray-600 text-sm">
              {filteredProducts.length === 0 
                ? 'No se encontraron productos con los filtros aplicados'
                : `Mostrando ${filteredProducts.length} de ${products.length} productos`
              }
            </p>
          </div>
          <ProductTable products={filteredProducts} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-pink-400" />
              <span className="text-lg font-semibold">Beauty Catalog</span>
            </div>
            <p className="text-gray-400 text-sm">
              Sistema de catálogo de productos de belleza
            </p>
            <div className="mt-4 text-xs text-gray-500">
              <p>© 2025 Beauty Catalog. Desarrollado para gestión de productos de belleza.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;