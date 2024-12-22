import React, { useCallback } from 'react';
import { Euro } from 'lucide-react';
import { InventoryItem as IInventoryItem } from '../../types';
import { StockLevelEditor } from './StockLevelEditor';
import { useHotelStore } from '../../stores/useHotelStore';
import { hotelThemes } from '../../utils/hotelThemes';
import { PhotoManager } from './PhotoManager';
import { supabase } from '../../lib/supabase';

interface Props {
  item: IInventoryItem;
}

export const InventoryItem: React.FC<Props> = ({ item }) => {
  const { selectedHotel } = useHotelStore();
  const theme = selectedHotel ? hotelThemes[selectedHotel.id] : hotelThemes['1'];

  const handlePhotoUpdate = useCallback(async (newUrl: string | null) => {
    try {
      console.log('Updating photo URL:', newUrl); // Debug log

      const { error } = await supabase
        .from('items')
        .update({ photo_url: newUrl })
        .eq('id', item.id);

      if (error) {
        console.error('Database update error:', error); // Debug log
        throw error;
      }

      console.log('Photo URL updated successfully'); // Debug log
    } catch (error) {
      console.error('Error updating photo:', error);
      throw error;
    }
  }, [item.id]);

  return (
    <div className={`rounded-lg shadow-md p-3 sm:p-4 space-y-3 sm:space-y-4 text-sm sm:text-base ${theme.cardBg} ${theme.borderColor} border`}>
      <PhotoManager
        key={item.id} // Force re-render when item changes
        itemId={item.id}
        photoUrl={item.photo_url}
        onPhotoUpdate={handlePhotoUpdate}
      />

      <div>
        <h3 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
        <p className="text-xs sm:text-sm text-gray-500">Réf: {item.reference || 'N/A'}</p>
        <p className="text-xs sm:text-sm text-gray-500 truncate">Fournisseur: {item.supplier_name || 'N/A'}</p>
        <div className="flex items-center mt-1 sm:mt-2">
          <Euro className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${theme.accentColor}`} />
          <span className="font-medium text-gray-900">
            {item.unit_price ? item.unit_price.toFixed(2) : '0.00'}
          </span>
        </div>
      </div>

      <StockLevelEditor item={item} />
    </div>
  );
};