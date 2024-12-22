import React from 'react';

interface LogoProps {
  hotelId: string;
}

const HOTEL_LOGOS: Record<string, { name: string, subtitle?: string }> = {
  '1': {
    name: 'WESTOTEL',
    subtitle: 'NANTES-ATLANTIQUE'
  },
  '2': {
    name: 'WESTOTEL',
    subtitle: 'LE POULIGUEN - LA BAULE'
  },
  '3': {
    name: 'WESTOTEL',
    subtitle: 'PORNIC - CÔTE DE JADE'
  },
  '4': {
    name: 'WESTOTEL',
    subtitle: 'TAVERNY - VAL D\'OISE'
  },
  '5': {
    name: 'WESTOTEL',
    subtitle: 'TOURS - VAL DE LOIRE'
  }
};

export const Logo: React.FC<LogoProps> = ({ hotelId }) => {
  const hotel = HOTEL_LOGOS[hotelId];
  
  if (!hotel) return null;

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="text-[#002B5C] font-bold text-3xl tracking-wider">
        {hotel.name}
      </div>
      {hotel.subtitle && (
        <div className="text-[#002B5C] font-medium text-lg tracking-wide mt-1">
          {hotel.subtitle}
        </div>
      )}
      <div className="flex mt-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-[#002B5C] text-2xl mx-0.5">★</div>
        ))}
      </div>
    </div>
  );
};