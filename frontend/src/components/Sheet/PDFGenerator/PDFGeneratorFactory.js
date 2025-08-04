import Vampire5thPDFGenerator from './Vampire5thPDFGenerator';
import Werewolf5thPDFGenerator from './Werewolf5thPDFGenerator';

/**
 * Factory para crear generadores de PDF específicos según el tipo de ficha
 * Esta clase centraliza la creación de generadores y permite fácil extensión
 * para nuevos tipos de fichas
 */
export default class PDFGeneratorFactory {
  /**
   * Crea un generador de PDF apropiado para el tipo de ficha especificado
   * @param {string} sheetType - Tipo de ficha (v5, w5, m5, etc.)
   * @param {object} sheet - Datos de la ficha
   * @param {object} options - Opciones adicionales para el generador
   * @returns {BasePDFGenerator} Instancia del generador apropiado
   */
  static createGenerator(sheetType, sheet, options = {}) {
    switch (sheetType.toLowerCase()) {
      case 'v5':
      case 'vampire5th':
      case 'vampire5':
        return new Vampire5thPDFGenerator(sheet, options);
      
      // Aquí se pueden agregar más casos para otros tipos de fichas
      case 'w5':
      case 'werewolf5th':
      case 'werewolf5':
        return new Werewolf5thPDFGenerator(sheet, options);
      
      // case 'm5':
      // case 'mage5th':
      //   return new Mage5thPDFGenerator(sheet, options);
      
      // case 'v20':
      // case 'vampire20th':
      //   return new Vampire20thPDFGenerator(sheet, options);
      
      default:
        throw new Error(`Tipo de ficha no soportado: ${sheetType}`);
    }
  }

  /**
   * Obtiene la lista de tipos de fichas soportados
   * @returns {Array} Array de tipos soportados
   */
  static getSupportedTypes() {
    return [
      { value: 'v5', label: 'Vampiro 5th Edition', color: '#8B0000' },
      { value: 'w5', label: 'Hombre Lobo 5th Edition', color: '#8B4513' },
      // { value: 'm5', label: 'Mago 5th Edition', color: '#4B0082' },
      // { value: 'v20', label: 'Vampiro 20th Anniversary', color: '#8B0000' },
    ];
  }

  /**
   * Verifica si un tipo de ficha es soportado
   * @param {string} sheetType - Tipo de ficha a verificar
   * @returns {boolean} True si es soportado, false en caso contrario
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