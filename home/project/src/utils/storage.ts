import { supabase } from '../lib/supabase';

export const uploadImage = async (file: File, path: string): Promise<string> => {
  try {
    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('La taille du fichier ne doit pas dépasser 5MB');
    }

    // Vérifier le type de fichier
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      throw new Error('Format de fichier non supporté. Utilisez JPG, PNG ou WebP');
    }

    // Upload du fichier
    const { data, error } = await supabase.storage
      .from('inventory')
      .upload(path, file, {
        upsert: true,
        cacheControl: '3600'
      });

    if (error) throw error;
    if (!data?.path) throw new Error('Upload failed - no path returned');

    // Obtenir l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from('inventory')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error: any) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const deleteImage = async (url: string): Promise<void> => {
  try {
    // Extraire le chemin du fichier de l'URL
    const path = url.split('/storage/v1/object/public/inventory/')[1];
    if (!path) throw new Error('Invalid image URL');

    const { error } = await supabase.storage
      .from('inventory')
      .remove([path]);

    if (error) throw error;
  } catch (error: any) {
    console.error('Delete error:', error);
    throw error;
  }
};