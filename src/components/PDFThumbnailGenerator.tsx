import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FileText } from 'lucide-react';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFThumbnailGeneratorProps {
  pdfUrl: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

const PDFThumbnailGenerator: React.FC<PDFThumbnailGeneratorProps> = ({
  pdfUrl,
  width = 64,
  height = 80,
  className = '',
  alt = 'PDF Thumbnail'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [numPages, setNumPages] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const onDocumentLoadError = (error: any) => {
    console.error('Error loading PDF for thumbnail:', error);
    setError(true);
    setIsLoading(false);
  };

  const onPageRenderSuccess = () => {
    setIsLoading(false);
  };

  const onPageRenderError = (error: any) => {
    console.error('Error rendering PDF page:', error);
    setError(true);
    setIsLoading(false);
  };

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 border border-gray-200 rounded ${className}`}
        style={{ width, height }}
      >
        <FileText className="h-6 w-6 text-gray-400" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 border border-gray-200 rounded"
        >
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
        </div>
      )}

      <div
        className={`overflow-hidden rounded border border-gray-200 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
        style={{ width, height }}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading=""
        >
          <Page
            pageNumber={1}
            width={width}
            height={height}
            onRenderSuccess={onPageRenderSuccess}
            onRenderError={onPageRenderError}
            loading=""
            error=""
          />
        </Document>
      </div>
    </div>
  );
};

export default PDFThumbnailGenerator;