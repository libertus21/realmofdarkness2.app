import React, { useState } from "react";
import {
  Tooltip,
  IconButton,
  Alert,
  Snackbar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import PDFGeneratorFactory from "./PDFGenerator/PDFGeneratorFactory";
import PDFFieldMapper from "./PDFGenerator/PDFFieldMapper";

/**
 * Modular component for exporting character sheet PDFs
 * Automatically detects sheet type and exports directly
 */
export default function PDFImportExport({ sheet }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const handleExport = async (useEditable = false) => {
    try {
      setIsProcessing(true);
      setError(null);

      const sheetType = detectSheetType(sheet);
      const generator = PDFGeneratorFactory.createGenerator(sheetType, sheet, {
        useEditable,
      });

      if (useEditable) {
        await generator.generate();
      } else {
        generator.generate();
      }
    } catch (err) {
      setError(`Error exporting PDF: ${err.message}`);
    } finally {
      setIsProcessing(false);
      setAnchorEl(null);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleMapFields = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      const mapper = new PDFFieldMapper();
      await mapper.printFieldMapping();
      console.log(
        "Field mapping printed to console. Check browser console for details."
      );
    } catch (err) {
      setError(`Error mapping fields: ${err.message}`);
    } finally {
      setIsProcessing(false);
      setAnchorEl(null);
    }
  };

  return (
    <>
      <Tooltip title="Export as PDF">
        <IconButton onClick={handleMenuOpen} disabled={isProcessing}>
          <PictureAsPdfIcon fontSize="large" color="secondary" />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleExport(false)}>
          <ListItemIcon>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="PDF Generado"
            secondary="Genera un PDF desde cero"
          />
        </MenuItem>
        <MenuItem onClick={() => handleExport(true)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="PDF Editable"
            secondary="Rellena el PDF editable existente"
          />
        </MenuItem>
        <MenuItem onClick={handleMapFields}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Mapear Campos"
            secondary="Ver campos disponibles en consola"
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
