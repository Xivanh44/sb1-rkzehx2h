import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Hotel, StorageArea } from '../types';

interface HotelState {
  selectedHotel: Hotel | null;
  hotels: Hotel[];
  storageAreas: StorageArea[];
  loading: boolean;
  loadHotels: () => Promise<void>;
  selectHotel: (hotelId: string) => Promise<void>;
}

export const useHotelStore = create<HotelState>((set) => ({
  selectedHotel: null,
  hotels: [
    { id: '1', name: 'Westotel Nantes-Atlantique', location: 'Nantes' },
    { id: '2', name: 'Westotel Le Pouliguen - La Baule', location: 'Le Pouliguen' },
    { id: '3', name: 'Westotel Pornic', location: 'Pornic' },
    { id: '4', name: 'Westotel Taverny', location: 'Taverny' },
    { id: '5', name: 'Westotel Tours', location: 'Tours' }
  ],
  storageAreas: [
    { id: '1', hotel_id: '1', name: 'Carte Inventory', type: 'carte' },
    { id: '2', hotel_id: '1', name: 'Seminar Inventory', type: 'seminar' },
    { id: '3', hotel_id: '1', name: 'Bar Cellar Inventory', type: 'bar_cellar' },
    { id: '4', hotel_id: '1', name: 'West 1 Cellar Inventory', type: 'west1_cellar' },
    { id: '5', hotel_id: '1', name: 'Breakfast Inventory', type: 'breakfast' }
  ],
  loading: false,
  loadHotels: async () => {
    set({ loading: true });
    // Hotels are already loaded in the initial state
    set({ loading: false });
  },
  selectHotel: async (hotelId: string) => {
    const { hotels } = useHotelStore.getState();
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) return;

    // Set selected hotel and its storage areas
    set({ 
      selectedHotel: hotel,
      storageAreas: [
        { id: '1', hotel_id: hotelId, name: 'Carte Inventory', type: 'carte' },
        { id: '2', hotel_id: hotelId, name: 'Seminar Inventory', type: 'seminar' },
        { id: '3', hotel_id: hotelId, name: 'Bar Cellar Inventory', type: 'bar_cellar' },
        { id: '4', hotel_id: hotelId, name: 'West 1 Cellar Inventory', type: 'west1_cellar' },
        { id: '5', hotel_id: hotelId, name: 'Breakfast Inventory', type: 'breakfast' }
      ]
    });
  }
}));