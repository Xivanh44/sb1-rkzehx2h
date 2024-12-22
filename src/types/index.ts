export interface Hotel {
  id: string;
  name: string;
  location: string;
}

export interface StorageArea {
  id: string;
  hotel_id: string;
  name: string;
  type: 'carte' | 'seminar' | 'bar_cellar' | 'west1_cellar' | 'breakfast';
}

export interface InventoryItem {
  id: string;
  reference: string;
  name: string;
  supplier_name: string;
  photo_url: string | null;
  unit_price: number;
}

export interface StockLevel {
  id: string;
  item_id: string;
  storage_area_id: string;
  storage_quantity: number;
  service_quantity: number;
  initial_stock: number;
}

export interface Profile {
  id: string;
  hotel_id: string | null;
  role: 'manager' | 'user';
}