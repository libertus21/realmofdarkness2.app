import React, { useState, useCallback, useMemo } from 'react';
import { Button, Typography, Box, Paper, TextField, Switch, FormControlLabel, Alert, List, ListItem, ListItemText, Chip, Tabs, Tab } from '@mui/material';
import Vampire5thEditablePDFGenerator from './sheet/5th/Vampire5thEditablePDFGenerator';
import PDFFieldMapper from './PDFFieldMapper';

// Componente optimizado para cada campo individual
const DotFieldItem = React.memo(({ field, index, pageKey, onToggle, onRemove }) => {
  const handleToggle = useCallback(() => {
    onToggle(pageKey, index);
  }, [onToggle, pageKey, index]);

  const handleRemove = useCallback(() => {
    onRemove(pageKey, index);
  }, [onRemove, pageKey, index]);

  return (
    <ListItem sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <ListItemText 
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              {field.name}
            </Typography>
            {field.active && <Chip label="Activo" size="small" color="success" />}
            {field.isRequired && <Chip label="Requerido" size="small" color="error" />}
            {field.isReadOnly && <Chip label="Solo lectura" size="small" color="warning" />}
          </Box>
        }
        secondary={field.description}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={field.active}
              onChange={handleToggle}
              size="small"
            />
          }
          label=""
        />
        <Button 
          size="small" 
          color="error" 
          onClick={handleRemove}
        >
          Eliminar
        </Button>
      </Box>
    </ListItem>
  );
});

// Componente optimizado para el contenido de cada página
const PageContent = React.memo(({ pageKey, pageData, pageNumber, onToggle, onRemove, sortNumerically }) => {
  const activeCount = useMemo(() => 
    pageData.filter(field => field.active).length, 
    [pageData]
  );

  // Ordenar los campos si está habilitado el ordenamiento numérico
  const sortedPageData = useMemo(() => {
    if (!sortNumerically) return pageData;
    
    return [...pageData].sort((a, b) => {
      // Extraer números de los nombres de campos (ej: dot317b -> 317)
      const getNumber = (name) => {
        const match = name.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
      };
      
      const numA = getNumber(a.name);
      const numB = getNumber(b.name);
      
      return numA - numB;
    });
  }, [pageData, sortNumerically]);

  if (!pageData || pageData.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="body1" color="text.secondary">
          No hay campos de dots en esta página.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Página {pageNumber} - Campos de Dots ({activeCount} activos)
          {sortNumerically && (
            <Chip 
              label="Ordenado Numéricamente" 
              size="small" 
              color="info" 
              sx={{ ml: 1 }}
            />
          )}
        </Typography>
        
        <List dense>
          {sortedPageData.map((field, index) => (
            <DotFieldItem
              key={`${pageKey}-${index}-${field.name}`}
              field={field}
              index={index}
              pageKey={pageKey}
              onToggle={onToggle}
              onRemove={onRemove}
            />
          ))}
        </List>
      </Paper>
    </Box>
  );
});

/**
 * Component for activating specific dot fields in the PDF organized by page
 * Optimized for performance with React.memo and useCallback
 */
export default function PDFDotActivatorByPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [dotFieldsByPage, setDotFieldsByPage] = useState(null);
  const [selectedPage, setSelectedPage] = useState(0);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldDescription, setNewFieldDescription] = useState('');
  const [sortNumerically, setSortNumerically] = useState(false);

  const handleMapDotFields = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      setDotFieldsByPage(null);
      
      const mapper = new PDFFieldMapper();
      const dotFields = await mapper.getDotFieldsByPage();
      setDotFieldsByPage(dotFields);
      setSuccess(true);
      
      console.log('=== Dot Fields by Page ===');
      Object.entries(dotFields).forEach(([page, fields]) => {
        console.log(`${page}:`, fields);
      });
      
    } catch (err) {
      setError(`Error mapping dot fields: ${err.message}`);
      console.error('Error mapping dot fields:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleToggleDot = useCallback((pageKey, index) => {
    setDotFieldsByPage(prev => {
      const updated = { ...prev };
      updated[pageKey] = [...updated[pageKey]];
      updated[pageKey][index] = { ...updated[pageKey][index], active: !updated[pageKey][index].active };
      return updated;
    });
  }, []);

  const handleAddField = useCallback(() => {
    if (newFieldName.trim() && dotFieldsByPage) {
      const pageKey = `page${selectedPage + 1}`;
      
      setDotFieldsByPage(prev => {
        const updated = { ...prev };
        if (!updated[pageKey]) {
          updated[pageKey] = [];
        }
        
        updated[pageKey] = [...updated[pageKey], {
          name: newFieldName.trim(),
          active: false,
          description: newFieldDescription.trim() || 'Campo personalizado',
          isRequired: false,
          isReadOnly: false,
          isChecked: false
        }];
        
        return updated;
      });
      
      setNewFieldName('');
      setNewFieldDescription('');
    }
  }, [newFieldName, newFieldDescription, selectedPage, dotFieldsByPage]);

  const handleRemoveField = useCallback((pageKey, index) => {
    setDotFieldsByPage(prev => {
      const updated = { ...prev };
      updated[pageKey] = updated[pageKey].filter((_, i) => i !== index);
      return updated;
    });
  }, []);

  const handleGeneratePDF = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      // Create a mock sheet for testing
      const mockSheet = {
        name: 'Test Character',
        strength: 3,
        athletics: 2,
        // Add other properties as needed
      };

      // Create the generator
      const generator = new Vampire5thEditablePDFGenerator(mockSheet);

      // Override the fillSpecificDotFields method to use our custom fields
      generator.fillSpecificDotFields = function(form) {
        console.log('Activating custom dot fields by page...');
        
        // Activate the fields based on our list
        Object.entries(dotFieldsByPage).forEach(([page, fields]) => {
          fields.forEach(field => {
            if (field.active) {
              this.fillCheckboxField(form, field.name, true);
              console.log(`Activated: ${field.name} (${page})`);
            }
          });
        });
      };

      // Generate the PDF
      await generator.generate();
      
      setSuccess(true);
      console.log('PDF generated successfully with custom dot activations by page');
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [dotFieldsByPage]);

  const handlePageChange = useCallback((event, newValue) => {
    setSelectedPage(newValue);
  }, []);

  const handleNewFieldNameChange = useCallback((e) => {
    setNewFieldName(e.target.value);
  }, []);

  const handleNewFieldDescriptionChange = useCallback((e) => {
    setNewFieldDescription(e.target.value);
  }, []);

  const handleChipClick = useCallback((index) => {
    setSelectedPage(index);
  }, []);

  const handleSortToggle = useCallback(() => {
    setSortNumerically(prev => !prev);
  }, []);

  // Memoizar el resumen de páginas para evitar recálculos innecesarios
  const pageSummary = useMemo(() => {
    if (!dotFieldsByPage) return [];
    
    return Object.entries(dotFieldsByPage).map(([page, pageData], index) => {
      const activeCount = pageData.filter(field => field.active).length;
      return {
        page,
        index,
        totalCount: pageData.length,
        activeCount
      };
    });
  }, [dotFieldsByPage]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        PDF Dot Activator (por Página)
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        Este componente te permite activar campos de dots específicos organizados por página en el PDF editable.
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button 
          variant="contained" 
          onClick={handleMapDotFields} 
          disabled={isLoading}
          sx={{ mr: 1 }}
        >
          {isLoading ? 'Mapeando...' : 'Mapear Dots por Página'}
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={handleGeneratePDF} 
          disabled={isLoading || !dotFieldsByPage}
        >
          {isLoading ? 'Generando...' : 'Generar PDF con Dots'}
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
            <Typography>Se mapearon los campos de dots por página correctamente.</Typography>
          </Alert>
        </Paper>
      )}

      {dotFieldsByPage && (
        <Box>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Agregar Nuevo Campo
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Nombre del Campo"
                value={newFieldName}
                onChange={handleNewFieldNameChange}
                placeholder="ej: dot317b"
                size="small"
              />
              <TextField
                label="Descripción"
                value={newFieldDescription}
                onChange={handleNewFieldDescriptionChange}
                placeholder="Descripción del campo"
                size="small"
              />
              <Button 
                variant="outlined" 
                onClick={handleAddField}
                disabled={!newFieldName.trim()}
              >
                Agregar a Página {selectedPage + 1}
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Resumen por Página
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={sortNumerically}
                    onChange={handleSortToggle}
                    size="small"
                  />
                }
                label="Ordenar Numéricamente"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {pageSummary.map(({ page, index, totalCount, activeCount }) => (
                <Chip 
                  key={page}
                  label={`Página ${index + 1}: ${totalCount} dots (${activeCount} activos)`} 
                  color="primary" 
                  variant={selectedPage === index ? "filled" : "outlined"}
                  onClick={() => handleChipClick(index)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Paper>

          <Paper sx={{ p: 2, mb: 2 }}>
            <Tabs value={selectedPage} onChange={handlePageChange} aria-label="PDF pages">
              {Object.entries(dotFieldsByPage).map(([page, pageData], index) => (
                <Tab key={page} label={`Página ${index + 1}`} />
              ))}
            </Tabs>
          </Paper>

          <Box sx={{ mt: 2 }}>
            {Object.entries(dotFieldsByPage).map(([page, pageData], index) => (
              <Box key={page} sx={{ display: selectedPage === index ? 'block' : 'none' }}>
                <PageContent
                  pageKey={page}
                  pageData={pageData}
                  pageNumber={index + 1}
                  onToggle={handleToggleDot}
                  onRemove={handleRemoveField}
                  sortNumerically={sortNumerically}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Instrucciones:
        </Typography>
        <Typography variant="body2" component="div">
          <ul>
            <li>Haz clic en "Mapear Dots por Página" para cargar los campos de dots</li>
            <li>Usa las pestañas para navegar entre las 4 páginas del PDF</li>
            <li>Activa "Ordenar Numéricamente" para ver los dots en orden (dot1, dot2, dot3...)</li>
            <li>Agrega campos personalizados específicos para cada página</li>
            <li>Usa el switch para activar/desactivar cada campo</li>
            <li>Haz clic en "Generar PDF con Dots" para crear el PDF</li>
            <li>Los campos activados aparecerán marcados en el PDF</li>
            <li>Puedes eliminar campos que no necesites</li>
          </ul>
        </Typography>
      </Paper>
    </Box>
  );
} 