import React, { useEffect } from 'react';
import { Building2 } from 'lucide-react';
import { useHotelStore } from '../stores/useHotelStore';
import { Logo } from './Logo';

export const HotelSelector: React.FC = () => {
  const { hotels, selectedHotel, selectHotel, loadHotels, loading } = useHotelStore();

  useEffect(() => {
    loadHotels();
  }, []);

  useEffect(() => {
    if (hotels.length > 0 && !selectedHotel) {
      selectHotel(hotels[0].id);
    }
  }, [hotels, selectedHotel]);

  if (loading) {
    return <div className="animate-pulse">Chargement des hôtels...</div>;
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
      {selectedHotel && <Logo hotelId={selectedHotel.id} />}
      <div className="flex items-center space-x-2">
        <Building2 className="w-5 h-5 text-blue-600" />
        <select
          className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          value={selectedHotel?.id || ''}
          onChange={(e) => selectHotel(e.target.value)}
        >
          <option value="">Sélectionner un hôtel</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};