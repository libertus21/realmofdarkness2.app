import React, { useState } from "react";
import { 
  Tooltip, 
  IconButton, 
  Alert, 
  Snackbar, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText 
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CreateIcon from "@mui/icons-material/Create";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PDFGeneratorFactory from "./PDFGenerator/PDFGeneratorFactory";

/**
 * Modular component for exporting character sheet PDFs
 * Automatically detects sheet type and exports directly
 */
export default function PDFImportExport({ sheet }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedGenerator, setSelectedGenerator] = useState("default");

  // Function to detect sheet type from sheet.splat
  const detectSheetType = (sheet) => {
    if (!sheet || !sheet.splat) return "v5"; // Default fallback

    const splat = sheet.splat.toLowerCase();

    // Map splat values to sheet type codes
    const splatToSheetType = {
      vampire5th: "v5",
      werewolf5th: "w5",
      hunter5th: "h5",
      human5th: "h5",
      ghoul5th: "g5",
      vampire20th: "v20",
      werewolf20th: "w20",
      mage20th: "m20",
      changeling20th: "c20",
      wraith20th: "wr20",
      demon20th: "d20",
      human20th: "h20",
      ghoul20th: "g20",
    };

    return splatToSheetType[splat] || "v5";
  };

  const handleExport = async (generatorType = null) => {
    try {
      setIsProcessing(true);
      setError(null);

      const sheetType = detectSheetType(sheet);
      
      // Determine which generator to use
      let finalSheetType = sheetType;
      if (generatorType === "editable" && sheetType === "v5") {
        finalSheetType = "v5_editable";
      }
      
      const generator = PDFGeneratorFactory.createGenerator(finalSheetType, sheet, {
        debug: false // Set to true for testing
      });
      
      await generator.generate();
    } catch (err) {
      setError(`Error exporting PDF: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGeneratorSelect = (generatorType) => {
    setSelectedGenerator(generatorType);
    handleMenuClose();
    handleExport(generatorType);
  };

  const handleCloseError = () => {
    setError(null);
  };

  // Check if editable generator is available for this sheet type
  const sheetType = detectSheetType(sheet);
  const hasEditableOption = sheetType === "v5"; // Currently only V5 has editable option

  return (
    <>
      <Tooltip title="Export as PDF">
        <IconButton 
          onClick={hasEditableOption ? handleMenuOpen : () => handleExport()}
          disabled={isProcessing}
        >
          <PictureAsPdfIcon fontSize="large" color="secondary" />
        </IconButton>
      </Tooltip>

      {/* Menu for generator options */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleGeneratorSelect("default")}>
          <ListItemIcon>
            <CreateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Generado desde cero" 
            secondary="PDF generado completamente"
          />
        </MenuItem>
        
        <MenuItem onClick={() => handleGeneratorSelect("editable")}>
          <ListItemIcon>
            <AutoAwesomeIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Ficha editable (Recomendado)" 
            secondary="Mantiene diseño profesional"
          />
        </MenuItem>
      </Menu>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
