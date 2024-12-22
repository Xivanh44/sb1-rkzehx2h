import { InventoryItem, StockLevel } from '../types';

export const mockBarCellarItems: InventoryItem[] = [
  {
    id: 'bar-1',
    reference: '346168',
    name: 'Verre Margarita Arcoroc 27cl',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 4.51
  },
  {
    id: 'bar-2',
    reference: 'n/a',
    name: 'Verre à Cognac Sublym Brandy 45cl',
    supplier_name: 'n/a',
    photo_url: null,
    unit_price: 3.84
  },
  {
    id: 'bar-3',
    reference: '385358',
    name: 'Gobelet 38cl Broadway Arcoroc',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 3.24
  },
  {
    id: 'bar-4',
    reference: '12503',
    name: 'Petit Tumbler Islande 16cl Café',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 0.99
  },
  {
    id: 'bar-5',
    reference: '503158',
    name: 'Bocal avec Couvercle Transparent 8,5cm Diam',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 2.80
  },
  {
    id: 'bar-6',
    reference: 'n/a',
    name: 'Verre Heineken 25cl',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-7',
    reference: 'n/a',
    name: 'Verre Heineken 50cl',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-8',
    reference: 'n/a',
    name: 'Verre à Pied Schweppes',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-9',
    reference: 'n/a',
    name: 'Verre Affligem 25cl',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-10',
    reference: 'n/a',
    name: 'Verre Affligem 50cl',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-11',
    reference: 'n/a',
    name: 'Verre Lagunitas 25cl',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-12',
    reference: 'n/a',
    name: 'Verre Lagunitas 50cl',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-13',
    reference: 'n/a',
    name: 'Verre Saint Germain',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-14',
    reference: 'n/a',
    name: 'Verre Martini Aperol',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-15',
    reference: 'n/a',
    name: 'Verre Desperados',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-16',
    reference: 'n/a',
    name: 'Verre Get',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-17',
    reference: 'n/a',
    name: 'Verre Grimbergen 25cl',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-18',
    reference: 'n/a',
    name: 'Verre Mort Subite 25cl',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-19',
    reference: 'n/a',
    name: 'Verre Mort Subite 50cl',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-20',
    reference: '168883',
    name: 'Gobelet Forme Base 32cl Salto Arcoroc (Verre Whisky)',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 2.06
  },
  {
    id: 'bar-21',
    reference: 'n/a',
    name: 'Verre French Coffee',
    supplier_name: 'n/a',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-22',
    reference: 'n/a',
    name: 'Verre Orangina',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-23',
    reference: 'n/a',
    name: 'Verre Perrier',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-24',
    reference: 'n/a',
    name: 'Verre Mojito Havana',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-25',
    reference: 'n/a',
    name: 'Pilon à Cocktail',
    supplier_name: 'METRO',
    photo_url: null,
    unit_price: 13.44
  },
  {
    id: 'bar-26',
    reference: 'n/a',
    name: 'Doseur à Cocktail',
    supplier_name: 'METRO',
    photo_url: null,
    unit_price: 4.30
  },
  {
    id: 'bar-27',
    reference: 'n/a',
    name: 'Carafe Ricard',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-28',
    reference: 'n/a',
    name: 'Verre Pélican 25cl',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-29',
    reference: 'n/a',
    name: 'Verre Pélican 50cl',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'bar-30',
    reference: 'n/a',
    name: 'Verre Ricard',
    supplier_name: 'FRANCE BOISSON',
    photo_url: null,
    unit_price: 0
  }
];

export const mockBarCellarStockLevels: StockLevel[] = [
  {
    id: 'sl-bar-1',
    item_id: 'bar-1',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 52
  },
  {
    id: 'sl-bar-2',
    item_id: 'bar-2',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 49
  },
  {
    id: 'sl-bar-3',
    item_id: 'bar-3',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 196
  },
  {
    id: 'sl-bar-4',
    item_id: 'bar-4',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 72
  },
  {
    id: 'sl-bar-5',
    item_id: 'bar-5',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 81
  },
  {
    id: 'sl-bar-6',
    item_id: 'bar-6',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 255
  },
  {
    id: 'sl-bar-7',
    item_id: 'bar-7',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 244
  },
  {
    id: 'sl-bar-8',
    item_id: 'bar-8',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 8
  },
  {
    id: 'sl-bar-9',
    item_id: 'bar-9',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 270
  },
  {
    id: 'sl-bar-10',
    item_id: 'bar-10',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 102
  },
  {
    id: 'sl-bar-11',
    item_id: 'bar-11',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 138
  },
  {
    id: 'sl-bar-12',
    item_id: 'bar-12',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 60
  },
  {
    id: 'sl-bar-13',
    item_id: 'bar-13',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 29
  },
  {
    id: 'sl-bar-14',
    item_id: 'bar-14',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 50
  },
  {
    id: 'sl-bar-15',
    item_id: 'bar-15',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 130
  },
  {
    id: 'sl-bar-16',
    item_id: 'bar-16',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 17
  },
  {
    id: 'sl-bar-17',
    item_id: 'bar-17',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 27
  },
  {
    id: 'sl-bar-18',
    item_id: 'bar-18',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 2
  },
  {
    id: 'sl-bar-19',
    item_id: 'bar-19',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 0
  },
  {
    id: 'sl-bar-20',
    item_id: 'bar-20',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 34
  },
  {
    id: 'sl-bar-21',
    item_id: 'bar-21',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 37
  },
  {
    id: 'sl-bar-22',
    item_id: 'bar-22',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 41
  },
  {
    id: 'sl-bar-23',
    item_id: 'bar-23',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 12
  },
  {
    id: 'sl-bar-24',
    item_id: 'bar-24',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 2
  },
  {
    id: 'sl-bar-25',
    item_id: 'bar-25',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 5
  },
  {
    id: 'sl-bar-26',
    item_id: 'bar-26',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 0
  },
  {
    id: 'sl-bar-27',
    item_id: 'bar-27',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 3
  },
  {
    id: 'sl-bar-28',
    item_id: 'bar-28',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 0
  },
  {
    id: 'sl-bar-29',
    item_id: 'bar-29',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 0
  },
  {
    id: 'sl-bar-30',
    item_id: 'bar-30',
    storage_area_id: '3',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 2
  }
];