import React, { useState } from 'react';
import PDFGeneratorFactory from './PDFGeneratorFactory';

/**
 * Example component showing how to use the new editable PDF generator
 * This demonstrates the difference between the old and new approaches
 */
const PDFGeneratorExample = ({ characterData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatorType, setGeneratorType] = useState('v5');
  const [debugMode, setDebugMode] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Create generator based on type
      const generator = PDFGeneratorFactory.createGenerator(generatorType, characterData, {
        debug: debugMode
      });

      // Generate the PDF
      await generator.generate();
      
      console.log('PDF generado exitosamente!');
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert(`Error generando PDF: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const previewPDF = async () => {
    try {
      const generator = PDFGeneratorFactory.createGenerator(generatorType, characterData, {
        debug: debugMode
      });

      // For editable PDFs, we can get a preview
      if (generatorType === 'v5_editable') {
        await generator.loadTemplate();
        const base64 = await generator.getBase64();
        
        // Open in new window
        const newWindow = window.open();
        newWindow.document.write(`
          <html>
            <head><title>Vista previa PDF</title></head>
            <body style="margin:0;padding:0;">
              <embed src="${base64}" width="100%" height="100%" type="application/pdf">
            </body>
          </html>
        `);
      } else {
        alert('Vista previa solo disponible para PDFs editables');
      }
    } catch (error) {
      console.error('Error en vista previa:', error);
      alert(`Error en vista previa: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>Generador de PDF - Ejemplo</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          <strong>Tipo de generador:</strong>
          <select 
            value={generatorType} 
            onChange={(e) => setGeneratorType(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="v5">Vampire 5th (Generado desde cero)</option>
            <option value="v5_editable">Vampire 5th (Editable - Recomendado)</option>
            <option value="w5">Werewolf 5th</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>
          <input 
            type="checkbox" 
            checked={debugMode} 
            onChange={(e) => setDebugMode(e.target.checked)}
          />
          Modo debug (muestra campos disponibles)
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={generatePDF} 
          disabled={isGenerating}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            backgroundColor: '#8B0000',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isGenerating ? 'not-allowed' : 'pointer'
          }}
        >
          {isGenerating ? 'Generando...' : 'Generar PDF'}
        </button>

        {generatorType === 'v5_editable' && (
          <button 
            onClick={previewPDF}
            style={{ 
              padding: '10px 20px',
              backgroundColor: '#4B0082',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Vista previa
          </button>
        )}
      </div>

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '5px',
        fontSize: '14px'
      }}>
        <h3>Información del personaje:</h3>
        <pre style={{ whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(characterData, null, 2)}
        </pre>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#e8f4f8', 
        borderRadius: '5px' 
      }}>
        <h3>Ventajas del generador editable:</h3>
        <ul>
          <li>✅ Mantiene el diseño profesional original</li>
          <li>✅ Mucho más rápido y simple</li>
          <li>✅ Menos código para mantener</li>
          <li>✅ Resultado más estético</li>
          <li>✅ Fácil de personalizar</li>
        </ul>
      </div>
    </div>
  );
};

export default PDFGeneratorExample; 