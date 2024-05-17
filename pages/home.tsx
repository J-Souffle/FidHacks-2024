// components/Home.tsx
import React, { ChangeEvent, useState, useRef } from 'react';
import axios from 'axios';
import "../app/globals.css";
import ObjectDetectionResults from '../components/ObjectDetectionResults';
import UserQuery from '../components/UserQuery'; // Import the ChatGPT component

const Home: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showText, setShowText] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputClick = () => {
    inputRef.current?.click();
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    handleImageUpload(file);
  };

  const processImage = async () => {
    try {
      if (!image) {
        console.error('No image selected');
        return;
      }
  
      const predictionUrl = `https://eastus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/fe728ec0-d1b1-416d-8992-fa54b05a4221/detect/iterations/Iteration12/image`;
  
      const formData = new FormData();
      formData.append('image', dataURItoBlob(image)); // Convert data URI to Blob
  
      const response = await axios.post(predictionUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Prediction-Key': 'c4b12219b9e8480385b7c8b01a6a12dd', // Replace with your prediction key
        },
      });
  
      console.log('Response:', response);
  
      const predictions = response.data.predictions.filter((prediction: { probability: number }) => prediction.probability >= 0.2); // Filter predictions with probability >= 0.3
      console.log('Prediction results:', predictions);
      setPredictions(predictions);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };
  
  

  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const toggleTextDisplay = () => {
    setShowText(!showText);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div
        className="h-48 w-full flex items-center justify-center border border-gray-300 rounded-lg mt-8 bg-black text-white"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleFileInputClick}
      >
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileInputChange}
          className="hidden"
        />
        <label htmlFor="fileInput">Drag and drop your files here or click to upload</label>
      </div>

      {image && (
        <div className="mt-4">
          <img src={image} alt="Uploaded Image" className="max-w-full h-auto" />
        </div>
      )}

      <button onClick={processImage} disabled={!image} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Process Image
      </button>

      <button onClick={toggleTextDisplay} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Refresh
      </button>

      {showText && (
        <div className="mt-4">
          <h2>Predictions:</h2>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index}>
                {prediction.tagName}: {prediction.probability.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {image && predictions.length > 0 && (
        <div className="mt-4">
          <ObjectDetectionResults imageUrl={image} predictions={predictions} />
        </div>
      )}
      
      <UserQuery />
    </main>
  );
};

export default Home;
