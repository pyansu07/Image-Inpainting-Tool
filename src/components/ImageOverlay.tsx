import React from 'react';

interface ImageOverlayProps {
  originalImage: string;
  maskImage: string;
}

export const ImageOverlay: React.FC<ImageOverlayProps> = ({ originalImage, maskImage }) => {
  return (
    <div className="flex justify-center gap-8 mt-8">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2">Original Image</h3>
        <img
          src={originalImage}
          alt="Original"
          className="w-[300px] h-[200px] object-contain border border-gray-300 rounded shadow-md"
        />
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2">Mask</h3>
        <img
          src={maskImage}
          alt="Mask"
          className="w-[300px] h-[200px] object-contain border border-gray-300 rounded shadow-md"
        />
      </div>
    </div>
  );
}; 