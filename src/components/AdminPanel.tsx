import React, { useState } from 'react';
import { LogOut, Settings, Upload, Users, BarChart3, FileSpreadsheet } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../types/Product';
import { useProductFilters } from '../hooks/useProductFilters';
import FileUploader from './FileUploader';
import FilterControls from './FilterControls';
import ProductTable from './ProductTable';
import InfoBanner from './InfoBanner';

interface AdminPanelProps {
  products: Product[];
  onDataLoad: (products: Product[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onDataLoad }) => {
  const { logout } = useAuth();
  const { filters, setFilters, categories, brands, filteredProducts } = useProductFilters(products);
  const [activeTab, setActiveTab] = useState<'upload' | 'manage' | 'stats'>('upload');

  const handleLogout = () => {
    logout();
  };

  const stats = {
    totalProducts: products.length,
    categories: categories.length,
    brands: brands.length,
    filteredCount: filteredProducts.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Admin Header */}
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-pink-500 to-rose-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Panel de Administración
                </h1>
                <p className="text-gray-600 text-sm">
                  Gestión de catálogo de productos
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'upload'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Upload className="inline h-4 w-4 mr-2" />
                Cargar Productos
              </button>
              <button
                onClick={() => setActiveTab('manage')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'manage'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileSpreadsheet className="inline h-4 w-4 mr-2" />
                Gestionar Catálogo
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'stats'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BarChart3 className="inline h-4 w-4 mr-2" />
                Estadísticas
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'upload' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="mr-2 h-5 w-5 text-pink-500" />
                Gestión de Archivos
              </h2>
              <p className="text-gray-600 mb-6">
                Carga nuevos productos desde archivos Excel o CSV. Los productos existentes serán reemplazados.
              </p>
              <FileUploader onDataLoad={onDataLoad} />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileSpreadsheet className="h-8 w-8 text-pink-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Total Productos</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart3 className="h-8 w-8 text-rose-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Categorías</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.categories}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-purple-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Marcas</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.brands}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Settings className="h-8 w-8 text-indigo-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Estado</p>
                    <p className="text-lg font-semibold text-green-600">Activo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'manage' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileSpreadsheet className="mr-2 h-5 w-5 text-pink-500" />
                Gestión del Catálogo
              </h2>
              <p className="text-gray-600 mb-6">
                Filtra y gestiona los productos del catálogo actual.
              </p>
            </div>

            <InfoBanner />
            
            <FilterControls
              filters={filters}
              onFiltersChange={setFilters}
              categories={categories}
              brands={brands}
            />

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Productos del Catálogo
                </h3>
                <p className="text-gray-600 text-sm">
                  {filteredProducts.length === 0 
                    ? 'No se encontraron productos con los filtros aplicados'
                    : `Mostrando ${filteredProducts.length} de ${products.length} productos`
                  }
                </p>
              </div>
              <ProductTable products={filteredProducts} />
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-pink-500" />
                Estadísticas del Catálogo
              </h2>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Products by Category */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos por Categoría</h3>
                <div className="space-y-3">
                  {categories.map(category => {
                    const count = products.filter(p => p.categoria === category).length;
                    const percentage = ((count / products.length) * 100).toFixed(1);
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{category}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Brands */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Marcas Principales</h3>
                <div className="space-y-3">
                  {brands.slice(0, 8).map(brand => {
                    const count = products.filter(p => p.marca === brand).length;
                    return (
                      <div key={brand} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 truncate">{brand}</span>
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System Info */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Sistema</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Última actualización:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date().toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Estado del sistema:</span>
                    <span className="text-sm font-medium text-green-600">Operativo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Versión:</span>
                    <span className="text-sm font-medium text-gray-900">1.0.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;