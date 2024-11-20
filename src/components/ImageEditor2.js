import React, { useRef, useEffect } from 'react';
import * as fabric from 'fabric';
import { Button } from '@/components/ui/button';

const ImageEditor2 = ({ imageUrl, onSave }) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    if (canvasContainerRef.current) {
      const canvas = new fabric.Canvas(canvasContainerRef.current, {
        width: 600,
        height: 400,
        backgroundColor: '#f0f0f0',
      });

      canvasRef.current = canvas;

      // Create a new image element and load the image manually
      const imgElement = new Image();
      imgElement.src = imageUrl;
      imgElement.onload = () => {
        const img = new fabric.Image(imgElement, {
          scaleX: 600 / imgElement.width,  // Adjust image width
          scaleY: 400 / imgElement.height, // Adjust image height
        });
        canvas.add(img);
        canvas.renderAll();
      };

      return () => {
        canvas.dispose();
      };
    }
  }, [imageUrl]);

  const addCircle = () => {
    const circle = new fabric.Circle({
      radius: 30,
      fill: 'rgba(255, 0, 0, 0.5)',
      stroke: 'red',
      strokeWidth: 2,
      left: 100,
      top: 100,
    });
    canvasRef.current?.add(circle);
    canvasRef.current?.renderAll();
  };

  const removeCircle = () => {
    const objects = canvasRef.current?.getObjects();
    objects?.forEach((obj) => {
      if (obj.type === 'circle') {
        canvasRef.current?.remove(obj);
        canvasRef.current?.renderAll();
      }
    });
  };

  const saveCanvas = () => {
    const dataURL = canvasRef.current?.toDataURL({
      format: 'png',
      quality: 1,
    });

    if (dataURL && onSave) {
      onSave(dataURL); // Trigger the onSave callback with the saved image data
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Edit Image</h2>

      <div className="mb-6">
        <div className="border-2 border-gray-200 rounded-lg flex justify-center">
          <canvas ref={canvasContainerRef} className="w-full h-auto" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button type="button" onClick={addCircle}>Add Circle</Button>
        <Button type="button" onClick={removeCircle}>Remove Circle</Button>
        <Button type="button" onClick={saveCanvas}>Save Image</Button>
      </div>
    </div>
  );
};

export default ImageEditor2;
