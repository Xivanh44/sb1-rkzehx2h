import React from 'react';
import { RotateCcw, RotateCw } from 'lucide-react';

interface ImageControlsProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
  className?: string;
}

export const ImageControls: React.FC<ImageControlsProps> = ({
  onRotateLeft,
  onRotateRight,
  className = ''
}) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      <button
        onClick={onRotateLeft}
        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        title="Rotation gauche"
      >
        <RotateCcw className="w-4 h-4 text-gray-600" />
      </button>
      <button
        onClick={onRotateRight}
        className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        title="Rotation droite"
      >
        <RotateCw className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};