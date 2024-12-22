/*
  # Fix storage bucket and policies

  1. Configuration
    - Reset storage bucket configuration
    - Make bucket public
    - Enable RLS
  2. Security
    - Allow public read access
    - Allow authenticated users full access to inventory bucket
*/

-- Reset bucket configuration
DELETE FROM storage.buckets WHERE id = 'inventory';
INSERT INTO storage.buckets (id, name, public, avif_autodetection)
VALUES ('inventory', 'inventory', true, false);

-- Enable RLS on objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Remove all existing policies
DROP POLICY IF EXISTS "Public access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users full access" ON storage.objects;

-- Create new simplified policies
CREATE POLICY "Public access"
ON storage.objects FOR SELECT
USING (true);

CREATE POLICY "Authenticated users full access"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'inventory')
WITH CHECK (bucket_id = 'inventory');