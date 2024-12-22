import { create } from 'zustand';
import type { InventoryItem, StockLevel } from '../types';
import { mockBreakfastItems, mockBreakfastStockLevels } from '../data/mockInventory';
import { mockCarteItems, mockCarteStockLevels } from '../data/mockCarteInventory';
import { mockSeminarItems, mockSeminarStockLevels } from '../data/mockSeminarInventory';
import { mockBarCellarItems, mockBarCellarStockLevels } from '../data/mockBarCellarInventory';
import { mockWest1CellarItems, mockWest1CellarStockLevels } from '../data/mockWest1CellarInventory';

interface InventoryState {
  items: InventoryItem[];
  stockLevels: StockLevel[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loadInventory: (storageAreaId: string) => void;
  updateStockLevel: (
    id: string,
    field: 'storage_quantity' | 'service_quantity',
    value: number
  ) => void;
  updateInitialStock: (id: string, value: number) => void;
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  items: [],
  stockLevels: [],
  loading: false,
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  loadInventory: (storageAreaId: string) => {
    set({ loading: true });
    // Simuler un délai de chargement
    setTimeout(() => {
      let items: InventoryItem[] = [];
      let stockLevels: StockLevel[] = [];

      switch (storageAreaId) {
        case '1': // Inventaire carte
          items = mockCarteItems;
          stockLevels = mockCarteStockLevels;
          break;
        case '2': // Inventaire séminaire
          items = mockSeminarItems;
          stockLevels = mockSeminarStockLevels;
          break;
        case '3': // Cave bar
          items = mockBarCellarItems;
          stockLevels = mockBarCellarStockLevels;
          break;
        case '4': // Cave west 1
          items = mockWest1CellarItems;
          stockLevels = mockWest1CellarStockLevels;
          break;
        case '5': // Inventaire petit-déjeuner
          items = mockBreakfastItems;
          stockLevels = mockBreakfastStockLevels;
          break;
        default:
          items = [];
          stockLevels = [];
      }

      // Filtrer les résultats si une recherche est active
      const query = get().searchQuery.toLowerCase();
      if (query) {
        items = items.filter(item => 
          item.name.toLowerCase().includes(query) ||
          (item.reference && item.reference.toLowerCase().includes(query)) ||
          (item.supplier_name && item.supplier_name.toLowerCase().includes(query))
        );
      }

      set({
        items,
        stockLevels,
        loading: false
      });
    }, 500);
  },
  updateStockLevel: (id, field, value) => {
    set((state) => ({
      stockLevels: state.stockLevels.map((sl) =>
        sl.id === id ? { ...sl, [field]: value } : sl
      ),
    }));
  },
  updateInitialStock: (id, value) => {
    set((state) => ({
      stockLevels: state.stockLevels.map((sl) =>
        sl.id === id ? { ...sl, initial_stock: value } : sl
      ),
    }));
  },
}));