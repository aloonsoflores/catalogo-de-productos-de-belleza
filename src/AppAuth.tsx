import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Product } from './types/Product';
import { sampleProducts } from './data/sampleProducts';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import AdminPanel from './components/AdminPanel';
import PublicCatalog from './components/PublicCatalog';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleDataLoad = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  const handleAdminAccess = () => {
    setShowAdminLogin(true);
  };

  const handleBackToPublic = () => {
    setShowAdminLogin(false);
  };

  // Show admin panel if authenticated
  if (isAuthenticated) {
    return (
      <AdminPanel 
        products={products} 
        onDataLoad={handleDataLoad}
      />
    );
  }

  // Show login form if admin access requested
  if (showAdminLogin) {
    return <LoginForm />;
  }

  // Show public catalog by default
  return (
    <PublicCatalog 
      products={products} 
      onAdminAccess={handleAdminAccess}
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <AppContent />
    </AuthProvider>
  );
}

export default App;