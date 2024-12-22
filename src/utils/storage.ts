import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (file: File, itemId: string): Promise<string> => {
  try {
    // Validation
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('La taille du fichier ne doit pas dépasser 5MB');
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      throw new Error('Format de fichier non supporté. Utilisez JPG, PNG ou WebP');
    }

    // Générer un nom de fichier unique
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${itemId}/${uuidv4()}.${fileExt}`;

    // Upload
    const { data, error } = await supabase.storage
      .from('inventory')
      .upload(fileName, file, {
        upsert: true,
        contentType: file.type,
        cacheControl: '3600'
      });

    if (error) throw error;
    if (!data?.path) throw new Error('Upload failed - no path returned');

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('inventory')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const deleteImage = async (url: string): Promise<void> => {
  try {
    const path = url.split('/inventory/')[1];
    if (!path) throw new Error('Invalid image URL format');

    const { error } = await supabase.storage
      .from('inventory')
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};