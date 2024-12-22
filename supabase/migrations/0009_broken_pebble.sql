-- Enable storage
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a storage bucket for inventory photos
INSERT INTO storage.buckets (id, name)
VALUES ('inventory', 'inventory')
ON CONFLICT (id) DO NOTHING;

-- Set up storage policy to allow authenticated users to read photos
CREATE POLICY "Authenticated users can read inventory photos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'inventory');

-- Set up storage policy to allow managers to upload photos
CREATE POLICY "Managers can upload inventory photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'inventory'
  AND (
    SELECT role = 'manager'
    FROM profiles
    WHERE id = auth.uid()
  )
);