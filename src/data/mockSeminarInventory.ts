import { InventoryItem, StockLevel } from '../types';

export const mockSeminarItems: InventoryItem[] = [
  {
    id: 'sem-1',
    reference: 'DIAM 15,7 CM',
    name: 'Sous Tasses Grandes Tasses Séminaire',
    supplier_name: 'METRO',
    photo_url: null,
    unit_price: 1.60
  },
  {
    id: 'sem-2',
    reference: 'DIAM 13 CM',
    name: 'Sous Tasses Petites Tasses Séminaire',
    supplier_name: 'METRO',
    photo_url: null,
    unit_price: 1.24
  },
  {
    id: 'sem-3',
    reference: '200 ML BLANCHE',
    name: 'Tasses Churchill à Thé Maple',
    supplier_name: 'METRO',
    photo_url: null,
    unit_price: 1.80
  },
  {
    id: 'sem-4',
    reference: '100 ML BLANCHE',
    name: 'Tasses à Café Séminaires',
    supplier_name: 'METRO',
    photo_url: null,
    unit_price: 1.68
  },
  {
    id: 'sem-5',
    reference: 'n/a',
    name: 'Assiette à Eau',
    supplier_name: 'n/a',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'sem-6',
    reference: '318510',
    name: 'Théières 45 cl Blanche',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 7.32
  },
  {
    id: 'sem-7',
    reference: '74571',
    name: 'Verre à Eau Séminaire Princessa 23cl',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 3.45
  },
  {
    id: 'sem-8',
    reference: '74573',
    name: 'Verre à Vin Séminaire Princessa 19 cl',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 3.08
  },
  {
    id: 'sem-9',
    reference: '012456',
    name: 'Verre Tumbler Droit Islande 22 cl',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 1.04
  },
  {
    id: 'sem-10',
    reference: '005508',
    name: 'Flûtes 13 cl Elegance Arcoroc',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 2.08
  },
  {
    id: 'sem-11',
    reference: '441140',
    name: 'Coupe Champagne Ballon 16cl Elegance Arcoroc',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 2.35
  },
  {
    id: 'sem-12',
    reference: '321596',
    name: 'Bol à Cidre',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 2.21
  },
  {
    id: 'sem-13',
    reference: '230028',
    name: 'Verre à Vin Carte Chef&Sommelier 58 cl (Gala)',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 4.64
  },
  {
    id: 'sem-14',
    reference: '328729',
    name: 'Pince à Glaçons',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 1.97
  },
  {
    id: 'sem-15',
    reference: '305777',
    name: 'Pince à Pain 23 cm Inox',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 9.18
  },
  {
    id: 'sem-16',
    reference: '322944',
    name: 'Pelle à Tarte Inox 25,6 cm',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 13.30
  },
  {
    id: 'sem-17',
    reference: '193982',
    name: 'Pince de Luxe Inox 30 cm Lacor (Grande Pince)',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 11.64
  },
  {
    id: 'sem-18',
    reference: '347578',
    name: 'Pince Feuille de Chêne Inox 15,2 cm Vollrath',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 7.76
  },
  {
    id: 'sem-19',
    reference: '347581',
    name: 'Pince Feuille de Chêne 24 cm',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 9.53
  },
  {
    id: 'sem-20',
    reference: '305778',
    name: 'Pince à Servir Inox Ajouré 19 cm',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 11.64
  },
  {
    id: 'sem-21',
    reference: '193995',
    name: 'Grande Cuillères de Service Perforé Inox 36 cm Lacor',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'sem-22',
    reference: '193988',
    name: 'Grande Cuillères de Service Inox 36 cm Lacor',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 11.66
  },
  {
    id: 'sem-23',
    reference: 'n/a',
    name: 'Cuillères de Service Inox Moyenne',
    supplier_name: 'n/a',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'sem-24',
    reference: 'n/a',
    name: 'Cuillères de Service Inox Petite (Fine)',
    supplier_name: 'n/a',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'sem-25',
    reference: 'n/a',
    name: 'Louche',
    supplier_name: 'n/a',
    photo_url: null,
    unit_price: 13.30
  },
  {
    id: 'sem-26',
    reference: 'n/a',
    name: 'Cuillère Service Inox',
    supplier_name: 'n/a',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'sem-27',
    reference: 'n/a',
    name: 'Grande Cuillère de Service Manche Noir',
    supplier_name: 'n/a',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'sem-28',
    reference: 'n/a',
    name: 'Couteau à Fromage',
    supplier_name: 'n/a',
    photo_url: null,
    unit_price: 15.91
  },
  {
    id: 'sem-29',
    reference: '155621',
    name: 'Couteau à Pain 20 cm Acier Inox Fushi',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 15.64
  },
  {
    id: 'sem-30',
    reference: 'n/a',
    name: 'Petites Plaque Chauffante',
    supplier_name: 'n/a',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'sem-31',
    reference: 'n/a',
    name: 'Grande Plaque Chauffante',
    supplier_name: 'n/a',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'sem-32',
    reference: 'n/a',
    name: 'Gobelet Disco Westotel',
    supplier_name: 'n/a',
    photo_url: null,
    unit_price: 0
  },
  {
    id: 'sem-33',
    reference: '346078',
    name: 'Chafing Dish Électrique',
    supplier_name: 'CHOMETTE',
    photo_url: null,
    unit_price: 480.20
  }
];

export const mockSeminarStockLevels: StockLevel[] = [
  {
    id: 'sl-sem-1',
    item_id: 'sem-1',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 737
  },
  {
    id: 'sl-sem-2',
    item_id: 'sem-2',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 512
  },
  {
    id: 'sl-sem-3',
    item_id: 'sem-3',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 623
  },
  {
    id: 'sl-sem-4',
    item_id: 'sem-4',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 313
  },
  {
    id: 'sl-sem-5',
    item_id: 'sem-5',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 201
  },
  {
    id: 'sl-sem-6',
    item_id: 'sem-6',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 85
  },
  {
    id: 'sl-sem-7',
    item_id: 'sem-7',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 527
  },
  {
    id: 'sl-sem-8',
    item_id: 'sem-8',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 927
  },
  {
    id: 'sl-sem-9',
    item_id: 'sem-9',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 1123
  },
  {
    id: 'sl-sem-10',
    item_id: 'sem-10',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 870
  },
  {
    id: 'sl-sem-11',
    item_id: 'sem-11',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 108
  },
  {
    id: 'sl-sem-12',
    item_id: 'sem-12',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 0
  },
  {
    id: 'sl-sem-13',
    item_id: 'sem-13',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 630
  },
  {
    id: 'sl-sem-14',
    item_id: 'sem-14',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 22
  },
  {
    id: 'sl-sem-15',
    item_id: 'sem-15',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 15
  },
  {
    id: 'sl-sem-16',
    item_id: 'sem-16',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 47
  },
  {
    id: 'sl-sem-17',
    item_id: 'sem-17',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 63
  },
  {
    id: 'sl-sem-18',
    item_id: 'sem-18',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 13
  },
  {
    id: 'sl-sem-19',
    item_id: 'sem-19',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 10
  },
  {
    id: 'sl-sem-20',
    item_id: 'sem-20',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 13
  },
  {
    id: 'sl-sem-21',
    item_id: 'sem-21',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 1
  },
  {
    id: 'sl-sem-22',
    item_id: 'sem-22',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 15
  },
  {
    id: 'sl-sem-23',
    item_id: 'sem-23',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 7
  },
  {
    id: 'sl-sem-24',
    item_id: 'sem-24',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 10
  },
  {
    id: 'sl-sem-25',
    item_id: 'sem-25',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 3
  },
  {
    id: 'sl-sem-26',
    item_id: 'sem-26',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 32
  },
  {
    id: 'sl-sem-27',
    item_id: 'sem-27',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 18
  },
  {
    id: 'sl-sem-28',
    item_id: 'sem-28',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 9
  },
  {
    id: 'sl-sem-29',
    item_id: 'sem-29',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 7
  },
  {
    id: 'sl-sem-30',
    item_id: 'sem-30',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 4
  },
  {
    id: 'sl-sem-31',
    item_id: 'sem-31',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 8
  },
  {
    id: 'sl-sem-32',
    item_id: 'sem-32',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 2110
  },
  {
    id: 'sl-sem-33',
    item_id: 'sem-33',
    storage_area_id: '2',
    storage_quantity: 0,
    service_quantity: 0,
    initial_stock: 33
  }
];