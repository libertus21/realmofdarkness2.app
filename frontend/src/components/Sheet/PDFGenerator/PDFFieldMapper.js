/**
 * Utility class to help map PDF form fields and debug field names
 * This is useful for identifying the correct field names in editable PDFs
 */
export default class PDFFieldMapper {
  /**
   * Maps character data to PDF form field names
   * This mapping should be updated based on the actual field names in the PDF template
   */
  static getFieldMapping() {
    return {
      // Basic character info
      character_name: "character_name",
      player_name: "player_name", 
      chronicle: "chronicle",
      clan: "clan",
      generation: "generation",
      predator_type: "predator_type",
      concept: "concept",
      sire: "sire",
      ambition: "ambition",
      desire: "desire",
      touchstone: "touchstone",
      
      // Attributes
      strength: "strength",
      dexterity: "dexterity", 
      stamina: "stamina",
      charisma: "charisma",
      manipulation: "manipulation",
      composure: "composure",
      intelligence: "intelligence",
      wits: "wits",
      resolve: "resolve",
      
      // Physical skills
      athletics: "athletics",
      brawl: "brawl",
      crafts: "crafts",
      drive: "drive",
      firearms: "firearms",
      larceny: "larceny",
      melee: "melee",
      stealth: "stealth",
      survival: "survival",
      
      // Social skills
      animal_ken: "animal_ken",
      etiquette: "etiquette",
      insight: "insight",
      intimidation: "intimidation",
      leadership: "leadership",
      performance: "performance",
      persuasion: "persuasion",
      streetwise: "streetwise",
      subterfuge: "subterfuge",
      
      // Mental skills
      academics: "academics",
      awareness: "awareness",
      finance: "finance",
      investigation: "investigation",
      medicine: "medicine",
      occult: "occult",
      politics: "politics",
      science: "science",
      technology: "technology",
      
      // Disciplines
      animalism: "animalism",
      auspex: "auspex",
      celerity: "celerity",
      dominate: "dominate",
      fortitude: "fortitude",
      obfuscate: "obfuscate",
      potence: "potence",
      presence: "presence",
      protean: "protean",
      blood_sorcery: "blood_sorcery",
      oblivion: "oblivion",
      thin_blood_alchemy: "thin_blood_alchemy",
      
      // Advantages
      backgrounds: "backgrounds",
      merits: "merits",
      flaws: "flaws",
      blood_potency: "blood_potency",
      humanity: "humanity",
      
      // Beliefs
      conviction_1: "conviction_1",
      conviction_2: "conviction_2", 
      conviction_3: "conviction_3",
      touchstone_1: "touchstone_1",
      touchstone_2: "touchstone_2",
      touchstone_3: "touchstone_3",
      
      // Health and Willpower
      health_max: "health_max",
      health_current: "health_current",
      willpower_max: "willpower_max",
      willpower_current: "willpower_current",
      
      // Experience
      experience_total: "experience_total",
      experience_spent: "experience_spent",
      experience_available: "experience_available",
      
      // Haven
      haven_name: "haven_name",
      haven_description: "haven_description",
      haven_security: "haven_security",
      
      // Notes
      notes: "notes"
    };
  }

  /**
   * Gets the field name for a dot-based attribute/skill
   * @param {string} baseName - Base field name
   * @param {number} dotNumber - Dot number (1-5)
   * @returns {string} Full field name
   */
  static getDotFieldName(baseName, dotNumber) {
    return `${baseName}_${dotNumber}`;
  }

  /**
   * Gets all dot field names for an attribute/skill
   * @param {string} baseName - Base field name
   * @param {number} maxDots - Maximum number of dots (default 5)
   * @returns {Array} Array of field names
   */
  static getAllDotFieldNames(baseName, maxDots = 5) {
    const fieldNames = [];
    for (let i = 1; i <= maxDots; i++) {
      fieldNames.push(this.getDotFieldName(baseName, i));
    }
    return fieldNames;
  }

  /**
   * Debug function to log all available form fields
   * @param {PDFForm} form - PDF form object
   */
  static debugFormFields(form) {
    if (!form) {
      console.warn("No form provided for debugging");
      return;
    }

    const fields = form.getFields();
    console.log("Available PDF form fields:");
    
    fields.forEach(field => {
      console.log(`- ${field.getName()} (${field.constructor.name})`);
    });
    
    console.log(`Total fields found: ${fields.length}`);
  }

  /**
   * Validates if a field exists in the form
   * @param {PDFForm} form - PDF form object
   * @param {string} fieldName - Field name to check
   * @returns {boolean} True if field exists
   */
  static fieldExists(form, fieldName) {
    if (!form) return false;
    
    try {
      const field = form.getField(fieldName);
      return field !== null;
    } catch {
      return false;
    }
  }

  /**
   * Gets a list of missing fields by comparing expected vs actual
   * @param {PDFForm} form - PDF form object
   * @param {Array} expectedFields - Array of expected field names
   * @returns {Array} Array of missing field names
   */
  static getMissingFields(form, expectedFields) {
    if (!form) return expectedFields;
    
    const missing = [];
    expectedFields.forEach(fieldName => {
      if (!this.fieldExists(form, fieldName)) {
        missing.push(fieldName);
      }
    });
    
    return missing;
  }
} 