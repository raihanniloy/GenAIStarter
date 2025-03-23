'use client';

import { useState } from 'react';
import { searchDocuments, SearchResult } from 'lib/api';
import Link from 'next/link';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }
    
    setIsSearching(true);
    setError('');
    
    try {
      const response = await searchDocuments(query);
      setResults(response.results || []);
      if (response.results.length === 0) {
        setError('No documents found matching your query');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error searching documents');
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full">
        <div className="mb-8">
          <Link href="/" className="text-blue-500 hover:text-blue-700">← Back to Home</Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-8">Search Documents</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your search query..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded
                  disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          {results.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              <div className="space-y-6">
                {results.map((result) => (
                  <div key={result.id} className="p-4 border border-gray-200 rounded-md">
                    <h3 className="text-lg font-medium text-blue-600">{result.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Similarity: {(result.similarity * 100).toFixed(2)}%</p>
                    <div className="mt-2">
                      <p className="text-gray-700">
                        {result.content.length > 300 
                          ? `${result.content.substring(0, 300)}...` 
                          : result.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Search Tips</h2>
          <ul className="list-disc pl-5">
            <li>Use natural language questions to get the best results</li>
            <li>Try different phrasings if you don't find what you're looking for</li>
            <li>Search results are ordered by semantic similarity to your query</li>
            <li>The system uses AI to understand the meaning behind your questions</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 