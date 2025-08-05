import { PDFDocument } from 'pdf-lib';

/**
 * Tool for mapping and displaying available fields in editable PDFs
 * This helps identify the exact field names in the PDF template
 */
export default class PDFFieldMapper {
  constructor(templatePath = '/static/pdfFicha/v5 WintersTeeth 4-Page Interactive.pdf') {
    this.templatePath = templatePath;
  }

  /**
   * Loads the PDF template and returns all available form fields
   */
  async mapFields() {
    try {
      console.log('PDFFieldMapper: Loading PDF template from:', this.templatePath);
      const response = await fetch(this.templatePath);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const templateBytes = await response.arrayBuffer();
      console.log('PDFFieldMapper: PDF loaded, size:', templateBytes.byteLength, 'bytes');
      
      const pdfDoc = await PDFDocument.load(templateBytes);
      console.log('PDFFieldMapper: PDF document loaded successfully');
      
      const form = pdfDoc.getForm();
      const fields = form.getFields();
      console.log('PDFFieldMapper: Found', fields.length, 'form fields');

      const fieldMap = {
        textFields: [],
        checkBoxes: [],
        radioGroups: [],
        dropdowns: [],
        signatures: []
      };

      fields.forEach(field => {
        const fieldName = field.getName();
        const fieldType = field.constructor.name;

        switch (fieldType) {
          case 'PDFTextField':
            fieldMap.textFields.push({
              name: fieldName,
              isRequired: field.isRequired(),
              isReadOnly: field.isReadOnly(),
              maxLength: field.getMaxLength()
            });
            break;
          case 'PDFCheckBox':
            fieldMap.checkBoxes.push({
              name: fieldName,
              isRequired: field.isRequired(),
              isReadOnly: field.isReadOnly(),
              isChecked: field.isChecked()
            });
            break;
          case 'PDFRadioGroup':
            fieldMap.radioGroups.push({
              name: fieldName,
              isRequired: field.isRequired(),
              isReadOnly: field.isReadOnly(),
              options: field.getOptions()
            });
            break;
          case 'PDFDropdown':
            fieldMap.dropdowns.push({
              name: fieldName,
              isRequired: field.isRequired(),
              isReadOnly: field.isReadOnly(),
              options: field.getOptions()
            });
            break;
          case 'PDFSignature':
            fieldMap.signatures.push({
              name: fieldName,
              isRequired: field.isRequired(),
              isReadOnly: field.isReadOnly()
            });
            break;
        }
      });

      console.log('PDFFieldMapper: Field mapping completed');
      console.log('Text Fields:', fieldMap.textFields.length);
      console.log('Checkboxes:', fieldMap.checkBoxes.length);
      console.log('Radio Groups:', fieldMap.radioGroups.length);
      console.log('Dropdowns:', fieldMap.dropdowns.length);
      console.log('Signatures:', fieldMap.signatures.length);

      return fieldMap;
    } catch (error) {
      console.error('PDFFieldMapper: Error mapping PDF fields:', error);
      throw new Error(`Error mapping PDF fields: ${error.message}`);
    }
  }

  /**
   * Prints field mapping to console for debugging
   */
  async printFieldMapping() {
    try {
      const fieldMap = await this.mapFields();
      
      console.log('=== PDF Field Mapping ===');
      console.log('\nText Fields:');
      fieldMap.textFields.forEach(field => {
        console.log(`  - ${field.name} (Required: ${field.isRequired}, ReadOnly: ${field.isReadOnly})`);
      });

      console.log('\nCheckboxes:');
      fieldMap.checkBoxes.forEach(field => {
        console.log(`  - ${field.name} (Required: ${field.isRequired}, ReadOnly: ${field.isReadOnly})`);
      });

      console.log('\nRadio Groups:');
      fieldMap.radioGroups.forEach(field => {
        console.log(`  - ${field.name} (Required: ${field.isRequired}, ReadOnly: ${field.isReadOnly})`);
        console.log(`    Options: ${field.options.join(', ')}`);
      });

      console.log('\nDropdowns:');
      fieldMap.dropdowns.forEach(field => {
        console.log(`  - ${field.name} (Required: ${field.isRequired}, ReadOnly: ${field.isReadOnly})`);
        console.log(`    Options: ${field.options.join(', ')}`);
      });

      console.log('\nSignatures:');
      fieldMap.signatures.forEach(field => {
        console.log(`  - ${field.name} (Required: ${field.isRequired}, ReadOnly: ${field.isReadOnly})`);
      });

      return fieldMap;
    } catch (error) {
      console.error('Error printing field mapping:', error);
      throw error;
    }
  }

  /**
   * Exports field mapping as JSON
   */
  async exportFieldMapping() {
    try {
      const fieldMap = await this.mapFields();
      const jsonString = JSON.stringify(fieldMap, null, 2);
      
      // Create and download the JSON file
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'pdf_field_mapping.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return fieldMap;
    } catch (error) {
      throw new Error(`Error exporting field mapping: ${error.message}`);
    }
  }
} 