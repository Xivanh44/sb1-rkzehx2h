-- Reset bucket configuration
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
DROP POLICY IF EXISTS "Storage full access" ON storage.objects;

-- Create separate policies for better control
CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'inventory');

CREATE POLICY "Allow authenticated insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'inventory' 
  AND (current_setting('request.jwt.claims', true)::jsonb->>'role')::text = 'authenticated'
);

CREATE POLICY "Allow authenticated delete"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'inventory'
  AND (current_setting('request.jwt.claims', true)::jsonb->>'role')::text = 'authenticated'
);