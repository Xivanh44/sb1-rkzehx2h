import React, { useState, useCallback } from 'react';
import { Package2, Upload, X, Save } from 'lucide-react';
import { uploadImage, deleteImage } from '../../utils/storage';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/useAuthStore';
import { ImageControls } from '../common/ImageControls';
import { RotatableImage } from '../common/RotatableImage';
import { supabase } from '../../lib/supabase';

interface Props {
  itemId: string;
  photoUrl: string | null;
  onPhotoUpdate: (url: string | null) => Promise<void>;
}

export const PhotoManager: React.FC<Props> = ({ itemId, photoUrl, onPhotoUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasUnsavedRotation, setHasUnsavedRotation] = useState(false);
  const { profile } = useAuthStore();
  const isManager = profile?.role === 'manager';

  const handleRotateLeft = useCallback(() => {
    setRotation((prev) => {
      const newRotation = (prev - 90 + 360) % 360;
      setHasUnsavedRotation(true);
      return newRotation;
    });
  }, []);

  const handleRotateRight = useCallback(() => {
    setRotation((prev) => {
      const newRotation = (prev + 90) % 360;
      setHasUnsavedRotation(true);
      return newRotation;
    });
  }, []);

  const handleSaveRotation = useCallback(async () => {
    if (!hasUnsavedRotation) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('items')
        .update({ rotation })
        .eq('id', itemId);

      if (error) throw error;

      setHasUnsavedRotation(false);
      toast.success('Rotation sauvegardée');
    } catch (error) {
      console.error('Failed to save rotation:', error);
      toast.error('Erreur lors de la sauvegarde de la rotation');
    } finally {
      setIsLoading(false);
    }
  }, [itemId, rotation, hasUnsavedRotation]);

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const publicUrl = await uploadImage(file, itemId);
      
      if (photoUrl) {
        try {
          await deleteImage(photoUrl);
        } catch (error) {
          console.warn('Failed to delete old image:', error);
        }
      }

      await onPhotoUpdate(publicUrl);
      setRotation(0);
      setHasUnsavedRotation(false);
      toast.success('Photo mise à jour avec succès');
    } catch (error: any) {
      console.error('Upload failed:', error);
      toast.error(error.message || 'Erreur lors du téléchargement');
    } finally {
      setIsLoading(false);
    }
  }, [itemId, photoUrl, onPhotoUpdate]);

  const handleDelete = useCallback(async () => {
    if (!photoUrl) return;

    setIsLoading(true);
    try {
      await deleteImage(photoUrl);
      await onPhotoUpdate(null);
      setRotation(0);
      setHasUnsavedRotation(false);
      toast.success('Photo supprimée avec succès');
    } catch (error: any) {
      console.error('Delete failed:', error);
      toast.error('Erreur lors de la suppression');
    } finally {
      setIsLoading(false);
    }
  }, [photoUrl, onPhotoUpdate]);

  return (
    <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
      {photoUrl ? (
        <>
          <RotatableImage
            src={photoUrl}
            alt="Article"
            rotation={rotation}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>';
              target.className = 'object-contain w-full h-full p-8 text-gray-300';
            }}
          />
          {isManager && !isLoading && (
            <div className="absolute top-2 right-2 flex space-x-2">
              <ImageControls
                onRotateLeft={handleRotateLeft}
                onRotateRight={handleRotateRight}
              />
              {hasUnsavedRotation && (
                <button
                  onClick={handleSaveRotation}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  title="Sauvegarder la rotation"
                >
                  <Save className="w-4 h-4 text-blue-600" />
                </button>
              )}
              <label className="cursor-pointer p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                <input
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                />
                <Upload className="w-4 h-4 text-gray-600" />
              </label>
              <button
                onClick={handleDelete}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {isManager && !isLoading ? (
            <label className="cursor-pointer flex flex-col items-center">
              <input
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
              />
              <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Ajouter une photo</span>
            </label>
          ) : (
            <Package2 className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
          )}
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};