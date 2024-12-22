/*
  # Storage configuration cleanup

  1. Cleanup
    - Remove existing objects and bucket
  2. Setup
    - Create inventory bucket with minimal configuration
    - Disable RLS for simpler access
*/

-- Cleanup existing storage
DELETE FROM storage.objects WHERE bucket_id = 'inventory';

-- Recreate bucket with minimal configuration
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

-- Disable RLS for simpler access
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;