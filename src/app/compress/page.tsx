'use client';

import { ChangeEvent, useState } from "react";

export default function CompressPage() {
  const [image, setImage] = useState<{ original: string; compressed: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlob = async (fileLink: File) => {
    setIsLoading(true);
    console.log(`Uploading file`);
    const formData = new FormData();
    
    // Create preview URLs for original images
    const originalUrl = URL.createObjectURL(fileLink);
    
    formData.append('file', fileLink);
    try {
      const response = await fetch('/api/compress', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to compress images');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Update images state with original and compressed URLs
      setImage({
        original: originalUrl,
        compressed: url
      });
    } catch (error) {
      console.error('Error compressing images:', error);
      alert('Failed to compress images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const callCompress = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;


    const FILESIZE_LIMIT = 15 * 1024 * 1024;
    // 15MB per file
    const acceptedTypes = ['image/png', 'image/jpeg'];

    if (files[0].size > FILESIZE_LIMIT) {
      return;
    }
    if (!acceptedTypes.includes(files[0].type)) {
      return;
    }

    fetchBlob(files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-start md:justify-center min-h-[calc(100vh-4rem)] p-4 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">
        Compress Your Image
      </h1>
      <main className="flex items-center justify-center w-full max-w-2xl px-2 md:px-0">
        <label 
          htmlFor="dropzone-file" 
          className="flex flex-col items-center justify-center w-full h-48 md:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer 
            bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 
            dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600
            transition-colors duration-200"
        >
          <div className="flex flex-col items-center justify-center p-4 md:pt-5 md:pb-6 text-center">
            <svg 
              className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-4 text-gray-500 dark:text-gray-400" 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 20 16"
            >
              <path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" 
              />
            </svg>
            <p className="mb-1 md:mb-2 text-sm md:text-base text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="upload-text">
              PNG or JPEG
            </p>
            <p className="upload-text">
              (Max file zie: 15MB)
            </p>
          </div>
          <input 
            id="dropzone-file" 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={async (e) => callCompress(e)}
          />
        </label>
      </main>
      
      {isLoading && (
        <div className="mt-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Compressing images...</p>
        </div>
      )}
      
      {image && (
        <div className="flex flex-col items-center justify-center mx-auto mt-8 w-full max-w-[1200px]">
          <h2 className="text-2xl font-semibold mb-6 text-center">Compressed Images</h2>
          <div className="grid grid-cols-1 gap-8 w-full">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-center">Original</h3>
              <div className="image-container">
                <img 
                  src={image.original} 
                  alt={`Original`}
                  className="image-preview"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-center">Compressed</h3>
              <div className="image-container">
                <img 
                  src={image.compressed} 
                  alt={`Compressed`}
                  className="image-preview"
                />
              </div>
              <a
                href={image.compressed}
                download="compressed-image"
                className="btn-primary mt-2"
              >
                Download Compressed Image
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
