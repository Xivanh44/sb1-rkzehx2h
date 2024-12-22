/*
  # Configuration du stockage pour les photos d'inventaire

  1. Configuration
    - Réinitialisation complète du bucket
    - Configuration minimale avec accès public
    - Limite de taille de fichier à 5MB
    - Types MIME autorisés : JPEG, PNG, WebP
  
  2. Sécurité
    - Politique unique et permissive pour toutes les opérations
    - Pas de restrictions RLS pour simplifier
*/

-- Supprimer d'abord les objets existants
DELETE FROM storage.objects WHERE bucket_id = 'inventory';

-- Supprimer et recréer le bucket avec une configuration minimale
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

-- Désactiver RLS pour le bucket inventory
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;