/*
  # Correction des politiques de stockage

  1. Modifications
    - Ajout de politiques pour UPDATE et DELETE
    - Correction de la politique INSERT
    - Ajout de politique pour les managers
  2. Sécurité
    - Maintien des restrictions aux managers uniquement
    - Protection contre les accès non autorisés
*/

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Authenticated users can read inventory photos" ON storage.objects;
DROP POLICY IF EXISTS "Managers can upload inventory photos" ON storage.objects;

-- Politique de lecture pour tous les utilisateurs authentifiés
CREATE POLICY "Authenticated users can read inventory photos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'inventory');

-- Politique d'insertion pour les managers
CREATE POLICY "Managers can insert inventory photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'inventory'
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'manager'
  )
);

-- Politique de mise à jour pour les managers
CREATE POLICY "Managers can update inventory photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'inventory'
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'manager'
  )
);

-- Politique de suppression pour les managers
CREATE POLICY "Managers can delete inventory photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'inventory'
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'manager'
  )
);