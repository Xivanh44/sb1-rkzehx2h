/*
  # Configuration du stockage pour les photos d'inventaire

  1. Configuration
    - Création d'un bucket public 'inventory'
    - Limite de taille à 5MB
    - Types MIME autorisés : JPEG, PNG, WebP
  2. Sécurité
    - Désactivation de RLS pour simplifier l'accès
*/

-- Créer ou mettre à jour le bucket
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
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']::text[]
)
ON CONFLICT (id) DO UPDATE
SET 
  public = EXCLUDED.public,
  avif_autodetection = EXCLUDED.avif_autodetection,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Désactiver RLS pour simplifier l'accès
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;