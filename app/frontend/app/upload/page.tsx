'use client';

import { useState, useRef } from 'react';
import { uploadFiles } from 'lib/api';
import Link from 'next/link';

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      setFiles(fileArray);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      setUploadResult({
        success: false,
        message: 'Please select files to upload'
      });
      return;
    }
    
    setIsUploading(true);
    setUploadResult(null);
    
    try {
      const result = await uploadFiles(files);
      setUploadResult({
        success: true,
        message: result.message || 'Files uploaded and embedded successfully'
      });
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      setUploadResult({
        success: false,
        message: error.response?.data?.detail || 'Error uploading files'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full">
        <div className="mb-8">
          <Link href="/" className="text-blue-500 hover:text-blue-700">← Back to Home</Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-8">Upload Documents</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select PDF, DOCX, or TXT files
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={isUploading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
                  disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Upload and Embed'}
              </button>
            </div>
          </form>
          
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Files to upload:</h3>
              <ul className="list-disc pl-5">
                {files.map((file, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {uploadResult && (
            <div className={`mt-6 p-4 rounded-md ${uploadResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {uploadResult.message}
            </div>
          )}
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Supported File Types</h2>
          <ul className="list-disc pl-5">
            <li>PDF (.pdf) - For documents, reports, and papers</li>
            <li>Word Documents (.docx) - For Microsoft Word documents</li>
            <li>Text Files (.txt) - For plain text documents</li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            Files will be uploaded, processed, and embedded using AI technology for semantic search capabilities.
          </p>
        </div>
      </div>
    </main>
  );
} 