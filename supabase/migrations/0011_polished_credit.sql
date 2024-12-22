/*
  # Configuration du stockage pour les photos d'inventaire

  1. Configuration
    - Création du bucket de stockage
    - Configuration des politiques de sécurité
    - Activation des permissions nécessaires
  2. Sécurité
    - Accès en lecture pour les utilisateurs authentifiés
    - Accès en écriture pour les managers uniquement
*/

-- Activer l'extension storage si ce n'est pas déjà fait
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Créer le bucket s'il n'existe pas
INSERT INTO storage.buckets (id, name, public)
VALUES ('inventory', 'inventory', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Authenticated users can read inventory photos" ON storage.objects;
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
TO authenticated
WITH CHECK (
  bucket_id = 'inventory'
  AND EXISTS (
    SELECT 1 FROM public.profiles
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
    SELECT 1 FROM public.profiles
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
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'manager'
  )
);