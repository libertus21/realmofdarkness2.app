import React, { useState } from 'react';
import { Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import { PDFDocument } from 'pdf-lib';

/**
 * Simple example showing how to use pdf-lib to edit the PDF
 * This demonstrates the correct approach
 */
const SimplePDFExample = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fillPDFManually = async () => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      console.log('🔄 Cargando PDF template...');
      
      // 1. Cargar la plantilla PDF
      const response = await fetch('/static/pdfFicha/Básica V5 Editable.pdf');
      if (!response.ok) {
        throw new Error('No se pudo cargar el PDF template');
      }
      
      const templateBytes = await response.arrayBuffer();
      console.log('✅ PDF cargado correctamente');
      
      // 2. Crear documento PDF
      const pdfDoc = await PDFDocument.load(templateBytes);
      console.log('✅ Documento PDF creado');
      
      // 3. Obtener el formulario
      const form = pdfDoc.getForm();
      console.log('✅ Formulario obtenido');
      
      // 4. Listar todos los campos disponibles
      const allFields = form.getFields();
      console.log('📋 Todos los campos disponibles:');
      allFields.forEach(field => {
        console.log(`- ${field.getName()} (${field.constructor.name})`);
      });
      
      // 5. Intentar rellenar algunos campos comunes
      const testData = {
        name: "Drácula",
        clan: "Toreador",
        generation: "13ª",
        strength: 4,
        dexterity: 3,
        stamina: 5
      };
      
      // Intentar diferentes nombres de campos
      const fieldAttempts = [
        // Campos básicos
        ['character_name', 'name', 'Nombre', 'Character Name', 'CHARACTER_NAME'],
        ['clan', 'Clan', 'CLAN', 'clan_name'],
        ['generation', 'Generation', 'GENERATION', 'gen'],
        
        // Atributos
        ['strength_1', 'Strength1', 'STRENGTH_1', 'str1'],
        ['strength_2', 'Strength2', 'STRENGTH_2', 'str2'],
        ['strength_3', 'Strength3', 'STRENGTH_3', 'str3'],
        ['strength_4', 'Strength4', 'STRENGTH_4', 'str4'],
        ['strength_5', 'Strength5', 'STRENGTH_5', 'str5'],
      ];
      
      let fieldsFound = 0;
      
      for (const [fieldName, ...alternatives] of fieldAttempts) {
        for (const attempt of [fieldName, ...alternatives]) {
          try {
            const field = form.getField(attempt);
            if (field) {
              console.log(`✅ Campo encontrado: ${attempt}`);
              
              // Intentar llenar el campo
              if (field.constructor.name === 'PDFTextField') {
                field.setText(testData[fieldName] || 'Test');
                console.log(`✅ Campo ${attempt} llenado con: ${testData[fieldName] || 'Test'}`);
                fieldsFound++;
              } else if (field.constructor.name === 'PDFCheckBox') {
                // Para checkboxes (dots)
                const value = testData[fieldName] || 0;
                if (fieldName.includes('_')) {
                  const [attr, dot] = fieldName.split('_');
                  if (parseInt(dot) <= value) {
                    field.check();
                    console.log(`✅ Checkbox ${attempt} marcado`);
                  } else {
                    field.uncheck();
                    console.log(`✅ Checkbox ${attempt} desmarcado`);
                  }
                  fieldsFound++;
                }
              }
              break; // Si encontramos el campo, no probamos más alternativas
            }
          } catch (err) {
            // Campo no encontrado, continuar con la siguiente alternativa
          }
        }
      }
      
      console.log(`📊 Total de campos llenados: ${fieldsFound}`);
      
      // 6. Guardar el PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      // Crear descarga
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Ficha_Test_Manual.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setResult(`✅ PDF generado exitosamente! Campos llenados: ${fieldsFound}`);
      console.log('✅ PDF guardado correctamente');
      
    } catch (err) {
      const errorMsg = `❌ Error: ${err.message}`;
      setError(errorMsg);
      console.error(errorMsg, err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        Ejemplo Simple PDF-Lib
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Este ejemplo muestra cómo usar pdf-lib directamente para editar el PDF.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={fillPDFManually}
          disabled={isProcessing}
          sx={{ mb: 2 }}
        >
          Probar Edición Manual del PDF
        </Button>
      </Box>

      {isProcessing && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CircularProgress size={20} sx={{ mr: 1 }} />
          <Typography>Procesando PDF...</Typography>
        </Box>
      )}

      {result && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {result}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Código de ejemplo:
        </Typography>
        <Typography 
          component="pre" 
          sx={{ fontSize: '0.8rem', fontFamily: 'monospace' }}
        >
{`// 1. Cargar plantilla
const response = await fetch('/static/pdfFicha/Básica V5 Editable.pdf');
const templateBytes = await response.arrayBuffer();

// 2. Crear documento
const pdfDoc = await PDFDocument.load(templateBytes);
const form = pdfDoc.getForm();

// 3. Llenar campos
form.getTextField('Nombre').setText('Drácula');
form.getTextField('Clan').setText('Toreador');

// 4. Guardar
const pdfBytes = await pdfDoc.save();
// Crear blob y descargar...`}
        </Typography>
      </Box>
    </Box>
  );
};

export default SimplePDFExample; 