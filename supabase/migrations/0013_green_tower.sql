/*
  # Correction des politiques de stockage

  1. Configuration
    - Réinitialisation des politiques de stockage
    - Simplification des politiques pour le débogage
  2. Sécurité
    - Lecture publique des photos
    - Gestion des photos pour les utilisateurs authentifiés
*/

-- Activer RLS sur storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Supprimer toutes les politiques existantes
DROP POLICY IF EXISTS "Public can read inventory photos" ON storage.objects;
DROP POLICY IF EXISTS "Managers can insert inventory photos" ON storage.objects;
DROP POLICY IF EXISTS "Managers can update inventory photos" ON storage.objects;
DROP POLICY IF EXISTS "Managers can delete inventory photos" ON storage.objects;

-- Politique de lecture publique simplifiée
CREATE POLICY "Anyone can read inventory photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'inventory');

-- Politique d'insertion simplifiée
CREATE POLICY "Authenticated users can upload inventory photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'inventory');

-- Politique de mise à jour simplifiée
CREATE POLICY "Authenticated users can update inventory photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'inventory');

-- Politique de suppression simplifiée
CREATE POLICY "Authenticated users can delete inventory photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'inventory');