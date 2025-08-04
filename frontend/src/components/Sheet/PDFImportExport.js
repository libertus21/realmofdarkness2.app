import React, { useState, useRef } from 'react';
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PDFGeneratorFactory from './PDFGenerator/PDFGeneratorFactory';

/**
 * Modular component for importing and exporting character sheet PDFs
 * Supports multiple sheet types and editions
 */
export default function PDFImportExport({ sheet, sheetType = 'v5', onImportSuccess }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState('export');
  const [selectedSheetType, setSelectedSheetType] = useState(sheetType);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const supportedTypes = PDFGeneratorFactory.getSupportedTypes();

  const handleExport = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      const generator = PDFGeneratorFactory.createGenerator(selectedSheetType, sheet);
      generator.generate();
    } catch (err) {
      setError(`Error exporting PDF: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setError(null);

      // Here you would implement the PDF import logic
      // For now we just simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful import
      if (onImportSuccess) {
        onImportSuccess({
          name: file.name,
          type: selectedSheetType,
          // Here would go the data extracted from the PDF
        });
      }
      
      setIsDialogOpen(false);
    } catch (err) {
      setError(`Error importing PDF: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setError(null);
    setSelectedAction('export');
  };

  const openDialog = (action) => {
    setSelectedAction(action);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title="Export as PDF">
          <IconButton onClick={() => openDialog('export')}>
            <PictureAsPdfIcon fontSize="large" color="secondary" />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Import from PDF">
          <IconButton onClick={() => openDialog('import')}>
            <UploadFileIcon fontSize="large" color="primary" />
          </IconButton>
        </Tooltip>
      </Box>

      <Dialog open={isDialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedAction === 'export' ? 'Export PDF' : 'Import PDF'}
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {selectedAction === 'export' 
                ? 'Select the sheet type to export:'
                : 'Select the sheet type to import:'
              }
            </Typography>

            <FormControl fullWidth>
              <InputLabel>Sheet Type</InputLabel>
              <Select
                value={selectedSheetType}
                onChange={(e) => setSelectedSheetType(e.target.value)}
                label="Sheet Type"
              >
                {supportedTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {selectedAction === 'import' && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Select a PDF file to import:
              </Typography>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleImport}
                style={{ display: 'none' }}
              />
              
              <Button
                variant="outlined"
                onClick={handleFileSelect}
                disabled={isProcessing}
                fullWidth
              >
                Select PDF
              </Button>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {isProcessing && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <CircularProgress size={20} />
              <Typography variant="body2">
                {selectedAction === 'export' ? 'Generating PDF...' : 'Processing PDF...'}
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={isProcessing}>
            Cancel
          </Button>
          
          {selectedAction === 'export' && (
            <Button 
              onClick={handleExport} 
              disabled={isProcessing}
              variant="contained"
              startIcon={<PictureAsPdfIcon />}
            >
              Export
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
} 