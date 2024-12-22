import { InventoryItem, StockLevel } from '../types';

export const mockWest1CellarItems: InventoryItem[] = [
  {
    id: 'west1-1',
    reference: '230016',
    name: 'Verre à Vin Carte Chef&Sommelier 35cl (Cabernet)',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 3.84
  }
];

export const mockWest1CellarStockLevels: StockLevel[] = [
  {
    id: 'sl-west1-1',
    item_id: 'west1-1',
    storage_area_id: '4',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 136
  }
];