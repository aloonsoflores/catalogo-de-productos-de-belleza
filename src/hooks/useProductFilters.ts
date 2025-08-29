import { useState, useMemo } from 'react';
import { Product, FilterState } from '../types/Product';

export const useProductFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<FilterState>({
    categoria: '',
    marca: '',
    searchTerm: ''
  });

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.categoria).filter(Boolean)));
    return cats.sort();
  }, [products]);

  // Obtener marcas únicas
  const brands = useMemo(() => {
    const marcas = Array.from(new Set(products.map(p => p.marca).filter(Boolean)));
    return marcas.sort();
  }, [products]);

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = !filters.categoria || product.categoria === filters.categoria;
      const matchesBrand = !filters.marca || product.marca === filters.marca;
      const matchesSearch = !filters.searchTerm || 
        product.producto.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.marca.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.caracteristicas.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesCategory && matchesBrand && matchesSearch;
    });
  }, [products, filters]);

  return {
    filters,
    setFilters,
    categories,
    brands,
    filteredProducts
  };
};