import React from 'react';
import { useInventoryStore } from '../../stores/useInventoryStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { InventoryItem } from '../../types';
import { InitialStockEditor } from './InitialStockEditor';
import toast from 'react-hot-toast';

interface Props {
  item: InventoryItem;
}

export const StockLevelEditor: React.FC<Props> = ({ item }) => {
  const { profile } = useAuthStore();
  const { updateStockLevel, updateInitialStock, stockLevels } = useInventoryStore();
  const stockLevel = stockLevels.find((sl) => sl.item_id === item.id);

  const handleUpdate = async (
    field: 'storage_quantity' | 'service_quantity',
    value: number
  ) => {
    try {
      if (!stockLevel) return;
      await updateStockLevel(stockLevel.id, field, value);
      toast.success('Stock mis à jour avec succès');
    } catch (error) {
      toast.error('Échec de la mise à jour du stock');
    }
  };

  const handleInitialStockUpdate = async (value: number) => {
    try {
      if (!stockLevel) return;
      await updateInitialStock(stockLevel.id, value);
    } catch (error) {
      throw error;
    }
  };

  if (!stockLevel) return null;

  const totalStock = stockLevel.storage_quantity + stockLevel.service_quantity;
  const stockValue = totalStock * item.unit_price;

  return (
    <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div className="space-y-1 sm:space-y-2">
          <label className="font-medium text-gray-700">Stock Local</label>
          <input
            type="number"
            min="0"
            value={stockLevel.storage_quantity}
            onChange={(e) =>
              handleUpdate('storage_quantity', parseInt(e.target.value, 10))
            }
            disabled={profile?.role !== 'manager' && profile?.role !== 'user'}
            className="w-full px-1 sm:px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-1 sm:space-y-2">
          <label className="font-medium text-gray-700">Stock Service</label>
          <input
            type="number"
            min="0"
            value={stockLevel.service_quantity}
            onChange={(e) =>
              handleUpdate('service_quantity', parseInt(e.target.value, 10))
            }
            disabled={profile?.role !== 'manager' && profile?.role !== 'user'}
            className="w-full px-1 sm:px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200 space-y-1">
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Stock initial:</span>
          <InitialStockEditor
            initialStock={stockLevel.initial_stock}
            onUpdate={handleInitialStockUpdate}
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Stock total:</span>
          <span className="font-medium text-gray-900">{totalStock}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Valeur:</span>
          <span className="font-medium text-gray-900">
            {stockValue.toFixed(2)} €
          </span>
        </div>
      </div>
    </div>
  );
};