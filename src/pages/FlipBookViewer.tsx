import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SimplePDFViewer from '@/components/SimplePDFViewer';

const FlipBookViewer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const pdfFile = searchParams.get('pdf') || 'CondoLiving.pdf';
  const language = searchParams.get('lang') || 'english';
  const title = language === 'hindi' ? 'द क्लिफ न्यूज़ - हिंदी संस्करण' : 'The Cliff News - English Edition';
  const pdfUrl = `/sample-pdfs/${pdfFile}`;

  return (
    <SimplePDFViewer
      pdfUrl={pdfUrl}
      title={title}
      onClose={() => navigate('/')}
    />
  );
};

export default FlipBookViewer;