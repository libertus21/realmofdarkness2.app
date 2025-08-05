import React from 'react';
import TestPDFGenerator from '../components/Sheet/PDFGenerator/TestPDFGenerator';
import PDFFieldDebugger from '../components/Sheet/PDFGenerator/PDFFieldDebugger';
import SimplePDFExample from '../components/Sheet/PDFGenerator/SimplePDFExample';
import TestFieldMapping from '../components/Sheet/PDFGenerator/TestFieldMapping';

/**
 * Temporary route for testing the PDF generator
 */
const TestPDF = () => {
  return (
    <div style={{ padding: '20px' }}>
      <PDFFieldDebugger />
      <hr style={{ margin: '40px 0' }} />
      <TestFieldMapping />
      <hr style={{ margin: '40px 0' }} />
      <SimplePDFExample />
      <hr style={{ margin: '40px 0' }} />
      <TestPDFGenerator />
    </div>
  );
};

export default TestPDF; 