-- Reset bucket configuration with minimal settings
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
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
);

-- Enable RLS on objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Remove all existing policies
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON storage.objects;

-- Create a single permissive policy for all operations
CREATE POLICY "Allow all operations"
ON storage.objects
FOR ALL
USING (bucket_id = 'inventory')
WITH CHECK (bucket_id = 'inventory');