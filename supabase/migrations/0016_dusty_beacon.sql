/*
  # Final storage configuration fix
  
  1. Configuration
    - Reset storage bucket with proper settings
    - Enable public access
    - Disable AVIF detection to prevent processing issues
  2. Security
    - Enable RLS
    - Allow public read access
    - Allow authenticated users full access
    - Remove role-based restrictions
*/

-- Reset bucket configuration with all required settings
DELETE FROM storage.buckets WHERE id = 'inventory';
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
  'inventory',
  'inventory',
  true,
  false,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
);

-- Enable RLS on objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Remove any existing policies
DROP POLICY IF EXISTS "Public access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users full access" ON storage.objects;

-- Create a single policy for public read access
CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'inventory');

-- Create a single policy for authenticated write access
CREATE POLICY "Allow authenticated write access"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'inventory');

-- Create a single policy for authenticated update access
CREATE POLICY "Allow authenticated update access"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'inventory');

-- Create a single policy for authenticated delete access
CREATE POLICY "Allow authenticated delete access"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'inventory');