
import React, { useState, useRef } from 'react';
import { SOCIAL_MEDIA_PRESETS } from '../constants';
import { SocialPreset } from '../types';
import { processImage } from '../utils/imageProcessor';

const UploadIcon: React.FC = () => (
  <svg className="w-12 h-12 mx-auto text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ImageResizerTool: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ w: number; h: number } | null>(null);

  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<SocialPreset>(SOCIAL_MEDIA_PRESETS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file (JPEG, PNG, GIF, etc.).');
        return;
      }
      setError(null);
      setOriginalImage(file);
      const url = URL.createObjectURL(file);
      setOriginalImageUrl(url);
      setProcessedImageUrl(null);

      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ w: img.width, h: img.height });
      };
      img.src = url;
    }
  };
  
  const handleProcessClick = async () => {
    if (!originalImage) {
      setError('Please upload an image first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setProcessedImageUrl(null);

    try {
      const dataUrl = await processImage(originalImage, selectedPreset.width, selectedPreset.height);
      setProcessedImageUrl(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during processing.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownloadClick = () => {
    if (!processedImageUrl) return;
    const link = document.createElement('a');
    link.href = processedImageUrl;
    const presetName = selectedPreset.name.replace(/\s+/g, '-').toLowerCase();
    link.download = `resized-${presetName}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl shadow-2xl p-4 sm:p-8 border border-purple-500/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="flex flex-col space-y-6">
                <h2 className="text-2xl font-bold text-center text-purple-300">1. Upload Your Image</h2>
                <div 
                  className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                    {originalImageUrl ? (
                        <img src={originalImageUrl} alt="Original preview" className="max-w-full max-h-80 mx-auto rounded-md object-contain" />
                    ) : (
                        <div className="text-gray-400">
                            <UploadIcon />
                            <p className="mt-2 text-lg">Click to upload or drag & drop</p>
                            <p className="text-sm">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    )}
                </div>
                 {originalDimensions && (
                    <p className="text-center text-gray-400">Original Dimensions: {originalDimensions.w} x {originalDimensions.h} px</p>
                )}
            </div>

            {/* Controls & Output Panel */}
            <div className="flex flex-col space-y-6">
                <h2 className="text-2xl font-bold text-center text-purple-300">2. Configure & Download</h2>
                
                {/* Controls */}
                <div className="bg-gray-900/50 p-4 rounded-lg space-y-4">
                    <div>
                        <label htmlFor="preset-select" className="block mb-2 text-sm font-medium text-gray-300">Select Platform:</label>
                        <select
                            id="preset-select"
                            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                            value={selectedPreset.name}
                            onChange={(e) => {
                                const newPreset = SOCIAL_MEDIA_PRESETS.find(p => p.name === e.target.value);
                                if (newPreset) setSelectedPreset(newPreset);
                            }}
                            disabled={!originalImage}
                        >
                            {SOCIAL_MEDIA_PRESETS.map(preset => (
                                <option key={preset.name} value={preset.name}>
                                    {preset.name} ({preset.width}x{preset.height})
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleProcessClick}
                        disabled={!originalImage || isLoading}
                        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center text-lg"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : 'Resize & Crop'}
                    </button>
                </div>
                
                {error && <p className="text-red-400 text-center">{error}</p>}

                {/* Output */}
                <div className="flex-grow flex flex-col justify-center items-center bg-gray-900/50 rounded-lg p-4 min-h-[200px]">
                    {processedImageUrl ? (
                        <>
                          <img src={processedImageUrl} alt="Processed preview" className="max-w-full max-h-60 mx-auto rounded-md object-contain mb-4"/>
                          <p className="text-center text-gray-400 mb-4">Output Dimensions: {selectedPreset.width} x {selectedPreset.height} px</p>
                          <button
                            onClick={handleDownloadClick}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
                          >
                            Download Image
                          </button>
                        </>
                    ) : (
                        <p className="text-gray-500 text-center">Your processed image will appear here.</p>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ImageResizerTool;
