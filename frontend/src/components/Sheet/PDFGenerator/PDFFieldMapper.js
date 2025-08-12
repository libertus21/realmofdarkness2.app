import { PDFDocument } from "pdf-lib";

/**
 * Tool for mapping and displaying available fields in editable PDFs
 * This helps identify the exact field names in the PDF template
 */
export default class PDFFieldMapper {
  constructor(
    templatePath = "/static/pdfFicha/v5 WintersTeeth 4-Page Interactive.pdf"
  ) {
    this.templatePath = templatePath;
  }

  /**
   * Loads the PDF template and returns all available form fields organized by page
   */
  async mapFields() {
    try {
      console.log(
        "PDFFieldMapper: Loading PDF template from:",
        this.templatePath
      );
      const response = await fetch(this.templatePath);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const templateBytes = await response.arrayBuffer();
      console.log(
        "PDFFieldMapper: PDF loaded, size:",
        templateBytes.byteLength,
        "bytes"
      );

      const pdfDoc = await PDFDocument.load(templateBytes);
      console.log("PDFFieldMapper: PDF document loaded successfully");

      const form = pdfDoc.getForm();
      const fields = form.getFields();
      console.log("PDFFieldMapper: Found", fields.length, "form fields");

      // Organize fields by page
      const fieldsByPage = {
        page1: {
          textFields: [],
          checkBoxes: [],
          radioGroups: [],
          dropdowns: [],
          signatures: [],
        },
        page2: {
          textFields: [],
          checkBoxes: [],
          radioGroups: [],
          dropdowns: [],
          signatures: [],
        },
        page3: {
          textFields: [],
          checkBoxes: [],
          radioGroups: [],
          dropdowns: [],
          signatures: [],
        },
        page4: {
          textFields: [],
          checkBoxes: [],
          radioGroups: [],
          dropdowns: [],
          signatures: [],
        },
      };

      fields.forEach((field) => {
        const fieldName = field.getName();
        const fieldType = field.constructor.name;

        // Determine page based on field name patterns
        const page = this.determinePage(fieldName);

        const fieldInfo = {
          name: fieldName,
          isRequired: field.isRequired(),
          isReadOnly: field.isReadOnly(),
        };

        // Add type-specific properties
        switch (fieldType) {
          case "PDFTextField":
            fieldInfo.maxLength = field.getMaxLength();
            fieldsByPage[page].textFields.push(fieldInfo);
            break;
          case "PDFCheckBox":
            fieldInfo.isChecked = field.isChecked();
            fieldsByPage[page].checkBoxes.push(fieldInfo);
            break;
          case "PDFRadioGroup":
            fieldInfo.options = field.getOptions();
            fieldsByPage[page].radioGroups.push(fieldInfo);
            break;
          case "PDFDropdown":
            fieldInfo.options = field.getOptions();
            fieldsByPage[page].dropdowns.push(fieldInfo);
            break;
          case "PDFSignature":
            fieldsByPage[page].signatures.push(fieldInfo);
            break;
        }
      });

      console.log("PDFFieldMapper: Field mapping completed by page");
      console.log("Page 1:", this.getFieldCount(fieldsByPage.page1));
      console.log("Page 2:", this.getFieldCount(fieldsByPage.page2));
      console.log("Page 3:", this.getFieldCount(fieldsByPage.page3));
      console.log("Page 4:", this.getFieldCount(fieldsByPage.page4));

      return fieldsByPage;
    } catch (error) {
      console.error("PDFFieldMapper: Error mapping PDF fields:", error);
      throw new Error(`Error mapping PDF fields: ${error.message}`);
    }
  }

  /**
   * Determines which page a field belongs to based on field name patterns
   */
  determinePage(fieldName) {
    const name = fieldName.toLowerCase();

    // Page 1: Basic character info, attributes, skills
    if (
      name.includes("character") ||
      name.includes("player") ||
      name.includes("clan") ||
      name.includes("strength") ||
      name.includes("dexterity") ||
      name.includes("stamina") ||
      name.includes("charisma") ||
      name.includes("manipulation") ||
      name.includes("composure") ||
      name.includes("intelligence") ||
      name.includes("wits") ||
      name.includes("resolve") ||
      name.includes("athletics") ||
      name.includes("brawl") ||
      name.includes("craft") ||
      name.includes("drive") ||
      name.includes("firearms") ||
      name.includes("larceny") ||
      name.includes("melee") ||
      name.includes("stealth") ||
      name.includes("survival") ||
      name.includes("animal") ||
      name.includes("etiquette") ||
      name.includes("insight") ||
      name.includes("intimidation") ||
      name.includes("leadership") ||
      name.includes("performance") ||
      name.includes("persuasion") ||
      name.includes("streetwise") ||
      name.includes("subterfuge") ||
      name.includes("academics") ||
      name.includes("awareness") ||
      name.includes("finance") ||
      name.includes("investigation") ||
      name.includes("medicine") ||
      name.includes("occult") ||
      name.includes("politics") ||
      name.includes("science") ||
      name.includes("technology") ||
      (name.includes("dot") &&
        (name.includes("1") || name.includes("2") || name.includes("3")))
    ) {
      return "page1";
    }

    // Page 2: Disciplines, powers, advantages, backgrounds
    if (
      name.includes("discipline") ||
      name.includes("power") ||
      name.includes("advantage") ||
      name.includes("background") ||
      name.includes("merit") ||
      name.includes("flaw") ||
      (name.includes("dot") &&
        (name.includes("4") || name.includes("5") || name.includes("6")))
    ) {
      return "page2";
    }

    // Page 3: Blood potency, hunger, humanity, willpower, experience
    if (
      name.includes("blood") ||
      name.includes("hunger") ||
      name.includes("humanity") ||
      name.includes("willpower") ||
      name.includes("experience") ||
      name.includes("notes") ||
      (name.includes("dot") &&
        (name.includes("7") || name.includes("8") || name.includes("9")))
    ) {
      return "page3";
    }

    // Page 4: Appearance, description, other details
    if (
      name.includes("appearance") ||
      name.includes("description") ||
      name.includes("touchstone") ||
      name.includes("ambition") ||
      name.includes("desire") ||
      name.includes("sire") ||
      name.includes("generation") ||
      name.includes("predator") ||
      name.includes("concept") ||
      (name.includes("dot") &&
        (name.includes("0") ||
          name.includes("a") ||
          name.includes("b") ||
          name.includes("c")))
    ) {
      return "page4";
    }

    // Default to page 1 if no pattern matches
    return "page1";
  }

  /**
   * Gets the total field count for a page
   */
  getFieldCount(pageFields) {
    return (
      pageFields.textFields.length +
      pageFields.checkBoxes.length +
      pageFields.radioGroups.length +
      pageFields.dropdowns.length +
      pageFields.signatures.length
    );
  }

  /**
   * Prints field mapping to console for debugging, organized by page
   */
  async printFieldMapping() {
    try {
      const fieldsByPage = await this.mapFields();

      console.log("=== PDF Field Mapping by Page ===");

      Object.entries(fieldsByPage).forEach(([page, fields]) => {
        console.log(`\n${page.toUpperCase()}:`);
        console.log(`  Text Fields (${fields.textFields.length}):`);
        fields.textFields.forEach((field) => {
          console.log(
            `    - ${field.name} (Required: ${field.isRequired}, ReadOnly: ${field.isReadOnly})`
          );
        });

        console.log(`  Checkboxes (${fields.checkBoxes.length}):`);
        fields.checkBoxes.forEach((field) => {
          console.log(
            `    - ${field.name} (Required: ${field.isRequired}, ReadOnly: ${field.isReadOnly})`
          );
        });

        console.log(`  Radio Groups (${fields.radioGroups.length}):`);
        fields.radioGroups.forEach((field) => {
          console.log(
            `    - ${field.name} (Required: ${field.isRequired}, ReadOnly: ${field.isReadOnly})`
          );
          console.log(`      Options: ${field.options.join(", ")}`);
        });

        console.log(`  Dropdowns (${fields.dropdowns.length}):`);
        fields.dropdowns.forEach((field) => {
          console.log(
            `    - ${field.name} (Required: ${field.isRequired}, ReadOnly: ${field.isReadOnly})`
          );
          console.log(`      Options: ${field.options.join(", ")}`);
        });

        console.log(`  Signatures (${fields.signatures.length}):`);
        fields.signatures.forEach((field) => {
          console.log(
            `    - ${field.name} (Required: ${field.isRequired}, ReadOnly: ${field.isReadOnly})`
          );
        });
      });

      return fieldsByPage;
    } catch (error) {
      console.error("Error printing field mapping:", error);
      throw error;
    }
  }

  /**
   * Exports field mapping as JSON, organized by page
   */
  async exportFieldMapping() {
    try {
      const fieldsByPage = await this.mapFields();
      const jsonString = JSON.stringify(fieldsByPage, null, 2);

      // Create and download the JSON file
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "pdf_field_mapping_by_page.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return fieldsByPage;
    } catch (error) {
      throw new Error(`Error exporting field mapping: ${error.message}`);
    }
  }

  /**
   * Gets fields for a specific page
   */
  async getFieldsForPage(pageNumber) {
    try {
      const fieldsByPage = await this.mapFields();
      const pageKey = `page${pageNumber}`;

      if (fieldsByPage[pageKey]) {
        return fieldsByPage[pageKey];
      } else {
        throw new Error(`Page ${pageNumber} not found`);
      }
    } catch (error) {
      throw new Error(
        `Error getting fields for page ${pageNumber}: ${error.message}`
      );
    }
  }

  /**
   * Gets all dot fields organized by page
   */
  async getDotFieldsByPage() {
    try {
      const fieldsByPage = await this.mapFields();
      const dotFieldsByPage = {};

      Object.entries(fieldsByPage).forEach(([page, fields]) => {
        dotFieldsByPage[page] = fields.checkBoxes.filter((field) =>
          field.name.toLowerCase().includes("dot")
        );
      });

      return dotFieldsByPage;
    } catch (error) {
      throw new Error(`Error getting dot fields by page: ${error.message}`);
    }
  }
}
