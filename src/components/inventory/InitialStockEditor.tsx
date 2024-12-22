import React, { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { Edit2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface InitialStockEditorProps {
  initialStock: number;
  onUpdate: (newValue: number) => Promise<void>;
}

export const InitialStockEditor: React.FC<InitialStockEditorProps> = ({ initialStock, onUpdate }) => {
  const { profile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialStock.toString());
  const isManager = profile?.role === 'manager';

  if (!isManager) {
    return <span className="font-medium text-gray-900">{initialStock}</span>;
  }

  const handleSubmit = async () => {
    const newValue = parseInt(value, 10);
    if (isNaN(newValue) || newValue < 0) {
      toast.error('Veuillez entrer un nombre valide');
      return;
    }

    try {
      await onUpdate(newValue);
      setIsEditing(false);
      toast.success('Stock initial mis à jour');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="p-1 text-green-600 hover:text-green-700"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            setIsEditing(false);
            setValue(initialStock.toString());
          }}
          className="p-1 text-red-600 hover:text-red-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="font-medium text-gray-900">{initialStock}</span>
      <button
        onClick={() => setIsEditing(true)}
        className="p-1 text-gray-400 hover:text-gray-600"
      >
        <Edit2 className="w-4 h-4" />
      </button>
    </div>
  );
};