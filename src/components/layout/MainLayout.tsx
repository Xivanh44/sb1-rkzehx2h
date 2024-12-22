import React from 'react';
import { Toaster } from 'react-hot-toast';
import { HotelSelector } from '../HotelSelector';
import { StorageAreaTabs } from '../StorageAreaTabs';
import { InventoryGrid } from '../inventory/InventoryGrid';
import { useHotelStore } from '../../stores/useHotelStore';
import { hotelThemes } from '../../utils/hotelThemes';

export const MainLayout: React.FC = () => {
  const { selectedHotel } = useHotelStore();
  const theme = selectedHotel ? hotelThemes[selectedHotel.id] : hotelThemes['1'];

  return (
    <div className={`min-h-screen ${theme.bgColor}`}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HotelSelector />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className={`bg-white rounded-lg shadow ${theme.borderColor} border`}>
          <StorageAreaTabs />
          <div className="p-4">
            <InventoryGrid />
          </div>
        </div>
      </main>

      <Toaster position="top-right" />
    </div>
  );
};