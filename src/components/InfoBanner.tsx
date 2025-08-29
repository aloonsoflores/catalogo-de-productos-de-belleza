import React from 'react';
import { AlertTriangle, ShoppingCart, Phone } from 'lucide-react';

const InfoBanner: React.FC = () => {
  return (
    <div className="space-y-4 mb-6">
      {/* Aviso de Testers */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-amber-800">
              <strong>IMPORTANTE:</strong> Todos los productos son TESTERS, salvo indicación contraria en las características
            </p>
          </div>
        </div>
      </div>

      {/* Condiciones de Pedido */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <ShoppingCart className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-blue-800">
              <strong>Condiciones de pedido:</strong> Pedido mínimo: 2 productos e importe superior a 20€
            </p>
          </div>
        </div>
      </div>

      {/* Información de Contacto */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <Phone className="h-5 w-5 text-green-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">
              <strong>Para realizar pedidos:</strong> Contactar al teléfono: <span className="font-bold">+34 653 23 98 66</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;