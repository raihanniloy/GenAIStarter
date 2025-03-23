# AI-Powered Documentation Search

A full-stack application for AI-powered document search and embedding using OpenAI and Supabase vector storage.

## Overview

This application allows you to:
- Upload documents (PDF, DOCX, TXT files)
- Extract text content from these documents
- Generate vector embeddings using OpenAI's embedding models
- Store documents with their embeddings in Supabase
- Search through documents using semantic similarity

## Repository Structure

This is a monorepo containing:

```
app/
├── backend/     # FastAPI backend
│   ├── main.py  # API endpoints and core functionality
│   └── .env     # Environment variables (not committed)
│
├── frontend/    # Next.js frontend
    ├── app/     # Next.js app directory (pages)
    ├── src/lib/ # Shared libraries and API client
    └── ...      # Configuration files
```

## Technology Stack

### Backend
- **FastAPI**: A modern, high-performance web framework for building APIs
- **OpenAI API**: Used for generating embeddings via text-embedding-ada-002 model
- **Supabase**: Vector database for storing documents and embeddings
- **PyPDF2/python-docx**: For parsing PDF and DOCX files

### Frontend
- **Next.js**: React framework for building the user interface
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Axios**: HTTP client for API requests

## Setup

### Prerequisites

- Python 3.9+
- Node.js 16+
- npm or yarn
- Supabase account with PostgreSQL database and pgvector extension
- OpenAI API key

### Environment Variables

1. Create a `.env` file in the `app/backend` directory:

```
OPENAI_API_KEY=your_openai_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

2. Create a `.env.local` file in the `app/frontend` directory:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Database Setup

Set up a Supabase project with the `pgvector` extension and create a table named `documentation` with the following structure:

```sql
CREATE TABLE documentation (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1536)
);

-- Create a search function using pgvector
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(1536),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE(
  id INT,
  title VARCHAR(255),
  content TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    documentation.id,
    documentation.title,
    documentation.content,
    1 - (documentation.embedding <=> query_embedding) AS similarity
  FROM documentation
  WHERE 1 - (documentation.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;
```

### Installation

1. Install dependencies:

```bash
# Install root project dependencies
npm install

# Install backend dependencies
npm run install:backend

# Install frontend dependencies
npm run install:frontend

# Or all at once
npm run install:all
```

## Development

1. Start both backend and frontend servers concurrently:

```bash
npm run dev
```

Or start them separately:

```bash
# Start backend only
npm run dev:backend

# Start frontend only
npm run dev:frontend
```

## API Endpoints

### Backend API (port 8000)

- `POST /embed/`: Embed a document provided as JSON
- `POST /embed-multiple/`: Upload and embed multiple files
- `POST /search/`: Search documents using a query string

## Usage

1. Visit `http://localhost:3000` to access the web interface
2. Use the "Upload Documents" page to upload and embed documents
3. Use the "Search Documents" page to search through your document collection

## Features

- **Document Upload**: Support for PDF, DOCX, and TXT files
- **Semantic Search**: Find relevant documents based on meaning, not just keywords
- **Responsive UI**: Works on desktop and mobile devices
- **Real-time Feedback**: Visual indicators for upload and search status 