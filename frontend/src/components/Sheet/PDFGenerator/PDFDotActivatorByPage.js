import React, { useState, useCallback, useMemo } from 'react';
import { Button, Typography, Box, Paper, TextField, Switch, FormControlLabel, Alert, List, ListItem, ListItemText, Chip, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
            {field.mappedValue !== undefined && (
              <Chip label={`Valor: ${field.mappedValue}`} size="small" color="info" />
            )}
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
  const [showMappingPanel, setShowMappingPanel] = useState(false);

  // Mock character sheet data - esto se puede conectar con datos reales
  const [characterData, setCharacterData] = useState({
    // Atributos
    strength: 3,
    dexterity: 4,
    stamina: 2,
    charisma: 3,
    manipulation: 2,
    composure: 4,
    intelligence: 3,
    wits: 2,
    resolve: 3,
    
    // Habilidades Físicas
    athletics: 2,
    brawl: 1,
    craft: 0,
    drive: 1,
    firearms: 0,
    larceny: 0,
    melee: 2,
    stealth: 1,
    survival: 0,
    
    // Habilidades Sociales
    animal: 0,
    etiquette: 1,
    insight: 2,
    intimidation: 1,
    leadership: 0,
    performance: 0,
    persuasion: 2,
    streetwise: 1,
    subterfuge: 1,
    
    // Habilidades Mentales
    academics: 1,
    awareness: 2,
    finance: 0,
    investigation: 1,
    medicine: 0,
    occult: 1,
    politics: 0,
    science: 0,
    technology: 1
  });

  // Mapeo de dots a habilidades con niveles específicos
  const dotMapping = useMemo(() => ({
    // Atributos - cada nivel tiene su propio dot
    'dot5b': { skill: 'strength', level: 1 },
    'dot6b': { skill: 'strength', level: 2 },
    'dot7b': { skill: 'strength', level: 3 },
    'dot8b': { skill: 'strength', level: 4 },
    'dot9b': { skill: 'strength', level: 5 },
    
    'dot13b': { skill: 'dexterity', level: 1 },
    'dot14b': { skill: 'dexterity', level: 2 },
    'dot15b': { skill: 'dexterity', level: 3 },
    'dot16b': { skill: 'dexterity', level: 4 },
    'dot17b': { skill: 'dexterity', level: 5 },
    
    'dot21b': { skill: 'stamina', level: 1 },
    'dot22b': { skill: 'stamina', level: 2 },
    'dot23b': { skill: 'stamina', level: 3 },
    'dot24b': { skill: 'stamina', level: 4 },
    'dot25b': { skill: 'stamina', level: 5 },
    
    'dot29b': { skill: 'charisma', level: 1 },
    'dot30b': { skill: 'charisma', level: 2 },
    'dot31b': { skill: 'charisma', level: 3 },
    'dot32b': { skill: 'charisma', level: 4 },
    'dot33b': { skill: 'charisma', level: 5 },
    
    'dot37b': { skill: 'manipulation', level: 1 },
    'dot38b': { skill: 'manipulation', level: 2 },
    'dot39b': { skill: 'manipulation', level: 3 },
    'dot40b': { skill: 'manipulation', level: 4 },
    'dot41b': { skill: 'manipulation', level: 5 },
    
    'dot45b': { skill: 'composure', level: 1 },
    'dot46b': { skill: 'composure', level: 2 },
    'dot47b': { skill: 'composure', level: 3 },
    'dot48b': { skill: 'composure', level: 4 },
    'dot49b': { skill: 'composure', level: 5 },
    
    'dot53b': { skill: 'intelligence', level: 1 },
    'dot54b': { skill: 'intelligence', level: 2 },
    'dot55b': { skill: 'intelligence', level: 3 },
    'dot56b': { skill: 'intelligence', level: 4 },
    'dot57b': { skill: 'intelligence', level: 5 },
    
    'dot61b': { skill: 'wits', level: 1 },
    'dot62b': { skill: 'wits', level: 2 },
    'dot63b': { skill: 'wits', level: 3 },
    'dot64b': { skill: 'wits', level: 4 },
    'dot65b': { skill: 'wits', level: 5 },
    
    'dot69b': { skill: 'resolve', level: 1 },
    'dot70b': { skill: 'resolve', level: 2 },
    'dot71b': { skill: 'resolve', level: 3 },
    'dot72b': { skill: 'resolve', level: 4 },
    'dot73b': { skill: 'resolve', level: 5 },
    
    // Habilidades Físicas
    'dot77b': { skill: 'athletics', level: 1 },
    'dot78b': { skill: 'athletics', level: 2 },
    'dot79b': { skill: 'athletics', level: 3 },
    'dot80b': { skill: 'athletics', level: 4 },
    'dot81b': { skill: 'athletics', level: 5 },
    
    'dot85b': { skill: 'brawl', level: 1 },
    'dot86b': { skill: 'brawl', level: 2 },
    'dot87b': { skill: 'brawl', level: 3 },
    'dot88b': { skill: 'brawl', level: 4 },
    'dot89b': { skill: 'brawl', level: 5 },
    
    'dot93b': { skill: 'craft', level: 1 },
    'dot94b': { skill: 'craft', level: 2 },
    'dot95b': { skill: 'craft', level: 3 },
    'dot96b': { skill: 'craft', level: 4 },
    'dot97b': { skill: 'craft', level: 5 },
    
    'dot101b': { skill: 'drive', level: 1 },
    'dot102b': { skill: 'drive', level: 2 },
    'dot103b': { skill: 'drive', level: 3 },
    'dot104b': { skill: 'drive', level: 4 },
    'dot105b': { skill: 'drive', level: 5 },
    
    'dot109b': { skill: 'firearms', level: 1 },
    'dot110b': { skill: 'firearms', level: 2 },
    'dot111b': { skill: 'firearms', level: 3 },
    'dot112b': { skill: 'firearms', level: 4 },
    'dot113b': { skill: 'firearms', level: 5 },
    
    'dot117b': { skill: 'larceny', level: 1 },
    'dot118b': { skill: 'larceny', level: 2 },
    'dot119b': { skill: 'larceny', level: 3 },
    'dot120b': { skill: 'larceny', level: 4 },
    'dot121b': { skill: 'larceny', level: 5 },
    
    'dot125b': { skill: 'melee', level: 1 },
    'dot126b': { skill: 'melee', level: 2 },
    'dot127b': { skill: 'melee', level: 3 },
    'dot128b': { skill: 'melee', level: 4 },
    'dot129b': { skill: 'melee', level: 5 },
    
    'dot133b': { skill: 'stealth', level: 1 },
    'dot134b': { skill: 'stealth', level: 2 },
    'dot135b': { skill: 'stealth', level: 3 },
    'dot136b': { skill: 'stealth', level: 4 },
    'dot137b': { skill: 'stealth', level: 5 },
    
    'dot141b': { skill: 'survival', level: 1 },
    'dot142b': { skill: 'survival', level: 2 },
    'dot143b': { skill: 'survival', level: 3 },
    'dot144b': { skill: 'survival', level: 4 },
    'dot145b': { skill: 'survival', level: 5 },
    
    // Habilidades Sociales
    'dot149b': { skill: 'animal', level: 1 },
    'dot150b': { skill: 'animal', level: 2 },
    'dot151b': { skill: 'animal', level: 3 },
    'dot152b': { skill: 'animal', level: 4 },
    'dot153b': { skill: 'animal', level: 5 },
    
    'dot157b': { skill: 'etiquette', level: 1 },
    'dot158b': { skill: 'etiquette', level: 2 },
    'dot159b': { skill: 'etiquette', level: 3 },
    'dot160b': { skill: 'etiquette', level: 4 },
    'dot161b': { skill: 'etiquette', level: 5 },
    
    'dot165b': { skill: 'insight', level: 1 },
    'dot166b': { skill: 'insight', level: 2 },
    'dot167b': { skill: 'insight', level: 3 },
    'dot168b': { skill: 'insight', level: 4 },
    'dot169b': { skill: 'insight', level: 5 },
    
    'dot173b': { skill: 'intimidation', level: 1 },
    'dot174b': { skill: 'intimidation', level: 2 },
    'dot175b': { skill: 'intimidation', level: 3 },
    'dot176b': { skill: 'intimidation', level: 4 },
    'dot177b': { skill: 'intimidation', level: 5 },
    
    'dot181b': { skill: 'leadership', level: 1 },
    'dot182b': { skill: 'leadership', level: 2 },
    'dot183b': { skill: 'leadership', level: 3 },
    'dot184b': { skill: 'leadership', level: 4 },
    'dot185b': { skill: 'leadership', level: 5 },
    
    'dot189b': { skill: 'performance', level: 1 },
    'dot190b': { skill: 'performance', level: 2 },
    'dot191b': { skill: 'performance', level: 3 },
    'dot192b': { skill: 'performance', level: 4 },
    'dot193b': { skill: 'performance', level: 5 },
    
    'dot197b': { skill: 'persuasion', level: 1 },
    'dot198b': { skill: 'persuasion', level: 2 },
    'dot199b': { skill: 'persuasion', level: 3 },
    'dot200b': { skill: 'persuasion', level: 4 },
    'dot201b': { skill: 'persuasion', level: 5 },
    
    'dot205b': { skill: 'streetwise', level: 1 },
    'dot206b': { skill: 'streetwise', level: 2 },
    'dot207b': { skill: 'streetwise', level: 3 },
    'dot208b': { skill: 'streetwise', level: 4 },
    'dot209b': { skill: 'streetwise', level: 5 },
    
    'dot213b': { skill: 'subterfuge', level: 1 },
    'dot214b': { skill: 'subterfuge', level: 2 },
    'dot215b': { skill: 'subterfuge', level: 3 },
    'dot216b': { skill: 'subterfuge', level: 4 },
    'dot217b': { skill: 'subterfuge', level: 5 },
    
    // Habilidades Mentales
    'dot221b': { skill: 'academics', level: 1 },
    'dot222b': { skill: 'academics', level: 2 },
    'dot223b': { skill: 'academics', level: 3 },
    'dot224b': { skill: 'academics', level: 4 },
    'dot225b': { skill: 'academics', level: 5 },
    
    'dot229b': { skill: 'awareness', level: 1 },
    'dot230b': { skill: 'awareness', level: 2 },
    'dot231b': { skill: 'awareness', level: 3 },
    'dot232b': { skill: 'awareness', level: 4 },
    'dot233b': { skill: 'awareness', level: 5 },
    
    'dot237b': { skill: 'finance', level: 1 },
    'dot238b': { skill: 'finance', level: 2 },
    'dot239b': { skill: 'finance', level: 3 },
    'dot240b': { skill: 'finance', level: 4 },
    'dot241b': { skill: 'finance', level: 5 },
    
    'dot245b': { skill: 'investigation', level: 1 },
    'dot246b': { skill: 'investigation', level: 2 },
    'dot247b': { skill: 'investigation', level: 3 },
    'dot248b': { skill: 'investigation', level: 4 },
    'dot249b': { skill: 'investigation', level: 5 },
    
    'dot253b': { skill: 'medicine', level: 1 },
    'dot254b': { skill: 'medicine', level: 2 },
    'dot255b': { skill: 'medicine', level: 3 },
    'dot256b': { skill: 'medicine', level: 4 },
    'dot257b': { skill: 'medicine', level: 5 },
    
    'dot261b': { skill: 'occult', level: 1 },
    'dot262b': { skill: 'occult', level: 2 },
    'dot263b': { skill: 'occult', level: 3 },
    'dot264b': { skill: 'occult', level: 4 },
    'dot265b': { skill: 'occult', level: 5 },
    
    'dot269b': { skill: 'politics', level: 1 },
    'dot270b': { skill: 'politics', level: 2 },
    'dot271b': { skill: 'politics', level: 3 },
    'dot272b': { skill: 'politics', level: 4 },
    'dot273b': { skill: 'politics', level: 5 },
    
    'dot277b': { skill: 'science', level: 1 },
    'dot278b': { skill: 'science', level: 2 },
    'dot279b': { skill: 'science', level: 3 },
    'dot280b': { skill: 'science', level: 4 },
    'dot281b': { skill: 'science', level: 5 },
    
    'dot285b': { skill: 'technology', level: 1 },
    'dot286b': { skill: 'technology', level: 2 },
    'dot287b': { skill: 'technology', level: 3 },
    'dot288b': { skill: 'technology', level: 4 },
    'dot289b': { skill: 'technology', level: 5 }
  }), []);

  // Función para obtener el valor mapeado de un dot
  const getMappedValue = useCallback((dotName) => {
    // Buscar en el mapeo directo
    if (dotMapping[dotName]) {
      const { skill, level } = dotMapping[dotName];
      const skillValue = characterData[skill];
      
      // Activar solo si el nivel es menor o igual al valor de la habilidad
      return skillValue >= level ? 1 : 0;
    }
    
    // Buscar patrones de último nivel (ab o ba)
    const baseDot = dotName.replace(/[ab]+$/, 'b');
    if (dotMapping[baseDot]) {
      const { skill, level } = dotMapping[baseDot];
      const skillValue = characterData[skill];
      
      // Si es un patrón de último nivel, activar solo si el valor es máximo y es el nivel 5
      if ((dotName.endsWith('ab') || dotName.endsWith('ba')) && level === 5) {
        return skillValue === 5 ? 1 : 0; // Solo activar si es nivel máximo
      }
    }
    
    return undefined;
  }, [dotMapping, characterData]);

  // Función para mapear automáticamente todos los dots
  const handleAutoMapDots = useCallback(() => {
    if (!dotFieldsByPage) return;
    
    setDotFieldsByPage(prev => {
      const updated = { ...prev };
      
      Object.keys(updated).forEach(pageKey => {
        updated[pageKey] = updated[pageKey].map(field => {
          const mappedValue = getMappedValue(field.name);
          return {
            ...field,
            mappedValue,
            active: mappedValue !== undefined && mappedValue > 0
          };
        });
      });
      
      return updated;
    });
  }, [dotFieldsByPage, getMappedValue]);

  // Función para actualizar un valor de habilidad
  const handleUpdateSkillValue = useCallback((skillName, value) => {
    setCharacterData(prev => ({
      ...prev,
      [skillName]: Math.max(0, Math.min(5, parseInt(value) || 0))
    }));
  }, []);

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
        ...characterData
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
  }, [dotFieldsByPage, characterData]);

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
          sx={{ mr: 1 }}
        >
          {isLoading ? 'Generando...' : 'Generar PDF con Dots'}
        </Button>

        <Button 
          variant="outlined" 
          onClick={() => setShowMappingPanel(!showMappingPanel)}
          color="secondary"
        >
          {showMappingPanel ? 'Ocultar' : 'Mostrar'} Mapeo de Habilidades
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

      {/* Panel de Mapeo de Habilidades */}
      {showMappingPanel && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Mapeo de Habilidades de la Ficha
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Configura los valores de las habilidades para mapear automáticamente los dots.
          </Typography>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Atributos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {[
                  { skill: 'strength', dot: 'dot5b' },
                  { skill: 'dexterity', dot: 'dot13b' },
                  { skill: 'stamina', dot: 'dot21b' },
                  { skill: 'charisma', dot: 'dot29b' },
                  { skill: 'manipulation', dot: 'dot37b' },
                  { skill: 'composure', dot: 'dot45b' },
                  { skill: 'intelligence', dot: 'dot53b' },
                  { skill: 'wits', dot: 'dot61b' },
                  { skill: 'resolve', dot: 'dot69b' }
                ].map(({ skill, dot }) => (
                  <Box key={skill} sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200 }}>
                    <TextField
                      label={skill.charAt(0).toUpperCase() + skill.slice(1)}
                      type="number"
                      value={characterData[skill]}
                      onChange={(e) => handleUpdateSkillValue(skill, e.target.value)}
                      inputProps={{ min: 0, max: 5 }}
                      size="small"
                      sx={{ width: 120 }}
                    />
                    <Chip 
                      label={`${dot} (1er nivel)`} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
                    />
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Habilidades Físicas</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {[
                  { skill: 'athletics', dot: 'dot77b' },
                  { skill: 'brawl', dot: 'dot85b' },
                  { skill: 'craft', dot: 'dot93b' },
                  { skill: 'drive', dot: 'dot101b' },
                  { skill: 'firearms', dot: 'dot109b' },
                  { skill: 'larceny', dot: 'dot117b' },
                  { skill: 'melee', dot: 'dot125b' },
                  { skill: 'stealth', dot: 'dot133b' },
                  { skill: 'survival', dot: 'dot141b' }
                ].map(({ skill, dot }) => (
                  <Box key={skill} sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200 }}>
                    <TextField
                      label={skill.charAt(0).toUpperCase() + skill.slice(1)}
                      type="number"
                      value={characterData[skill]}
                      onChange={(e) => handleUpdateSkillValue(skill, e.target.value)}
                      inputProps={{ min: 0, max: 5 }}
                      size="small"
                      sx={{ width: 120 }}
                    />
                    <Chip 
                      label={`${dot} (1er nivel)`} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
                    />
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Habilidades Sociales</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {[
                  { skill: 'animal', dot: 'dot149b' },
                  { skill: 'etiquette', dot: 'dot157b' },
                  { skill: 'insight', dot: 'dot165b' },
                  { skill: 'intimidation', dot: 'dot173b' },
                  { skill: 'leadership', dot: 'dot181b' },
                  { skill: 'performance', dot: 'dot189b' },
                  { skill: 'persuasion', dot: 'dot197b' },
                  { skill: 'streetwise', dot: 'dot205b' },
                  { skill: 'subterfuge', dot: 'dot213b' }
                ].map(({ skill, dot }) => (
                  <Box key={skill} sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200 }}>
                    <TextField
                      label={skill.charAt(0).toUpperCase() + skill.slice(1)}
                      type="number"
                      value={characterData[skill]}
                      onChange={(e) => handleUpdateSkillValue(skill, e.target.value)}
                      inputProps={{ min: 0, max: 5 }}
                      size="small"
                      sx={{ width: 120 }}
                    />
                    <Chip 
                      label={`${dot} (1er nivel)`} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
                    />
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Habilidades Mentales</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {[
                  { skill: 'academics', dot: 'dot221b' },
                  { skill: 'awareness', dot: 'dot229b' },
                  { skill: 'finance', dot: 'dot237b' },
                  { skill: 'investigation', dot: 'dot245b' },
                  { skill: 'medicine', dot: 'dot253b' },
                  { skill: 'occult', dot: 'dot261b' },
                  { skill: 'politics', dot: 'dot269b' },
                  { skill: 'science', dot: 'dot277b' },
                  { skill: 'technology', dot: 'dot285b' }
                ].map(({ skill, dot }) => (
                  <Box key={skill} sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200 }}>
                    <TextField
                      label={skill.charAt(0).toUpperCase() + skill.slice(1)}
                      type="number"
                      value={characterData[skill]}
                      onChange={(e) => handleUpdateSkillValue(skill, e.target.value)}
                      inputProps={{ min: 0, max: 5 }}
                      size="small"
                      sx={{ width: 120 }}
                    />
                    <Chip 
                      label={`${dot} (1er nivel)`} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
                    />
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              onClick={handleAutoMapDots}
              disabled={!dotFieldsByPage}
              color="secondary"
            >
              Mapear Dots Automáticamente
            </Button>
            <Typography variant="caption" sx={{ ml: 2, color: 'text.secondary' }}>
              Esto activará automáticamente los dots según los valores de las habilidades configuradas arriba.
            </Typography>
          </Box>
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
            <li>Usa "Mostrar Mapeo de Habilidades" para configurar los valores de la ficha</li>
            <li>Configura los valores de atributos y habilidades (0-5)</li>
            <li>Haz clic en "Mapear Dots Automáticamente" para activar según los valores</li>
            <li><strong>Sistema de Niveles:</strong> Cada habilidad tiene 5 dots consecutivos (ej: dot13b, dot14b, dot15b, dot16b, dot17b para Dexterity)</li>
            <li><strong>Activación por Nivel:</strong> Si Dexterity = 3, se activan dot13b, dot14b, y dot15b (los primeros 3 niveles)</li>
            <li><strong>Patrones Especiales:</strong> Los patrones "ab" o "ba" se activan solo si la habilidad está al máximo (5)</li>
            <li>Usa las pestañas para navegar entre las 4 páginas del PDF</li>
            <li>Activa "Ordenar Numéricamente" para ver los dots en orden</li>
            <li>Haz clic en "Generar PDF con Dots" para crear el PDF</li>
          </ul>
        </Typography>
      </Paper>
    </Box>
  );
} 