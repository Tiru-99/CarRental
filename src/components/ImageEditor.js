import React, { useRef, useEffect, useState } from "react";
import * as fabric from "fabric";

const Button = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="px-4 py-2 bg-black text-white font-semibold rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300"
  >
    {children}
  </button>
);

const FileInput = ({ onChange }) => (
  <div className="mb-4">
    <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1">
      Upload Image
    </label>
    <input
      id="imageUpload"
      type="file"
      accept="image/*"
      onChange={onChange}
      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
    />
  </div>
);

const ImageDrawForm = ({onSave}) => {
  const canvasRef = useRef();
  const [imageFile, setImageFile] = useState();
  const canvasContainerRef = useRef();

  useEffect(() => {
    if (canvasContainerRef.current) {
      const canvas = new fabric.Canvas(canvasContainerRef.current, {
        width: 600,
        height: 400,
        backgroundColor: "#f0f0f0",
      });
      canvasRef.current = canvas;

      return () => {
        canvas.dispose();
      };
    }
  }, []);

 

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result;
        img.onload = () => {
          const fabricImg = new fabric.Image(img, {
            scaleX: 600 / img.width,
            scaleY: 400 / img.height,
          });
          canvasRef.current?.clear();
          canvasRef.current?.add(fabricImg);
          canvasRef.current?.renderAll();
        };
      };
      reader.readAsDataURL(file);
    }
  };

 

  const addCircle = () => {
    const circle = new fabric.Circle({
      radius: 30,
      fill: "rgba(255, 0, 0, 0.5)",
      stroke: "red",
      strokeWidth: 2,
      left: 100,
      top: 100,
    });
    canvasRef.current?.add(circle);
  };

  const removeImage = () => {
    const objects = canvasRef.current?.getObjects();
    objects?.forEach((obj) => {
      if (obj.type === "image") {
        canvasRef.current?.remove(obj);
      }
    });
    canvasRef.current?.renderAll();
  };

  const removeCircle = () => {
    const objects = canvasRef.current?.getObjects();
    objects?.forEach((obj) => {
      if (obj.type === "circle") {
        canvasRef.current?.remove(obj);
        canvasRef.current?.renderAll();
        return;
      }
    });
  };

  const saveCanvas = () => {
    const dataURL = canvasRef.current?.toDataURL({
      format : 'png',
      quality : 1 , 
    });

    if(dataURL && onSave){
      onSave(dataURL);
    }

    
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Upload and Draw on Image</h1>

    <div>
      <FileInput onChange={handleImageUpload} />

      <div className="mb-6 ">
        <div className="border-2 border-gray-200 rounded-lg flex justify-center">
          <canvas
            ref={canvasContainerRef}
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button onClick={addCircle}>Add Circle</Button>
        <Button onClick={removeCircle}>Remove Circle</Button>
        <Button onClick={removeImage}>Remove Image</Button>
        <Button onClick={saveCanvas}>Save Image</Button>
      </div>
      </div>
    </div>
  );
};

export default ImageDrawForm;