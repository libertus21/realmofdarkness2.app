import React, { useState } from 'react';
import { Button, Typography, Box, Paper, List, ListItem, ListItemText, Divider, Chip, Alert, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PDFFieldMapper from './PDFFieldMapper';

/**
 * Test component for mapping PDF fields organized by page
 * This helps identify the exact field names in the PDF template
 */
export default function PDFFieldMapperTest() {
  const [fieldMap, setFieldMap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedPage, setSelectedPage] = useState(0);

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
      console.log('=== PDF Field Mapping by Page ===');
      Object.entries(fields).forEach(([page, pageFields]) => {
        console.log(`${page}:`, pageFields);
      });
      
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

  const handlePageChange = (event, newValue) => {
    setSelectedPage(newValue);
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

  const renderPageContent = (pageData, pageNumber) => {
    if (!pageData) return null;

    const totalFields = pageData.textFields.length + pageData.checkBoxes.length + 
                       pageData.radioGroups.length + pageData.dropdowns.length + 
                       pageData.signatures.length;

    return (
      <Box>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Página {pageNumber} - Resumen
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip label={`Total: ${totalFields}`} color="primary" />
            <Chip label={`Campos de texto: ${pageData.textFields.length}`} color="info" />
            <Chip label={`Checkboxes: ${pageData.checkBoxes.length}`} color="warning" />
            <Chip label={`Radio groups: ${pageData.radioGroups.length}`} color="success" />
            <Chip label={`Dropdowns: ${pageData.dropdowns.length}`} color="error" />
            <Chip label={`Firmas: ${pageData.signatures.length}`} color="default" />
          </Box>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Detalles por Tipo de Campo
          </Typography>
          
          {renderFieldList(pageData.textFields, 'Campos de Texto', 'text')}
          {renderFieldList(pageData.checkBoxes, 'Checkboxes', 'checkbox')}
          {renderFieldList(pageData.radioGroups, 'Grupos de Radio', 'radio')}
          {renderFieldList(pageData.dropdowns, 'Dropdowns', 'dropdown')}
          {renderFieldList(pageData.signatures, 'Firmas', 'signature')}
        </Paper>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        PDF Field Mapper Test (por Página)
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        Este componente mapea todos los campos disponibles en el PDF editable organizados por página.
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Button 
          variant="contained" 
          onClick={handleMapFields} 
          disabled={isLoading}
          sx={{ mr: 1 }}
        >
          {isLoading ? 'Mapeando...' : 'Mapear Campos por Página'}
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
            <Typography>Se mapearon todos los campos del PDF correctamente por página.</Typography>
          </Alert>
        </Paper>
      )}

      {fieldMap && (
        <Box>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Resumen por Página
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {Object.entries(fieldMap).map(([page, pageData], index) => {
                const totalFields = pageData.textFields.length + pageData.checkBoxes.length + 
                                  pageData.radioGroups.length + pageData.dropdowns.length + 
                                  pageData.signatures.length;
                return (
                  <Chip 
                    key={page}
                    label={`Página ${index + 1}: ${totalFields} campos`} 
                    color="primary" 
                    variant={selectedPage === index ? "filled" : "outlined"}
                    onClick={() => setSelectedPage(index)}
                    sx={{ cursor: 'pointer' }}
                  />
                );
              })}
            </Box>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Tabs value={selectedPage} onChange={handlePageChange} aria-label="PDF pages">
              {Object.entries(fieldMap).map(([page, pageData], index) => (
                <Tab key={page} label={`Página ${index + 1}`} />
              ))}
            </Tabs>
          </Paper>

          <Box sx={{ mt: 2 }}>
            {Object.entries(fieldMap).map(([page, pageData], index) => (
              <Box key={page} sx={{ display: selectedPage === index ? 'block' : 'none' }}>
                {renderPageContent(pageData, index + 1)}
              </Box>
            ))}
          </Box>

          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Información para Desarrolladores
            </Typography>
            <Typography variant="body2" component="div">
              <ul>
                <li>Los campos están organizados por página para facilitar el mapeo</li>
                <li>Página 1: Información básica, atributos, habilidades</li>
                <li>Página 2: Disciplinas, poderes, ventajas, antecedentes</li>
                <li>Página 3: Potencia de sangre, hambre, humanidad, fuerza de voluntad</li>
                <li>Página 4: Apariencia, descripción, otros detalles</li>
                <li>Los nombres de los campos se pueden usar directamente en el generador de PDF</li>
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
            <li>Haz clic en "Mapear Campos por Página" para cargar y analizar el PDF</li>
            <li>Usa las pestañas para navegar entre las 4 páginas del PDF</li>
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