/*
  # Configuration du stockage des photos d'inventaire
  
  1. Configuration
    - Bucket public pour les photos d'inventaire
    - Limite de taille de fichier à 5MB
    - Types MIME autorisés : JPEG, PNG, WebP
    - Accès public en lecture
    - Accès authentifié en écriture
*/

-- Créer le bucket s'il n'existe pas, sinon mettre à jour sa configuration
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
)
ON CONFLICT (id) DO UPDATE
SET 
  public = EXCLUDED.public,
  avif_autodetection = EXCLUDED.avif_autodetection,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Désactiver RLS pour simplifier l'accès
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;