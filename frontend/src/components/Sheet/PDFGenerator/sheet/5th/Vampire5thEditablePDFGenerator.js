import BaseEditablePDFGenerator from '../../BaseEditablePDFGenerator';

/**
 * Generator for Vampire 5th Edition editable PDF character sheets
 * Uses the WintersTeeth 4-Page Interactive PDF as template
 */
export default class Vampire5thEditablePDFGenerator extends BaseEditablePDFGenerator {
  constructor(sheet, options = {}) {
    super(sheet, {
      templatePath: '/static/pdfFicha/v5 WintersTeeth 4-Page Interactive.pdf',
      ...options,
    });
  }

  /**
   * Maps character data to PDF form fields
   */
  async generate() {
    try {
      // Load the PDF template
      const pdfDoc = await this.loadTemplate();
      const form = pdfDoc.getForm();

      // Fill basic character information
      this.fillBasicInfo(form);
      
      // Fill attributes
      this.fillAttributes(form);
      
      // Fill skills
      this.fillSkills(form);
      
      // Fill disciplines and powers
      this.fillDisciplines(form);
      
      // Fill advantages and backgrounds
      this.fillAdvantages(form);
      
      // Fill blood potency and hunger
      this.fillBloodInfo(form);
      
      // Fill other sections
      this.fillOtherSections(form);

      // Fill specific dot fields
      this.fillSpecificDotFields(form);

      // Save the PDF
      const fileName = `${this.sheet.name || 'character'}_V5_Editable.pdf`;
      await this.save(pdfDoc, fileName);

      return pdfDoc;
    } catch (error) {
      throw new Error(`Error generating editable PDF: ${error.message}`);
    }
  }

  /**
   * Fills basic character information
   */
  fillBasicInfo(form) {
    const { sheet } = this;
    
    // Basic character info
    this.fillTextField(form, 'Character Name', sheet.name);
    this.fillTextField(form, 'Player Name', sheet.player_name);
    this.fillTextField(form, 'Chronicle', sheet.chronicle?.name);
    this.fillTextField(form, 'Clan', sheet.clan);
    this.fillTextField(form, 'Predator Type', sheet.predator_type);
    this.fillTextField(form, 'Generation', sheet.generation);
    this.fillTextField(form, 'Sire', sheet.sire);
    this.fillTextField(form, 'Concept', sheet.concept);
    this.fillTextField(form, 'Ambition', sheet.ambition);
    this.fillTextField(form, 'Desire', sheet.desire);
    this.fillTextField(form, 'Touchstone', sheet.touchstone);
  }

  /**
   * Fills attributes section
   */
  fillAttributes(form) {
    const { sheet } = this;
    
    // Physical attributes
    this.fillAttributeDots(form, 'Strength', sheet.strength);
    this.fillAttributeDots(form, 'Dexterity', sheet.dexterity);
    this.fillAttributeDots(form, 'Stamina', sheet.stamina);
    
    // Social attributes
    this.fillAttributeDots(form, 'Charisma', sheet.charisma);
    this.fillAttributeDots(form, 'Manipulation', sheet.manipulation);
    this.fillAttributeDots(form, 'Composure', sheet.composure);
    
    // Mental attributes
    this.fillAttributeDots(form, 'Intelligence', sheet.intelligence);
    this.fillAttributeDots(form, 'Wits', sheet.wits);
    this.fillAttributeDots(form, 'Resolve', sheet.resolve);
  }

  /**
   * Fills skills section
   */
  fillSkills(form) {
    const { sheet } = this;
    
    // Physical skills
    this.fillSkillDots(form, 'Athletics', sheet.athletics);
    this.fillSkillDots(form, 'Brawl', sheet.brawl);
    this.fillSkillDots(form, 'Craft', sheet.craft);
    this.fillSkillDots(form, 'Drive', sheet.drive);
    this.fillSkillDots(form, 'Firearms', sheet.firearms);
    this.fillSkillDots(form, 'Larceny', sheet.larceny);
    this.fillSkillDots(form, 'Melee', sheet.melee);
    this.fillSkillDots(form, 'Stealth', sheet.stealth);
    this.fillSkillDots(form, 'Survival', sheet.survival);
    
    // Social skills
    this.fillSkillDots(form, 'Animal Ken', sheet.animal_ken);
    this.fillSkillDots(form, 'Etiquette', sheet.etiquette);
    this.fillSkillDots(form, 'Insight', sheet.insight);
    this.fillSkillDots(form, 'Intimidation', sheet.intimidation);
    this.fillSkillDots(form, 'Leadership', sheet.leadership);
    this.fillSkillDots(form, 'Performance', sheet.performance);
    this.fillSkillDots(form, 'Persuasion', sheet.persuasion);
    this.fillSkillDots(form, 'Streetwise', sheet.streetwise);
    this.fillSkillDots(form, 'Subterfuge', sheet.subterfuge);
    
    // Mental skills
    this.fillSkillDots(form, 'Academics', sheet.academics);
    this.fillSkillDots(form, 'Awareness', sheet.awareness);
    this.fillSkillDots(form, 'Finance', sheet.finance);
    this.fillSkillDots(form, 'Investigation', sheet.investigation);
    this.fillSkillDots(form, 'Medicine', sheet.medicine);
    this.fillSkillDots(form, 'Occult', sheet.occult);
    this.fillSkillDots(form, 'Politics', sheet.politics);
    this.fillSkillDots(form, 'Science', sheet.science);
    this.fillSkillDots(form, 'Technology', sheet.technology);
  }

  /**
   * Fills disciplines and powers
   */
  fillDisciplines(form) {
    const { sheet } = this;
    
    // Fill discipline levels
    if (sheet.disciplines) {
      Object.entries(sheet.disciplines).forEach(([discipline, level]) => {
        this.fillTextField(form, `${discipline} Level`, level);
      });
    }
    
    // Fill discipline powers
    if (sheet.discipline_powers) {
      Object.entries(sheet.discipline_powers).forEach(([discipline, powers]) => {
        if (Array.isArray(powers)) {
          powers.forEach((power, index) => {
            this.fillTextField(form, `${discipline} Power ${index + 1}`, power);
          });
        }
      });
    }
  }

  /**
   * Fills advantages and backgrounds
   */
  fillAdvantages(form) {
    const { sheet } = this;
    
    // Fill backgrounds
    if (sheet.backgrounds) {
      Object.entries(sheet.backgrounds).forEach(([background, value]) => {
        this.fillTextField(form, background, value);
      });
    }
    
    // Fill merits and flaws
    if (sheet.merits) {
      Object.entries(sheet.merits).forEach(([merit, value]) => {
        this.fillTextField(form, merit, value);
      });
    }
  }

  /**
   * Fills blood potency and hunger information
   */
  fillBloodInfo(form) {
    const { sheet } = this;
    
    this.fillTextField(form, 'Blood Potency', sheet.blood_potency);
    this.fillTextField(form, 'Hunger', sheet.hunger);
    this.fillTextField(form, 'Humanity', sheet.humanity);
    this.fillTextField(form, 'Willpower', sheet.willpower);
    this.fillTextField(form, 'Max Willpower', sheet.max_willpower);
  }

  /**
   * Fills other sections
   */
  fillOtherSections(form) {
    const { sheet } = this;
    
    // Fill experience
    this.fillTextField(form, 'Experience', sheet.experience);
    this.fillTextField(form, 'Total Experience', sheet.total_experience);
    
    // Fill notes
    this.fillTextField(form, 'Notes', sheet.notes);
    
    // Fill appearance
    this.fillTextField(form, 'Appearance', sheet.appearance);
    
    // Fill description
    this.fillTextField(form, 'Description', sheet.description);
  }

  /**
   * Fills specific dot fields that need to be activated
   * This method allows you to activate specific checkboxes by their exact field names
   */
  fillSpecificDotFields(form) {
    const { sheet } = this;
    
    // Example: Activate specific dot fields based on character data
    // You can add more specific mappings here based on the PDF field names
    
    // Activate dot317b (example - you can modify this based on your needs)
    this.fillCheckboxField(form, 'dot317b', true);
    
    // You can add more specific dot activations here
    // this.fillCheckboxField(form, 'dot318a', true);
    // this.fillCheckboxField(form, 'dot319c', false);
    
    // Example: Activate dots based on attribute values
    if (sheet.strength >= 3) {
      this.fillCheckboxField(form, 'dot317b', true); // Activate if strength is 3 or higher
    }
    
    // Example: Activate dots based on skill values
    if (sheet.athletics >= 2) {
      this.fillCheckboxField(form, 'dot320a', true); // Activate if athletics is 2 or higher
    }
    
    // You can add more mappings as needed
    console.log('Filling specific dot fields...');
  }

  /**
   * Helper method to fill attribute dots
   */
  fillAttributeDots(form, attributeName, value) {
    if (value === undefined || value === null) return;
    
    // Try to fill the attribute value field
    this.fillTextField(form, attributeName, value);
    
    // Also try to fill individual dot fields
    for (let i = 1; i <= 5; i++) {
      const fieldName = `${attributeName} ${i}`;
      this.fillCheckboxField(form, fieldName, i <= value);
    }
  }

  /**
   * Helper method to fill skill dots
   */
  fillSkillDots(form, skillName, value) {
    if (value === undefined || value === null) return;
    
    // Try to fill the skill value field
    this.fillTextField(form, skillName, value);
    
    // Also try to fill individual dot fields
    for (let i = 1; i <= 5; i++) {
      const fieldName = `${skillName} ${i}`;
      this.fillCheckboxField(form, fieldName, i <= value);
    }
  }

  /**
   * Method to activate a specific dot field by name
   * @param {string} fieldName - The exact field name from the PDF
   * @param {boolean} active - Whether to activate (true) or deactivate (false) the field
   */
  activateSpecificDot(form, fieldName, active = true) {
    this.fillCheckboxField(form, fieldName, active);
    console.log(`Activated field ${fieldName}: ${active}`);
  }
} 