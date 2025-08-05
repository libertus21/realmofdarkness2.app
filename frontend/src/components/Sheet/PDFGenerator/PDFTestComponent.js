import React, { useState } from 'react';
import { Button, Typography, Box, Paper, Alert, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import { PDFDocument } from 'pdf-lib';

/**
 * Simple test component to verify PDF loading
 */
export default function PDFTestComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [pdfInfo, setPdfInfo] = useState(null);

  const testPDFLoading = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      setPdfInfo(null);

      const pdfPath = '/static/pdfFicha/v5 WintersTeeth 4-Page Interactive.pdf';
      console.log('Testing PDF loading from:', pdfPath);

      const response = await fetch(pdfPath);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const templateBytes = await response.arrayBuffer();
      console.log('PDF loaded successfully, size:', templateBytes.byteLength, 'bytes');

      const pdfDoc = await PDFDocument.load(templateBytes);
      console.log('PDF document parsed successfully');

      const form = pdfDoc.getForm();
      const fields = form.getFields();
      console.log('Found', fields.length, 'form fields');

      // Categorizar los campos
      const fieldMap = {
        textFields: [],
        checkBoxes: [],
        radioGroups: [],
        dropdowns: [],
        signatures: []
      };

      fields.forEach(field => {
        const fieldName = field.getName();
        const fieldType = field.constructor.name;

        switch (fieldType) {
          case 'PDFTextField':
            fieldMap.textFields.push({
              name: fieldName,
              isRequired: field.isRequired(),
              isReadOnly: field.isReadOnly(),
              maxLength: field.getMaxLength()
            });
            break;
          case 'PDFCheckBox':
            fieldMap.checkBoxes.push({
              name: fieldName,
              isRequired: field.isRequired(),
              isReadOnly: field.isReadOnly(),
              isChecked: field.isChecked()
            });
            break;
          case 'PDFRadioGroup':
            fieldMap.radioGroups.push({
              name: fieldName,
              isRequired: field.isRequired(),
              isReadOnly: field.isReadOnly(),
              options: field.getOptions()
            });
            break;
          case 'PDFDropdown':
            fieldMap.dropdowns.push({
              name: fieldName,
              isRequired: field.isRequired(),
              isReadOnly: field.isReadOnly(),
              options: field.getOptions()
            });
            break;
          case 'PDFSignature':
            fieldMap.signatures.push({
              name: fieldName,
              isRequired: field.isRequired(),
              isReadOnly: field.isReadOnly()
            });
            break;
        }
      });

      setPdfInfo({
        totalFields: fields.length,
        size: templateBytes.byteLength,
        fieldMap: fieldMap
      });

      setSuccess(true);
      console.log('PDF test completed successfully');
    } catch (err) {
      console.error('PDF test failed:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        PDF Test Component
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        Este componente prueba si el PDF se puede cargar correctamente y muestra información detallada sobre los campos.
      </Typography>

      <Button 
        variant="contained" 
        onClick={testPDFLoading} 
        disabled={isLoading}
        sx={{ mb: 2 }}
      >
        {isLoading ? 'Probando...' : 'Probar Carga de PDF'}
      </Button>

      {error && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: 'error.light' }}>
          <Alert severity="error">
            <Typography variant="h6">Error:</Typography>
            <Typography>{error}</Typography>
          </Alert>
        </Paper>
      )}

      {success && pdfInfo && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: 'success.light' }}>
          <Alert severity="success">
            <Typography variant="h6">¡Éxito!</Typography>
            <Typography>El PDF se cargó correctamente.</Typography>
          </Alert>
        </Paper>
      )}

      {pdfInfo && (
        <Box>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Información del PDF
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Chip label={`Total de campos: ${pdfInfo.totalFields}`} color="primary" />
              <Chip label={`Tamaño: ${(pdfInfo.size / 1024 / 1024).toFixed(2)} MB`} color="secondary" />
              <Chip label={`Campos de texto: ${pdfInfo.fieldMap.textFields.length}`} color="info" />
              <Chip label={`Checkboxes: ${pdfInfo.fieldMap.checkBoxes.length}`} color="warning" />
              <Chip label={`Radio groups: ${pdfInfo.fieldMap.radioGroups.length}`} color="success" />
              <Chip label={`Dropdowns: ${pdfInfo.fieldMap.dropdowns.length}`} color="error" />
              <Chip label={`Firmas: ${pdfInfo.fieldMap.signatures.length}`} color="default" />
            </Box>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Campos de Texto (Primeros 20)
            </Typography>
            <List dense>
              {pdfInfo.fieldMap.textFields.slice(0, 20).map((field, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={field.name}
                    secondary={`Requerido: ${field.isRequired}, Solo lectura: ${field.isReadOnly}, Max length: ${field.maxLength || 'N/A'}`}
                  />
                </ListItem>
              ))}
              {pdfInfo.fieldMap.textFields.length > 20 && (
                <ListItem>
                  <ListItemText 
                    primary={`... y ${pdfInfo.fieldMap.textFields.length - 20} campos más`}
                    secondary="Usa el mapeador completo para ver todos los campos"
                  />
                </ListItem>
              )}
            </List>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Checkboxes (Primeros 20)
            </Typography>
            <List dense>
              {pdfInfo.fieldMap.checkBoxes.slice(0, 20).map((field, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={field.name}
                    secondary={`Requerido: ${field.isRequired}, Solo lectura: ${field.isReadOnly}, Marcado: ${field.isChecked}`}
                  />
                </ListItem>
              ))}
              {pdfInfo.fieldMap.checkBoxes.length > 20 && (
                <ListItem>
                  <ListItemText 
                    primary={`... y ${pdfInfo.fieldMap.checkBoxes.length - 20} campos más`}
                    secondary="Usa el mapeador completo para ver todos los campos"
                  />
                </ListItem>
              )}
            </List>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Grupos de Radio
            </Typography>
            <List dense>
              {pdfInfo.fieldMap.radioGroups.map((field, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={field.name}
                    secondary={`Opciones: ${field.options.join(', ')}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Dropdowns
            </Typography>
            <List dense>
              {pdfInfo.fieldMap.dropdowns.map((field, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={field.name}
                    secondary={`Opciones: ${field.options.join(', ')}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Firmas
            </Typography>
            <List dense>
              {pdfInfo.fieldMap.signatures.map((field, index) => (
                <ListItem key={index}>
                  <ListItemText 
                    primary={field.name}
                    secondary={`Requerido: ${field.isRequired}, Solo lectura: ${field.isReadOnly}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      )}

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Instrucciones:
        </Typography>
        <Typography variant="body2" component="div">
          <ul>
            <li>Haz clic en "Probar Carga de PDF"</li>
            <li>La información se mostrará en la interfaz y también en la consola</li>
            <li>Si hay errores, verifica que el archivo PDF esté en la ubicación correcta</li>
            <li>El PDF debe estar en: <code>/static/pdfFicha/v5 WintersTeeth 4-Page Interactive.pdf</code></li>
            <li>Para ver todos los campos, usa el mapeador completo en <code>/pdf-test</code></li>
          </ul>
        </Typography>
      </Paper>
    </Box>
  );
} 