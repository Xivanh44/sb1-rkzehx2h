/*
  # Correction des politiques de stockage

  1. Configuration
    - Activation de RLS sur storage.objects
    - Mise à jour des politiques avec références de table explicites
  2. Sécurité
    - Lecture publique des photos
    - Gestion des photos limitée aux managers
*/

-- Activer RLS sur storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Public can read inventory photos" ON storage.objects;
DROP POLICY IF EXISTS "Managers can insert inventory photos" ON storage.objects;
DROP POLICY IF EXISTS "Managers can update inventory photos" ON storage.objects;
DROP POLICY IF EXISTS "Managers can delete inventory photos" ON storage.objects;

-- Politique de lecture publique
CREATE POLICY "Public can read inventory photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'inventory');

-- Politique d'insertion pour les managers
CREATE POLICY "Managers can insert inventory photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'inventory'
  AND EXISTS (
    SELECT 1 FROM auth.users u
    JOIN public.profiles p ON p.id = u.id
    WHERE u.id = auth.uid()
    AND p.role = 'manager'
  )
);

-- Politique de mise à jour pour les managers
CREATE POLICY "Managers can update inventory photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'inventory'
  AND EXISTS (
    SELECT 1 FROM auth.users u
    JOIN public.profiles p ON p.id = u.id
    WHERE u.id = auth.uid()
    AND p.role = 'manager'
  )
);

-- Politique de suppression pour les managers
CREATE POLICY "Managers can delete inventory photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'inventory'
  AND EXISTS (
    SELECT 1 FROM auth.users u
    JOIN public.profiles p ON p.id = u.id
    WHERE u.id = auth.uid()
    AND p.role = 'manager'
  )
);