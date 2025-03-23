'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">AI-Powered Documentation Search</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <Link href="/upload" 
                className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors hover:border-gray-600 hover:bg-gray-100">
            <h2 className="mb-3 text-2xl font-semibold">
              Upload Documents{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Upload and embed your documents for AI-powered search.
            </p>
          </Link>

          <Link href="/search"
                className="group rounded-lg border border-gray-300 px-5 py-4 transition-colors hover:border-gray-600 hover:bg-gray-100">
            <h2 className="mb-3 text-2xl font-semibold">
              Search Documents{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Search your documents using advanced AI technology.
            </p>
          </Link>
        </div>

        <div className="mt-16 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">About this Application</h2>
          <p className="text-gray-700">
            This application uses AI to embed and search through your documents. 
            Upload PDFs, Word documents, or text files, and search through them 
            using natural language queries. The system uses OpenAI's embeddings and 
            Supabase's vector storage to provide powerful semantic search capabilities.
          </p>
        </div>
      </div>
    </main>
  );
} 