export interface Product {
  categoria: string;
  marca: string;
  producto: string;
  caracteristicas: string;
  volumen: string;
  precio: string;
}

export interface FilterState {
  categoria: string;
  marca: string;
  searchTerm: string;
}