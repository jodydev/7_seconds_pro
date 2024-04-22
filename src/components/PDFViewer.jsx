import React from 'react';

export default function PDFViewer({ pdfUrl }) {
  return (
    <div data-aos="fade-left">
      <embed src={pdfUrl} type="application/pdf" width="100%" height="95%" className="my-10 mx-5 shadow-2xl rounded-3xl" />
    </div>
  );
}
