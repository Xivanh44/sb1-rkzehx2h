/*
  # Storage configuration fix
  
  1. Configuration
    - Reset storage bucket with proper settings
    - Enable public access
    - Set file size limits and MIME types
  2. Security
    - Enable RLS
    - Allow public read access
    - Allow authenticated users full access
*/

-- Reset bucket configuration with all required settings
DELETE FROM storage.buckets WHERE id = 'inventory';
INSERT INTO storage.buckets (
  id, 
  name,
  public,
  avif_autodetection,
  file_size_limit,
  allowed_mime_types
) VALUES (
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
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated write access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete access" ON storage.objects;

-- Create a single policy for all operations
CREATE POLICY "Storage full access"
ON storage.objects
AS PERMISSIVE
FOR ALL
TO authenticated
USING (bucket_id = 'inventory')
WITH CHECK (bucket_id = 'inventory');