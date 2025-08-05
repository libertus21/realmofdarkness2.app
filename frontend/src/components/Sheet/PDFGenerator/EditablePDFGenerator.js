import {
  PDFDocument,
  PDFForm,
  PDFTextField,
  PDFCheckBox,
  PDFDropdown,
} from "pdf-lib";

/**
 * Base class for generating PDFs by editing existing editable PDF templates
 * This approach is much simpler and more aesthetic than generating from scratch
 */
export default class EditablePDFGenerator {
  constructor(sheet, options = {}) {
    this.sheet = sheet;
    this.options = {
      templatePath: null, // Path to the editable PDF template
      ...options,
    };

    this.pdfDoc = null;
    this.form = null;
  }

  /**
   * Loads the PDF template and prepares it for editing
   */
  async loadTemplate() {
    try {
      // Load the template PDF
      const templateBytes = await this.fetchTemplate();
      this.pdfDoc = await PDFDocument.load(templateBytes);
      this.form = this.pdfDoc.getForm();

      return true;
    } catch (error) {
      console.error("Error loading PDF template:", error);
      throw new Error(`No se pudo cargar la plantilla PDF: ${error.message}`);
    }
  }

  /**
   * Fetches the PDF template from the public directory
   */
  async fetchTemplate() {
    const response = await fetch(this.options.templatePath);
    if (!response.ok) {
      throw new Error(
        `No se pudo cargar la plantilla desde: ${this.options.templatePath}`
      );
    }
    return await response.arrayBuffer();
  }

  /**
   * Fills a text field in the PDF form
   */
  fillTextField(fieldName, value) {
    try {
      const field = this.form.getTextField(fieldName);
      if (field && value !== undefined && value !== null) {
        field.setText(value.toString());
      }
    } catch (error) {
      console.warn(
        `Campo no encontrado o error al llenar ${fieldName}:`,
        error
      );
    }
  }

  /**
   * Fills a checkbox in the PDF form
   */
  fillCheckBox(fieldName, checked) {
    try {
      const field = this.form.getCheckBox(fieldName);
      if (field) {
        if (checked) {
          field.check();
        } else {
          field.uncheck();
        }
      }
    } catch (error) {
      console.warn(
        `Checkbox no encontrado o error al llenar ${fieldName}:`,
        error
      );
    }
  }

  /**
   * Fills a dropdown/choice field in the PDF form
   */
  fillDropdown(fieldName, value) {
    try {
      const field = this.form.getDropdown(fieldName);
      if (field && value !== undefined && value !== null) {
        field.select(value.toString());
      }
    } catch (error) {
      console.warn(
        `Dropdown no encontrado o error al llenar ${fieldName}:`,
        error
      );
    }
  }

  /**
   * Fills multiple checkboxes for a dot-based system (attributes, skills, etc.)
   */
  fillDotField(baseFieldName, value, maxDots = 5) {
    for (let i = 1; i <= maxDots; i++) {
      const fieldName = `${baseFieldName}_${i}`;
      this.fillCheckBox(fieldName, i <= value);
    }
  }

  /**
   * Main method that must be implemented by each subclass
   */
  async generate() {
    throw new Error(
      "The generate() method must be implemented by the subclass"
    );
  }

  /**
   * Saves the PDF with the specified filename
   */
  async save(fileName) {
    if (!this.pdfDoc) {
      throw new Error("No se ha cargado ninguna plantilla PDF");
    }

    const pdfBytes = await this.pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Gets the PDF as blob (useful for preview or upload)
   */
  async getBlob() {
    if (!this.pdfDoc) {
      throw new Error("No se ha cargado ninguna plantilla PDF");
    }

    const pdfBytes = await this.pdfDoc.save();
    return new Blob([pdfBytes], { type: "application/pdf" });
  }

  /**
   * Gets the PDF as base64 (useful for preview)
   */
  async getBase64() {
    if (!this.pdfDoc) {
      throw new Error("No se ha cargado ninguna plantilla PDF");
    }

    const pdfBytes = await this.pdfDoc.save();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));
    return `data:application/pdf;base64,${base64}`;
  }

  /**
   * Gets the list of available form fields (useful for debugging)
   */
  getFormFields() {
    if (!this.form) {
      return [];
    }

    const fields = this.form.getFields();
    return fields.map((field) => ({
      name: field.getName(),
      type: field.constructor.name,
    }));
  }
}
