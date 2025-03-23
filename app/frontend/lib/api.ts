import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Document Types
export interface Document {
  id?: string;
  title: string;
  content: string;
}

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  similarity: number;
}

// API Functions
export const embedDocument = async (document: Document): Promise<{ message: string }> => {
  const response = await apiClient.post('/embed/', document);
  return response.data;
};

export const searchDocuments = async (query: string): Promise<{ results: SearchResult[] }> => {
  const response = await apiClient.post('/search/', { query });
  return response.data;
};

export const uploadFiles = async (files: File[]): Promise<{ message: string; results: any[] }> => {
  const formData = new FormData();
  
  files.forEach(file => {
    formData.append('files', file);
  });
  
  const response = await axios.post(`${API_URL}/embed-multiple/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export default apiClient; 