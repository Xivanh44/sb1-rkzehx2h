-- Vérifier et configurer le bucket de stockage
DO $$
BEGIN
    -- Supprimer les objets existants si nécessaire
    DELETE FROM storage.objects WHERE bucket_id = 'inventory';
    
    -- Recréer le bucket avec les bonnes permissions
    DELETE FROM storage.buckets WHERE id = 'inventory';
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
        'inventory',
        'inventory',
        true,
        5242880, -- 5MB
        ARRAY['image/jpeg', 'image/png', 'image/webp']
    );

    -- Désactiver RLS sur storage.objects
    ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

    -- Donner les permissions nécessaires
    GRANT ALL ON storage.objects TO authenticated;
    GRANT ALL ON storage.buckets TO authenticated;
END $$;