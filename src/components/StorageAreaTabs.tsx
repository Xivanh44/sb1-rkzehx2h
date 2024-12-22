import React, { useEffect, useMemo } from 'react';
import { useHotelStore } from '../stores/useHotelStore';
import { useInventoryStore } from '../stores/useInventoryStore';
import { storageAreaNames, storageAreaOrder } from '../utils/storageAreas';
import { hotelThemes } from '../utils/hotelThemes';

export const StorageAreaTabs: React.FC = () => {
  const { storageAreas, selectedHotel } = useHotelStore();
  const { loadInventory } = useInventoryStore();
  const [activeTab, setActiveTab] = React.useState<string | null>(null);
  const theme = selectedHotel ? hotelThemes[selectedHotel.id] : hotelThemes['1'];

  const sortedStorageAreas = useMemo(() => 
    [...storageAreas].sort((a, b) => {
      const orderA = storageAreaOrder.indexOf(a.type);
      const orderB = storageAreaOrder.indexOf(b.type);
      return orderA - orderB;
    }),
    [storageAreas]
  );

  useEffect(() => {
    if (sortedStorageAreas.length > 0 && !activeTab) {
      setActiveTab(sortedStorageAreas[0].id);
      loadInventory(sortedStorageAreas[0].id);
    }
  }, [sortedStorageAreas.length, activeTab, loadInventory]);

  const handleTabChange = (areaId: string) => {
    setActiveTab(areaId);
    loadInventory(areaId);
  };

  if (!sortedStorageAreas.length) {
    return null;
  }

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Zones de stockage">
        {sortedStorageAreas.map((area) => (
          <button
            key={area.id}
            onClick={() => handleTabChange(area.id)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
              ${activeTab === area.id
                ? `border-current ${theme.accentColor}`
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {storageAreaNames[area.type] || area.name}
          </button>
        ))}
      </nav>
    </div>
  );
};