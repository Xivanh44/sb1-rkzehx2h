/*
  # Fix storage bucket and policies

  1. Configuration
    - Reset storage bucket configuration
    - Ensure bucket is public
    - Enable RLS
  2. Security
    - Allow public read access
    - Allow authenticated users full access to inventory bucket
*/

-- Reset bucket configuration
DELETE FROM storage.buckets WHERE id = 'inventory';
INSERT INTO storage.buckets (id, name, public)
VALUES ('inventory', 'inventory', true);

-- Enable RLS on objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Remove all existing policies
DROP POLICY IF EXISTS "Anyone can read inventory photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload inventory photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update inventory photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete inventory photos" ON storage.objects;

-- Create new simplified policies
CREATE POLICY "Public access"
ON storage.objects FOR SELECT
USING (bucket_id = 'inventory');

CREATE POLICY "Authenticated users full access"
ON storage.objects
USING (bucket_id = 'inventory' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'inventory' AND auth.role() = 'authenticated');