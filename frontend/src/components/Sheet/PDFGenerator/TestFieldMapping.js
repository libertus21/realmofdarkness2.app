import React, { useState } from 'react';
import { Button, Box, Typography, Alert, CircularProgress, Paper } from '@mui/material';
import { PDFDocument } from 'pdf-lib';

/**
 * Test component to verify field mapping works correctly
 */
const TestFieldMapping = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Test character data with the correct field structure
  const testCharacterData = {
    name: "Drácula",
    chronicle: "Test Chronicle",
    ambition: "Control the city",
    sire: "Unknown",
    concept: "Noble Vampire",
    desire: "Maintain power",
    appearance: "Tall and imposing",
    notableFeatures: "Pale skin, dark eyes",
    birthDate: "1431",
    deathDate: "1476",
    trueAge: "590",
    apparentAge: "35",
    clan: "Toreador",
    predatorType: "Consensualist",
    generation: "13ª",
    resonance: "Choleric",
    
    // Attributes
    strength: 4,
    dexterity: 3,
    stamina: 4,
    charisma: 4,
    manipulation: 3,
    composure: 3,
    intelligence: 3,
    wits: 2,
    resolve: 4,
    
    // Skills
    athletics: 3,
    brawl: 2,
    crafts: 1,
    drive: 2,
    firearms: 1,
    larceny: 0,
    melee: 2,
    stealth: 1,
    survival: 0,
    animalKen: 1,
    etiquette: 4,
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
      presence: 4,
      dominate: 3,
      fortitude: 2
    },
    
    // Advantages
    bloodPotency: 1,
    humanity: 7,
    hunger: 2,
    
    // Experience
    experience: 15,
    experienceSpent: 10,
    
    // Notes
    notes: "Test character for PDF generation",
    history: "Ancient vampire with centuries of experience"
  };

  const testFieldMapping = async () => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      console.log('🧪 Probando mapeo de campos específicos...');
      
      // Load the PDF template
      const response = await fetch('/static/pdfFicha/Básica V5 Editable.pdf');
      if (!response.ok) {
        throw new Error('No se pudo cargar el PDF template');
      }
      
      const templateBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(templateBytes);
      const form = pdfDoc.getForm();
      
      let fieldsFilled = 0;
      let errors = [];
      
      // Test basic text fields
      const textFields = [
        { field: "Nombre", value: testCharacterData.name },
        { field: "Crónica", value: testCharacterData.chronicle },
        { field: "Ambición", value: testCharacterData.ambition },
        { field: "Sire", value: testCharacterData.sire },
        { field: "Concepto", value: testCharacterData.concept },
        { field: "Deseo", value: testCharacterData.desire },
        { field: "Apariencia", value: testCharacterData.appearance },
        { field: "Rasgos reseñables", value: testCharacterData.notableFeatures },
        { field: "Fecha de nacimiento", value: testCharacterData.birthDate },
        { field: "Fecha de defunción", value: testCharacterData.deathDate },
        { field: "Edad verdadera", value: testCharacterData.trueAge },
        { field: "Edad aparente", value: testCharacterData.apparentAge },
        { field: "Notas", value: testCharacterData.notes },
        { field: "Historia", value: testCharacterData.history },
        { field: "Experiencia Total", value: testCharacterData.experience },
        { field: "Experiencia Gastada", value: testCharacterData.experienceSpent }
      ];
      
      textFields.forEach(({ field, value }) => {
        try {
          const formField = form.getTextField(field);
          formField.setText(value.toString());
          console.log(`✅ Campo de texto llenado: ${field} = ${value}`);
          fieldsFilled++;
        } catch (err) {
          errors.push(`❌ Error en campo ${field}: ${err.message}`);
        }
      });
      
      // Test dropdown fields
      const dropdownFields = [
        { field: "Clan", value: testCharacterData.clan },
        { field: "Depredador", value: testCharacterData.predatorType },
        { field: "Generación", value: testCharacterData.generation },
        { field: "Resonancia", value: testCharacterData.resonance }
      ];
      
      dropdownFields.forEach(({ field, value }) => {
        try {
          const formField = form.getDropdown(field);
          formField.select(value);
          console.log(`✅ Dropdown llenado: ${field} = ${value}`);
          fieldsFilled++;
        } catch (err) {
          errors.push(`❌ Error en dropdown ${field}: ${err.message}`);
        }
      });
      
      // Test attribute checkboxes
      const attributes = [
        { base: "Atributos.0.0", value: testCharacterData.strength },      // Strength
        { base: "Atributos.0.1", value: testCharacterData.dexterity },     // Dexterity
        { base: "Atributos.0.2", value: testCharacterData.stamina },       // Stamina
        { base: "Atributos.1.0", value: testCharacterData.charisma },      // Charisma
        { base: "Atributos.1.1", value: testCharacterData.manipulation },  // Manipulation
        { base: "Atributos.1.2", value: testCharacterData.composure },     // Composure
        { base: "Atributos.2.0", value: testCharacterData.intelligence },  // Intelligence
        { base: "Atributos.2.1", value: testCharacterData.wits },         // Wits
        { base: "Atributos.2.2", value: testCharacterData.resolve }        // Resolve
      ];
      
      attributes.forEach(({ base, value }) => {
        for (let i = 0; i <= 3; i++) {  // Changed from 2 to 3 (4 levels: 0,1,2,3)
          try {
            const fieldName = `${base}.${i}`;
            const formField = form.getCheckBox(fieldName);
            if (i < value) {
              formField.check();
              console.log(`✅ Checkbox marcado: ${fieldName}`);
            } else {
              formField.uncheck();
              console.log(`✅ Checkbox desmarcado: ${fieldName}`);
            }
            fieldsFilled++;
          } catch (err) {
            errors.push(`❌ Error en checkbox ${base}.${i}: ${err.message}`);
          }
        }
      });
      
      // Test health and willpower
      const maxHealth = testCharacterData.stamina + 3;
      const maxWillpower = testCharacterData.composure + testCharacterData.resolve;
      
      // Health track
      for (let i = 0; i <= 9; i++) {
        try {
          const fieldName = `Salud.${i}`;
          const formField = form.getCheckBox(fieldName);
          if (i < maxHealth) {
            formField.check();
            console.log(`✅ Salud marcada: ${fieldName}`);
          } else {
            formField.uncheck();
            console.log(`✅ Salud desmarcada: ${fieldName}`);
          }
          fieldsFilled++;
        } catch (err) {
          errors.push(`❌ Error en salud ${i}: ${err.message}`);
        }
      }
      
      // Willpower track
      for (let i = 0; i <= 9; i++) {
        try {
          const fieldName = `FdV.${i}`;
          const formField = form.getCheckBox(fieldName);
          if (i < maxWillpower) {
            formField.check();
            console.log(`✅ FdV marcado: ${fieldName}`);
          } else {
            formField.uncheck();
            console.log(`✅ FdV desmarcado: ${fieldName}`);
          }
          fieldsFilled++;
        } catch (err) {
          errors.push(`❌ Error en FdV ${i}: ${err.message}`);
        }
      }
      
      // Hunger track
      for (let i = 0; i <= 4; i++) {
        try {
          const fieldName = `Ansia.${i}`;
          const formField = form.getCheckBox(fieldName);
          if (i <= testCharacterData.hunger) {
            formField.check();
            console.log(`✅ Ansia marcada: ${fieldName}`);
          } else {
            formField.uncheck();
            console.log(`✅ Ansia desmarcada: ${fieldName}`);
          }
          fieldsFilled++;
        } catch (err) {
          errors.push(`❌ Error en ansia ${i}: ${err.message}`);
        }
      }
      
      // Blood Potency
      for (let i = 0; i <= 9; i++) {
        try {
          const fieldName = `PotenciaSangre.${i}`;
          const formField = form.getCheckBox(fieldName);
          if (i < testCharacterData.bloodPotency) {
            formField.check();
            console.log(`✅ Potencia marcada: ${fieldName}`);
          } else {
            formField.uncheck();
            console.log(`✅ Potencia desmarcada: ${fieldName}`);
          }
          fieldsFilled++;
        } catch (err) {
          errors.push(`❌ Error en potencia ${i}: ${err.message}`);
        }
      }
      
      // Humanity
      for (let i = 0; i <= 9; i++) {
        try {
          const fieldName = `Humanidad.${i}`;
          const formField = form.getCheckBox(fieldName);
          if (i < testCharacterData.humanity) {
            formField.check();
            console.log(`✅ Humanidad marcada: ${fieldName}`);
          } else {
            formField.uncheck();
            console.log(`✅ Humanidad desmarcada: ${fieldName}`);
          }
          fieldsFilled++;
        } catch (err) {
          errors.push(`❌ Error en humanidad ${i}: ${err.message}`);
        }
      }
      
      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      // Create download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Test_Field_Mapping.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      const resultMsg = `✅ PDF generado exitosamente! Campos llenados: ${fieldsFilled}`;
      if (errors.length > 0) {
        resultMsg += `\n❌ Errores: ${errors.length}`;
        console.log('❌ Errores encontrados:', errors);
      }
      
      setResult(resultMsg);
      console.log(`📊 Total de campos procesados: ${fieldsFilled}`);
      
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
        Test de Mapeo de Campos
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Este componente prueba el mapeo específico de campos del PDF editable.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={testFieldMapping}
          disabled={isProcessing}
          sx={{ mb: 2 }}
        >
          Probar Mapeo de Campos
        </Button>
      </Box>

      {isProcessing && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CircularProgress size={20} sx={{ mr: 1 }} />
          <Typography>Probando mapeo...</Typography>
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

      <Paper sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Datos de prueba:
        </Typography>
        <Typography variant="body2" component="pre" sx={{ fontSize: '0.8rem' }}>
          {JSON.stringify(testCharacterData, null, 2)}
        </Typography>
      </Paper>
    </Box>
  );
};

export default TestFieldMapping; 