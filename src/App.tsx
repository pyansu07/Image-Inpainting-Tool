import { useState } from 'react';
import { Canvas } from './components/Canvas';
import { ImageOverlay } from './components/ImageOverlay';
import { Brush } from 'lucide-react';

function App() {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [maskImage, setMaskImage] = useState<string>('');

  const handleMaskGenerated = (original: string, mask: string) => {
    setOriginalImage(original);
    setMaskImage(mask);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Brush className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">
              Image Inpainting Tool
            </h1>
          </div>

          <Canvas
            onMaskGenerated={handleMaskGenerated}
            onOriginalImageSet={setOriginalImage}
          />

          {originalImage && maskImage && (
            <ImageOverlay originalImage={originalImage} maskImage={maskImage} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;