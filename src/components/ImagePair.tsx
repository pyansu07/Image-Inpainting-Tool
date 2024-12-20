import React from 'react';

interface ImagePairProps {
  originalImage: string;
  maskImage: string;
}

export const ImagePair: React.FC<ImagePairProps> = ({ originalImage, maskImage }) => {
  return (
    <div className="flex gap-8 mt-8 justify-center">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2">Original Image</h3>
        <img
          src={originalImage}
          alt="Original"
          className="w-[300px] h-[200px] object-contain border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2">Mask</h3>
        <img
          src={maskImage}
          alt="Mask"
          className="w-[300px] h-[200px] object-contain border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};