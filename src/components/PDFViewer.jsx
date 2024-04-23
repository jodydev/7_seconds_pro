import React from 'react';

export default function PDFViewer({ pdfUrl }) {
  return (
    <div className="my-10" data-aos="fade-left">
      <embed src={pdfUrl} type="application/pdf" width="100%" height="100%" className="shadow-2xl rounded-2xl" />
    </div>
  );
}
