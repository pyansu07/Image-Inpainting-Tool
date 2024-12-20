import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Minus, Plus, Download, Upload, Trash2 } from 'lucide-react';

interface CanvasProps {
  onMaskGenerated: (originalImage: string, maskImage: string) => void;
  onOriginalImageSet: (originalImage: string) => void;}

export const Canvas: React.FC<CanvasProps> = ({ onMaskGenerated }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [brushSize, setBrushSize] = useState(20);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [originalImage, setOriginalImage] = useState<string>(''); 
  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
        width: 600,
        height: 400,
      });

      fabricCanvas.freeDrawingBrush.color = 'white';
      fabricCanvas.freeDrawingBrush.width = brushSize;
      setCanvas(fabricCanvas);

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.freeDrawingBrush.width = brushSize;
    }
  }, [brushSize, canvas]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && canvas) {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://image-inpainting-tool-m5cs.onrender.com/upload/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedImage = e.target?.result as string;
        // setOriginalImage(uploadedImage); 
        fabric.Image.fromURL(uploadedImage, (img) => {
          canvas.clear();
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width! / img.width!,
            scaleY: canvas.height! / img.height!,
          });
        });
        onOriginalImageSet(uploadedImage);

      };
      reader.readAsDataURL(file);
    }
  };

  const clearCanvas = () => {
    if (canvas) {
      canvas.clear();
      canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
    }
  };

  const exportMask = async () => {
    if (canvas) {
      const originalImage = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width!;
      tempCanvas.height = canvas.height!;
      const ctx = tempCanvas.getContext('2d')!;

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

      const objects = canvas.getObjects();
      objects.forEach((obj) => {
        if (obj instanceof fabric.Path) {
          const path = obj as fabric.Path;
          ctx.strokeStyle = 'white';
          ctx.lineWidth = path.strokeWidth!;
          ctx.beginPath();
          const points = path.path;
          points?.forEach((point) => {
            if (point[0] === 'M') {
              ctx.moveTo(point[1], point[2]);
            } else if (point[0] === 'L') {
              ctx.lineTo(point[1], point[2]);
            }
          });
          ctx.stroke();
        }
      });

      const maskImage = tempCanvas.toDataURL('image/png');

      const maskBlob = await (await fetch(maskImage)).blob();
      const maskFormData = new FormData();
      maskFormData.append('file', maskBlob, 'mask.png');

      await fetch('https://image-inpainting-tool-m5cs.onrender.com/upload/', {
        method: 'POST',
        body: maskFormData,
      });

      onMaskGenerated(canvas.toDataURL(), maskImage);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          <Upload size={20} /> Upload Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBrushSize(Math.max(1, brushSize - 5))}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
          >
            <Minus size={20} />
          </button>
          <span className="w-16 text-center">
            Brush: {brushSize}px
          </span>
          <button
            onClick={() => setBrushSize(Math.min(50, brushSize + 5))}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
          >
            <Plus size={20} />
          </button>
        </div>
        <button
          onClick={clearCanvas}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          <Trash2 size={20} /> Clear
        </button>
        <button
          onClick={exportMask}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          <Download size={20} /> Export Mask
        </button>
      </div>
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <canvas ref={canvasRef} className="w-full h-96" />
      </div>
    </div>
  );
};
