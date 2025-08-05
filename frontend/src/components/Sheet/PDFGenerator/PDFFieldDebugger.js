import React, { useState } from 'react';
import { Button, Box, Typography, Alert, CircularProgress, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { PDFDocument } from 'pdf-lib';

/**
 * Tool to debug and identify PDF form fields
 * This helps us find the exact field names in the editable PDF
 */
const PDFFieldDebugger = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const [error, setError] = useState(null);

  const debugPDFFields = async () => {
    setIsLoading(true);
    setError(null);
    setFields([]);

    try {
      console.log('🔍 Analizando campos del PDF editable...');
      
      // Load the PDF template
      const response = await fetch('/static/pdfFicha/Básica V5 Editable.pdf');
      if (!response.ok) {
        throw new Error('No se pudo cargar el PDF template');
      }
      
      const templateBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(templateBytes);
      const form = pdfDoc.getForm();
      
      // Get all form fields
      const allFields = form.getFields();
      const fieldInfo = allFields.map(field => ({
        name: field.getName(),
        type: field.constructor.name,
        isReadOnly: field.isReadOnly(),
        isRequired: field.isRequired(),
        isMultiline: field.isMultiline ? field.isMultiline() : false,
        maxLength: field.maxLength ? field.maxLength() : null
      }));
      
      console.log('📋 Campos encontrados:', fieldInfo);
      setFields(fieldInfo);
      
    } catch (err) {
      const errorMsg = `❌ Error analizando PDF: ${err.message}`;
      setError(errorMsg);
      console.error(errorMsg, err);
    } finally {
      setIsLoading(false);
    }
  };

  const testFieldMapping = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🧪 Probando mapeo de campos...');
      
      // Load the PDF template
      const response = await fetch('/static/pdfFicha/Básica V5 Editable.pdf');
      if (!response.ok) {
        throw new Error('No se pudo cargar el PDF template');
      }
      
      const templateBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(templateBytes);
      const form = pdfDoc.getForm();
      
      // Test some common field names
      const testFields = [
        'character_name', 'player_name', 'chronicle', 'clan', 'generation',
        'strength_1', 'strength_2', 'strength_3', 'strength_4', 'strength_5',
        'dexterity_1', 'dexterity_2', 'dexterity_3', 'dexterity_4', 'dexterity_5',
        'stamina_1', 'stamina_2', 'stamina_3', 'stamina_4', 'stamina_5',
        'charisma_1', 'charisma_2', 'charisma_3', 'charisma_4', 'charisma_5',
        'manipulation_1', 'manipulation_2', 'manipulation_3', 'manipulation_4', 'manipulation_5',
        'composure_1', 'composure_2', 'composure_3', 'composure_4', 'composure_5',
        'intelligence_1', 'intelligence_2', 'intelligence_3', 'intelligence_4', 'intelligence_5',
        'wits_1', 'wits_2', 'wits_3', 'wits_4', 'wits_5',
        'resolve_1', 'resolve_2', 'resolve_3', 'resolve_4', 'resolve_5'
      ];
      
      const foundFields = [];
      const missingFields = [];
      
      testFields.forEach(fieldName => {
        try {
          const field = form.getField(fieldName);
          if (field) {
            foundFields.push({
              name: fieldName,
              type: field.constructor.name
            });
          } else {
            missingFields.push(fieldName);
          }
        } catch {
          missingFields.push(fieldName);
        }
      });
      
      console.log('✅ Campos encontrados:', foundFields);
      console.log('❌ Campos faltantes:', missingFields);
      
      setFields([
        ...foundFields.map(f => ({ ...f, status: 'found' })),
        ...missingFields.map(f => ({ name: f, type: 'Missing', status: 'missing' }))
      ]);
      
    } catch (err) {
      const errorMsg = `❌ Error en mapeo: ${err.message}`;
      setError(errorMsg);
      console.error(errorMsg, err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFieldMapping = () => {
    if (fields.length === 0) return null;
    
    const foundFields = fields.filter(f => f.status !== 'missing');
    
    return `// Mapeo de campos encontrados en el PDF
const fieldMapping = {
${foundFields.map(field => `  "${field.name}": "${field.name}",`).join('\n')}
};

// Ejemplo de uso:
const generator = PDFGeneratorFactory.createGenerator('v5_editable', characterData);
await generator.loadTemplate();

// Llenar campos encontrados
${foundFields.slice(0, 5).map(field => `generator.fillTextField("${field.name}", characterData.${field.name.replace(/_/g, '')} || "");`).join('\n')}
// ... continuar con el resto de campos
`;
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom>
        Debug de Campos PDF
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Esta herramienta te ayuda a identificar los campos disponibles en el PDF editable.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={debugPDFFields}
          disabled={isLoading}
          sx={{ mr: 2, mb: 2 }}
        >
          Analizar Todos los Campos
        </Button>
        
        <Button
          variant="contained"
          color="secondary"
          onClick={testFieldMapping}
          disabled={isLoading}
          sx={{ mb: 2 }}
        >
          Probar Mapeo de Campos
        </Button>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CircularProgress size={20} sx={{ mr: 1 }} />
          <Typography>Analizando PDF...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {fields.length > 0 && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Campos Encontrados ({fields.length})
          </Typography>
          
          <List dense>
            {fields.map((field, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="body2" 
                        color={field.status === 'missing' ? 'error' : 'primary'}
                        sx={{ fontFamily: 'monospace' }}
                      >
                        {field.name}
                      </Typography>
                    }
                    secondary={`Tipo: ${field.type}${field.status === 'missing' ? ' (NO ENCONTRADO)' : ''}`}
                  />
                </ListItem>
                {index < fields.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {fields.length > 0 && (
        <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
          <Typography variant="h6" gutterBottom>
            Código de Mapeo Sugerido:
          </Typography>
          <Typography 
            component="pre" 
            sx={{ 
              fontSize: '0.8rem', 
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              overflow: 'auto'
            }}
          >
            {generateFieldMapping()}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default PDFFieldDebugger; 