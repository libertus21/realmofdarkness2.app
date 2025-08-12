import Vampire5thPDFGenerator from "./sheet/5th/Vampire5thPDFGenerator";
import Werewolf5thPDFGenerator from "./sheet/5th/Werewolf5thPDFGenerator";
import Vampire5thEditablePDFGenerator from "./sheet/5th/Vampire5thEditablePDFGenerator";

/**
 * Factory for creating specific PDF generators according to sheet type
 * This class centralizes generator creation and allows easy extension
 * for new sheet types
 */
export default class PDFGeneratorFactory {
  /**
   * Creates an appropriate PDF generator for the specified sheet type
   * @param {string} sheetType - Sheet type (v5, w5, m5, etc.)
   * @param {object} sheet - Sheet data
   * @param {object} options - Additional options for the generator
   * @returns {BasePDFGenerator} Instance of the appropriate generator
   */
  static createGenerator(sheetType, sheet, options = {}) {
    const useEditable = options.useEditable || false;

    switch (sheetType.toLowerCase()) {
      case "v5":
      case "vampire5th":
      case "vampire5":
        if (useEditable) {
          return new Vampire5thEditablePDFGenerator(sheet, options);
        }
        return new Vampire5thPDFGenerator(sheet, options);

      // Here you can add more cases for other sheet types
      case "w5":
      case "werewolf5th":
      case "werewolf5":
        return new Werewolf5thPDFGenerator(sheet, options);

      // case 'm5':
      // case 'mage5th':
      //   return new Mage5thPDFGenerator(sheet, options);

      // case 'v20':
      // case 'vampire20th':
      //   return new Vampire20thPDFGenerator(sheet, options);

      default:
        throw new Error(`Unsupported sheet type: ${sheetType}`);
    }
  }

  /**
   * Gets the list of supported sheet types
   * @returns {Array} Array of supported types
   */
  static getSupportedTypes() {
    return [
      { value: "v5", label: "Vampire 5th Edition", color: "#8B0000" },
      { value: "w5", label: "Werewolf 5th Edition", color: "#8B4513" },
      // { value: 'm5', label: 'Mage 5th Edition', color: '#4B0082' },
      // { value: 'v20', label: 'Vampire 20th Anniversary', color: '#8B0000' },
    ];
  }

  /**
   * Checks if a sheet type is supported
   * @param {string} sheetType - Sheet type to check
   * @returns {boolean} True if supported, false otherwise
   */
  static isSupported(sheetType) {
    try {
      this.createGenerator(sheetType, {});
      return true;
    } catch {
      return false;
    }
  }
}
