/*
  # Storage configuration update

  1. Cleanup
    - Remove existing objects and bucket
  2. Setup
    - Create inventory bucket with proper configuration
  3. Security
    - Enable RLS
    - Update public access policy
*/

-- Cleanup existing objects
DELETE FROM storage.objects WHERE bucket_id = 'inventory';

-- Recreate bucket with proper configuration
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
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
);

-- Enable RLS on objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies safely
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "inventory_public_access" ON storage.objects;
    DROP POLICY IF EXISTS "Public access to inventory" ON storage.objects;
    DROP POLICY IF EXISTS "Allow all operations" ON storage.objects;
EXCEPTION 
    WHEN undefined_object THEN 
        NULL;
END $$;

-- Create new policy (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'inventory_public_access'
    ) THEN
        CREATE POLICY "inventory_public_access"
        ON storage.objects
        FOR ALL
        USING (bucket_id = 'inventory')
        WITH CHECK (bucket_id = 'inventory');
    END IF;
END $$;