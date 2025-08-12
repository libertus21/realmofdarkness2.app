import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Paper,
  TextField,
  Switch,
  FormControlLabel,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import Vampire5thEditablePDFGenerator from "./sheet/5th/Vampire5thEditablePDFGenerator";

/**
 * Component for activating specific dot fields in the PDF
 */
export default function PDFDotActivator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [dotFields, setDotFields] = useState([
    { name: "dot317b", active: true, description: "Ejemplo de campo dot" },
    { name: "dot318a", active: false, description: "Otro campo dot" },
    { name: "dot319c", active: false, description: "Campo dot adicional" },
  ]);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldDescription, setNewFieldDescription] = useState("");

  const handleToggleDot = (index) => {
    const updatedFields = [...dotFields];
    updatedFields[index].active = !updatedFields[index].active;
    setDotFields(updatedFields);
  };

  const handleAddField = () => {
    if (newFieldName.trim()) {
      setDotFields([
        ...dotFields,
        {
          name: newFieldName.trim(),
          active: false,
          description: newFieldDescription.trim() || "Campo personalizado",
        },
      ]);
      setNewFieldName("");
      setNewFieldDescription("");
    }
  };

  const handleRemoveField = (index) => {
    const updatedFields = dotFields.filter((_, i) => i !== index);
    setDotFields(updatedFields);
  };

  const handleGeneratePDF = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      // Create a mock sheet for testing
      const mockSheet = {
        name: "Test Character",
        strength: 3,
        athletics: 2,
        // Add other properties as needed
      };

      // Create the generator
      const generator = new Vampire5thEditablePDFGenerator(mockSheet);

      // Override the fillSpecificDotFields method to use our custom fields
      const originalFillSpecificDotFields =
        generator.fillSpecificDotFields.bind(generator);

      generator.fillSpecificDotFields = function (form) {
        console.log("Activating custom dot fields...");

        // Activate the fields based on our list
        dotFields.forEach((field) => {
          if (field.active) {
            this.fillCheckboxField(form, field.name, true);
            console.log(`Activated: ${field.name}`);
          }
        });
      };

      // Generate the PDF
      await generator.generate();

      setSuccess(true);
      console.log("PDF generated successfully with custom dot activations");
    } catch (err) {
      console.error("Error generating PDF:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        PDF Dot Activator
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Este componente te permite activar campos de dots específicos en el PDF
        editable.
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Agregar Nuevo Campo
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Nombre del Campo"
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            placeholder="ej: dot317b"
            size="small"
          />
          <TextField
            label="Descripción"
            value={newFieldDescription}
            onChange={(e) => setNewFieldDescription(e.target.value)}
            placeholder="Descripción del campo"
            size="small"
          />
          <Button
            variant="outlined"
            onClick={handleAddField}
            disabled={!newFieldName.trim()}
          >
            Agregar
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Campos de Dots ({dotFields.filter((f) => f.active).length} activos)
        </Typography>

        <List dense>
          {dotFields.map((field, index) => (
            <ListItem
              key={index}
              sx={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "monospace" }}
                    >
                      {field.name}
                    </Typography>
                    {field.active && (
                      <Chip label="Activo" size="small" color="success" />
                    )}
                  </Box>
                }
                secondary={field.description}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.active}
                      onChange={() => handleToggleDot(index)}
                      size="small"
                    />
                  }
                  label=""
                />
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleRemoveField(index)}
                >
                  Eliminar
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleGeneratePDF}
          disabled={isLoading || dotFields.length === 0}
          sx={{ mr: 1 }}
        >
          {isLoading ? "Generando..." : "Generar PDF con Dots"}
        </Button>

        <Button
          variant="outlined"
          onClick={() => setDotFields([])}
          disabled={dotFields.length === 0}
        >
          Limpiar Todos
        </Button>
      </Box>

      {error && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: "error.light" }}>
          <Alert severity="error">{error}</Alert>
        </Paper>
      )}

      {success && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: "success.light" }}>
          <Alert severity="success">
            <Typography variant="h6">¡Éxito!</Typography>
            <Typography>
              PDF generado con los campos de dots activados.
            </Typography>
          </Alert>
        </Paper>
      )}

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Instrucciones:
        </Typography>
        <Typography variant="body2" component="div">
          <ul>
            <li>
              Agrega el nombre exacto del campo que quieres activar (ej:
              dot317b)
            </li>
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
