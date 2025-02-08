'use client';

import { ChangeEvent } from "react";

export default function CompressPage() {

  const fetchBlob = async (fileLinks: Array<File>) => {
    console.log(`Uploading ${fileLinks.length} files`);
    const formData = new FormData();
    
    // Append files directly without creating blob URLs
    fileLinks.forEach((file) => {
      formData.append('files', file);
    });

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
      
      // Create a link element and trigger download
      const a = document.createElement('a');
      a.href = url;
      // Set appropriate filename based on number of files
      a.download = 'compressed-images.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error compressing images:', error);
      alert('Failed to compress images. Please try again.');
    }
  };

  const callCompress = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;

    const fileLinks: File[] = Array.from(files);
    if (fileLinks.length > 5) {
      return;
    }

    const FILESIZE_LIMIT = 15 * 1024 * 1024;
    // 15MB per file
    const acceptedTypes = ['image/png', 'image/jpeg'];

    for (const file of fileLinks) {
      if (file.size > FILESIZE_LIMIT) {
        return;
      }
      if (!acceptedTypes.includes(file.type)) {
        return;
      }
    }

    fetchBlob(fileLinks);
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
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF
            </p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
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
    </div>
  );
}
