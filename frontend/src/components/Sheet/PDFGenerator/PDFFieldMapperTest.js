import React, { useState } from 'react';
import { Button, Typography, Box, Paper, List, ListItem, ListItemText, Divider, Chip, Alert, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PDFFieldMapper from './PDFFieldMapper';

/**
 * Test component for mapping PDF fields
 * This helps identify the exact field names in the PDF template
 */
export default function PDFFieldMapperTest() {
  const [fieldMap, setFieldMap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleMapFields = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      setFieldMap(null);
      
      const mapper = new PDFFieldMapper();
      const fields = await mapper.mapFields();
      setFieldMap(fields);
      setSuccess(true);
      
      // Also print to console for debugging
      console.log('=== PDF Field Mapping ===');
      console.log('Text Fields:', fields.textFields);
      console.log('Checkboxes:', fields.checkBoxes);
      console.log('Radio Groups:', fields.radioGroups);
      console.log('Dropdowns:', fields.dropdowns);
      console.log('Signatures:', fields.signatures);
      
    } catch (err) {
      setError(`Error mapping fields: ${err.message}`);
      console.error('Error mapping fields:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportMapping = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const mapper = new PDFFieldMapper();
      await mapper.exportFieldMapping();
      
    } catch (err) {
      setError(`Error exporting mapping: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFieldList = (fields, title, type) => (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
          <Typography variant="h6">{title}</Typography>
          <Chip label={fields.length} color="primary" size="small" />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <List dense>
          {fields.map((field, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {field.name}
                    </Typography>
                    {field.isRequired && <Chip label="Requerido" size="small" color="error" />}
                    {field.isReadOnly && <Chip label="Solo lectura" size="small" color="warning" />}
                  </Box>
                }
                secondary={
                  <Box>
                    {type === 'text' && field.maxLength && (
                      <Typography variant="caption" display="block">
                        Max length: {field.maxLength}
                      </Typography>
                    )}
                    {type === 'checkbox' && (
                      <Typography variant="caption" display="block">
                        Marcado: {field.isChecked ? 'Sí' : 'No'}
                      </Typography>
                    )}
                    {(type === 'radio' || type === 'dropdown') && field.options && (
                      <Typography variant="caption" display="block">
                        Opciones: {field.options.join(', ')}
                      </Typography>
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        PDF Field Mapper Test
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        Este componente mapea todos los campos disponibles en el PDF editable y los muestra de manera organizada.
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Button 
          variant="contained" 
          onClick={handleMapFields} 
          disabled={isLoading}
          sx={{ mr: 1 }}
        >
          {isLoading ? 'Mapeando...' : 'Mapear Campos'}
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={handleExportMapping} 
          disabled={isLoading}
        >
          Exportar Mapeo
        </Button>
      </Box>

      {error && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: 'error.light' }}>
          <Alert severity="error">{error}</Alert>
        </Paper>
      )}

      {success && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: 'success.light' }}>
          <Alert severity="success">
            <Typography variant="h6">¡Éxito!</Typography>
            <Typography>Se mapearon todos los campos del PDF correctamente.</Typography>
          </Alert>
        </Paper>
      )}

      {fieldMap && (
        <Box>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Resumen de Campos Encontrados
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip label={`Total: ${fieldMap.textFields.length + fieldMap.checkBoxes.length + fieldMap.radioGroups.length + fieldMap.dropdowns.length + fieldMap.signatures.length}`} color="primary" />
              <Chip label={`Campos de texto: ${fieldMap.textFields.length}`} color="info" />
              <Chip label={`Checkboxes: ${fieldMap.checkBoxes.length}`} color="warning" />
              <Chip label={`Radio groups: ${fieldMap.radioGroups.length}`} color="success" />
              <Chip label={`Dropdowns: ${fieldMap.dropdowns.length}`} color="error" />
              <Chip label={`Firmas: ${fieldMap.signatures.length}`} color="default" />
            </Box>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Detalles por Tipo de Campo
            </Typography>
            
            {renderFieldList(fieldMap.textFields, 'Campos de Texto', 'text')}
            {renderFieldList(fieldMap.checkBoxes, 'Checkboxes', 'checkbox')}
            {renderFieldList(fieldMap.radioGroups, 'Grupos de Radio', 'radio')}
            {renderFieldList(fieldMap.dropdowns, 'Dropdowns', 'dropdown')}
            {renderFieldList(fieldMap.signatures, 'Firmas', 'signature')}
          </Paper>

          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Información para Desarrolladores
            </Typography>
            <Typography variant="body2" component="div">
              <ul>
                <li>Los nombres de los campos se pueden usar directamente en el generador de PDF</li>
                <li>Los campos marcados como "Requerido" son obligatorios en el PDF</li>
                <li>Los campos "Solo lectura" no se pueden editar</li>
                <li>Para checkboxes, usa <code>fillCheckboxField(form, fieldName, true/false)</code></li>
                <li>Para campos de texto, usa <code>fillTextField(form, fieldName, value)</code></li>
                <li>Para radio groups, usa <code>fillRadioField(form, fieldName, optionValue)</code></li>
              </ul>
            </Typography>
          </Paper>
        </Box>
      )}

      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Instrucciones:
        </Typography>
        <Typography variant="body2" component="div">
          <ul>
            <li>Haz clic en "Mapear Campos" para cargar y analizar el PDF</li>
            <li>Expande cada sección para ver los campos específicos</li>
            <li>Usa "Exportar Mapeo" para descargar un archivo JSON con todos los campos</li>
            <li>Los nombres de los campos se pueden usar directamente en el código</li>
            <li>Revisa la consola para información adicional de debugging</li>
          </ul>
        </Typography>
      </Paper>
    </Box>
  );
} 