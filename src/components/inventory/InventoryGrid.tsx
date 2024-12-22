import React from 'react';
import { useInventoryStore } from '../../stores/useInventoryStore';
import { InventoryItem } from './InventoryItem';
import { Search } from 'lucide-react';

export const InventoryGrid: React.FC = () => {
  const { items, loading, searchQuery, setSearchQuery } = useInventoryStore();

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher dans l'inventaire..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-100 rounded-lg h-[280px] sm:h-[320px]"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((item) => (
            <InventoryItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};