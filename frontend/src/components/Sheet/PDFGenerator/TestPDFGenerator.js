import React, { useState } from 'react';
import { Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import PDFGeneratorFactory from './PDFGeneratorFactory';

/**
 * Test component to verify the editable PDF generator works correctly
 */
const TestPDFGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Sample character data for testing
  const testCharacterData = {
    name: "Test Vampire",
    player: "Test Player",
    chronicle: "Test Chronicle",
    clan: "Ventrue",
    generation: "13th",
    predatorType: "Consensualist",
    concept: "Noble Businessman",
    sire: "Unknown",
    ambition: "Control the city's financial district",
    desire: "Maintain social status",
    touchstone: "Family business",
    
    // Attributes
    strength: 3,
    dexterity: 2,
    stamina: 4,
    charisma: 4,
    manipulation: 3,
    composure: 3,
    intelligence: 3,
    wits: 2,
    resolve: 4,
    
    // Skills
    athletics: 2,
    brawl: 1,
    crafts: 0,
    drive: 2,
    firearms: 1,
    larceny: 0,
    melee: 1,
    stealth: 1,
    survival: 0,
    animalKen: 1,
    etiquette: 3,
    insight: 2,
    intimidation: 2,
    leadership: 3,
    performance: 1,
    persuasion: 4,
    streetwise: 1,
    subterfuge: 2,
    academics: 2,
    awareness: 2,
    finance: 4,
    investigation: 2,
    medicine: 0,
    occult: 1,
    politics: 3,
    science: 1,
    technology: 1,
    
    // Disciplines
    disciplines: {
      dominate: 2,
      presence: 3,
      fortitude: 1
    },
    
    // Advantages
    backgrounds: {
      "Resources": 3,
      "Status": 2,
      "Allies": 1
    },
    merits: ["Eat Food", "Iron Will"],
    flaws: ["Compulsion: Perfectionism"],
    bloodPotency: 1,
    humanity: 7,
    
    // Beliefs
    convictions: [
      "Never harm the innocent",
      "Maintain family legacy",
      "Protect the Masquerade"
    ],
    touchstones: [
      "Family business",
      "Childhood friend",
      "Mentor"
    ],
    
    // Health and Willpower
    health: 7,
    willpower: 7,
    
    // Experience
    experience: 15,
    experienceSpent: 10,
    
    // Haven
    haven: {
      name: "Downtown Penthouse",
      description: "Luxury apartment in the financial district",
      security: "High security building with doorman"
    },
    
    // Notes
    notes: "This is a test character for PDF generation."
  };

  const testGenerator = async (generatorType) => {
    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      console.log(`Testing ${generatorType} generator...`);
      
      const generator = PDFGeneratorFactory.createGenerator(generatorType, testCharacterData, {
        debug: true // Enable debug to see available fields
      });

      await generator.generate();
      
      setResult(`✅ PDF generado exitosamente con ${generatorType}`);
      console.log(`✅ Test passed for ${generatorType}`);
      
    } catch (err) {
      const errorMsg = `❌ Error con ${generatorType}: ${err.message}`;
      setError(errorMsg);
      console.error(errorMsg, err);
    } finally {
      setIsGenerating(false);
    }
  };

  const testAllGenerators = async () => {
    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      console.log("Testing all available generators...");
      
      // Test original generator
      await testGenerator("v5");
      
      // Test editable generator
      await testGenerator("v5_editable");
      
      setResult("✅ Todos los generadores probados exitosamente");
      
    } catch (err) {
      setError(`❌ Error en pruebas: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600 }}>
      <Typography variant="h4" gutterBottom>
        Test del Generador de PDF
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Este componente prueba el nuevo sistema de generación de PDFs editables.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => testGenerator("v5")}
          disabled={isGenerating}
          sx={{ mr: 2, mb: 2 }}
        >
          Probar Generador Original (V5)
        </Button>
        
        <Button
          variant="contained"
          color="primary"
          onClick={() => testGenerator("v5_editable")}
          disabled={isGenerating}
          sx={{ mr: 2, mb: 2 }}
        >
          Probar Generador Editable (V5)
        </Button>
        
        <Button
          variant="outlined"
          onClick={testAllGenerators}
          disabled={isGenerating}
          sx={{ mb: 2 }}
        >
          Probar Todos
        </Button>
      </Box>

      {isGenerating && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CircularProgress size={20} sx={{ mr: 1 }} />
          <Typography>Generando PDF...</Typography>
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
          Datos de prueba:
        </Typography>
        <Typography variant="body2" component="pre" sx={{ fontSize: '0.8rem' }}>
          {JSON.stringify(testCharacterData, null, 2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default TestPDFGenerator; 