/*
  # Initial Schema for Westotel Inventory Management System

  1. New Tables
    - `hotels`
      - Basic hotel information
    - `storage_areas`
      - Different storage sections within hotels
    - `items`
      - Inventory items with tracking
    - `stock_movements`
      - Track stock changes
    - `users`
      - User management and roles
    
  2. Security
    - Enable RLS on all tables
    - Policies for authenticated access
    - Role-based access control
*/

-- Hotels table
CREATE TABLE hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Storage areas table
CREATE TABLE storage_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid REFERENCES hotels(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('carte', 'seminar', 'bar_cellar', 'west1_cellar', 'breakfast')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Items table
CREATE TABLE items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text UNIQUE NOT NULL,
  name text NOT NULL,
  supplier_name text NOT NULL,
  photo_url text,
  unit_price decimal(10,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Stock levels table
CREATE TABLE stock_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES items(id) ON DELETE CASCADE,
  storage_area_id uuid REFERENCES storage_areas(id) ON DELETE CASCADE,
  storage_quantity integer NOT NULL DEFAULT 0,
  service_quantity integer NOT NULL DEFAULT 0,
  initial_stock integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(item_id, storage_area_id)
);

-- Stock movements table
CREATE TABLE stock_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES items(id) ON DELETE CASCADE,
  storage_area_id uuid REFERENCES storage_areas(id) ON DELETE CASCADE,
  quantity_change integer NOT NULL,
  movement_type text NOT NULL CHECK (movement_type IN ('in', 'out', 'transfer')),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;

-- Create profiles table for extended user info
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  hotel_id uuid REFERENCES hotels(id),
  role text NOT NULL CHECK (role IN ('manager', 'user')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read all hotels"
  ON hotels FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can manage hotels"
  ON hotels FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'manager'
    )
  );

CREATE POLICY "Users can read storage areas"
  ON storage_areas FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND (
        profiles.hotel_id = storage_areas.hotel_id
        OR profiles.role = 'manager'
      )
    )
  );

CREATE POLICY "Users can read items"
  ON items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can manage items"
  ON items FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'manager'
    )
  );

CREATE POLICY "Users can read stock levels"
  ON stock_levels FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update stock levels"
  ON stock_levels FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      JOIN storage_areas sa ON sa.hotel_id = p.hotel_id
      WHERE p.id = auth.uid()
      AND sa.id = stock_levels.storage_area_id
    )
  );

CREATE POLICY "Users can read stock movements"
  ON stock_movements FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create stock movements"
  ON stock_movements FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert initial hotels
INSERT INTO hotels (name, location) VALUES
  ('Westotel Nantes-Atlantique', 'Nantes'),
  ('Westotel Le Pouliguen', 'Le Pouliguen'),
  ('Westotel Pornic', 'Pornic'),
  ('Westotel Taverny', 'Taverny'),
  ('Westotel Tours', 'Tours');

-- Create storage areas for each hotel
DO $$
DECLARE
  hotel_record RECORD;
  storage_types text[] := ARRAY['carte', 'seminar', 'bar_cellar', 'west1_cellar', 'breakfast'];
  storage_names text[] := ARRAY['Carte Inventory', 'Seminar Inventory', 'Bar Cellar Inventory', 'West 1 Cellar Inventory', 'Breakfast Inventory'];
  i integer;
BEGIN
  FOR hotel_record IN SELECT id FROM hotels LOOP
    FOR i IN 1..array_length(storage_types, 1) LOOP
      INSERT INTO storage_areas (hotel_id, name, type)
      VALUES (hotel_record.id, storage_names[i], storage_types[i]);
    END LOOP;
  END LOOP;
END $$;