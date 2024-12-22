import React, { useState } from 'react';

interface RotatableImageProps {
  src: string;
  alt: string;
  rotation: number;
  onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  className?: string;
}

export const RotatableImage: React.FC<RotatableImageProps> = ({
  src,
  alt,
  rotation,
  onError,
  className = ''
}) => {
  const [isPortrait, setIsPortrait] = useState(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement;
    setIsPortrait(img.naturalHeight > img.naturalWidth);
  };

  return (
    <div className="w-full h-full aspect-w-16 aspect-h-9">
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          className={`
            absolute
            max-w-[90%]
            max-h-[90%]
            ${isPortrait ? 'h-full' : 'w-full'}
            ${className}
          `}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 0.3s ease',
            objectFit: 'contain'
          }}
          onError={onError}
        />
      </div>
    </div>
  );
};