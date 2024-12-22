import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  currentImageUrl: string | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, currentImageUrl }) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="relative group cursor-pointer"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="cursor-pointer block"
      >
        {currentImageUrl ? (
          <div className="relative">
            <img
              src={currentImageUrl}
              alt="Article"
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
              <Upload className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-48 bg-gray-100 rounded-md border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Glissez une image ici ou cliquez pour en sélectionner une
              </p>
            </div>
          </div>
        )}
      </label>
    </div>
  );
};