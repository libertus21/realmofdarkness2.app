import EditablePDFGenerator from "../../EditablePDFGenerator";
import PDFFieldMapper from "../../PDFFieldMapper";

/**
 * PDF generator for Vampire 5th Edition using editable PDF template
 * This approach is much simpler and maintains the professional design
 */
export default class Vampire5thEditablePDFGenerator extends EditablePDFGenerator {
  constructor(sheet, options = {}) {
    super(sheet, {
      templatePath: "/static/pdfFicha/Básica V5 Editable.pdf",
      ...options,
    });
  }

  /**
   * Main generation method that fills the PDF template with character data
   */
  async generate() {
    // Load the template first
    await this.loadTemplate();

    // Debug: Log available form fields if in debug mode
    if (this.options.debug) {
      PDFFieldMapper.debugFormFields(this.form);
    }

    // Fill basic character information
    this.fillBasicInfo();
    
    // Fill attributes
    this.fillAttributes();
    
    // Fill skills
    this.fillSkills();
    
    // Fill disciplines
    this.fillDisciplines();
    
    // Fill advantages
    this.fillAdvantages();
    
    // Fill beliefs and convictions
    this.fillBeliefs();
    
    // Fill health and willpower
    this.fillHealthWillpower();
    
    // Fill experience
    this.fillExperience();
    
    // Fill haven information
    this.fillHaven();
    
    // Fill notes
    this.fillNotes();

    const fileName = `${this.sheet.name || "character"}_V5_Editable.pdf`;
    await this.save(fileName);
  }

  /**
   * Fills basic character information
   */
  fillBasicInfo() {
    const sheet = this.sheet;
    
    // Basic character info - using the actual field names from the PDF
    this.fillTextField("Nombre", sheet.name || "");
    this.fillTextField("Crónica", sheet.chronicle || "");
    this.fillTextField("Ambición", sheet.ambition || "");
    this.fillTextField("Sire", sheet.sire || "");
    this.fillTextField("Concepto", sheet.concept || "");
    this.fillTextField("Deseo", sheet.desire || "");
    this.fillTextField("Apariencia", sheet.appearance || "");
    this.fillTextField("Rasgos reseñables", sheet.notableFeatures || "");
    this.fillTextField("Fecha de nacimiento", sheet.birthDate || "");
    this.fillTextField("Fecha de defunción", sheet.deathDate || "");
    this.fillTextField("Edad verdadera", sheet.trueAge || "");
    this.fillTextField("Edad aparente", sheet.apparentAge || "");
    
    // Dropdown fields
    this.fillDropdown("Clan", sheet.clan || "");
    this.fillDropdown("Depredador", sheet.predatorType || "");
    this.fillDropdown("Generación", sheet.generation || "");
    this.fillDropdown("Concepto", sheet.concept || "");
    this.fillDropdown("Resonancia", sheet.resonance || "");
  }

  /**
   * Fills attributes section using the correct field names
   * Atributos.0.x.y format where:
   * 0 = Physical, 1 = Social, 2 = Mental
   * x = attribute index (0-2 for each category)
   * y = dot level (0-2 for each attribute)
   */
  fillAttributes() {
    const sheet = this.sheet;
    
    // Physical attributes (Atributos.0.x.y)
    this.fillAttributeDots("Atributos.0.0", sheet.strength || 0);      // Strength
    this.fillAttributeDots("Atributos.0.1", sheet.dexterity || 0);      // Dexterity  
    this.fillAttributeDots("Atributos.0.2", sheet.stamina || 0);        // Stamina
    
    // Social attributes (Atributos.1.x.y)
    this.fillAttributeDots("Atributos.1.0", sheet.charisma || 0);       // Charisma
    this.fillAttributeDots("Atributos.1.1", sheet.manipulation || 0);   // Manipulation
    this.fillAttributeDots("Atributos.1.2", sheet.composure || 0);      // Composure
    
    // Mental attributes (Atributos.2.x.y)
    this.fillAttributeDots("Atributos.2.0", sheet.intelligence || 0);   // Intelligence
    this.fillAttributeDots("Atributos.2.1", sheet.wits || 0);           // Wits
    this.fillAttributeDots("Atributos.2.2", sheet.resolve || 0);        // Resolve
  }

  /**
   * Fills attribute dots using the correct format
   * Atributos.x.y.z where z goes from 0 to 3 (4 levels total)
   */
  fillAttributeDots(baseFieldName, value) {
    for (let i = 0; i <= 3; i++) {  // Changed from 2 to 3 (4 levels: 0,1,2,3)
      const fieldName = `${baseFieldName}.${i}`;
      this.fillCheckBox(fieldName, i < value);
    }
  }

  /**
   * Fills skills section using the correct field names
   * Habilidades.x.y.z format where:
   * x = category (0-4: Physical, Social, Mental, etc.)
   * y = skill index within category
   * z = dot level (0-2)
   */
  fillSkills() {
    const sheet = this.sheet;
    
    // Physical skills (Habilidades.0.x.y)
    this.fillSkillDots("Habilidades.0.0", sheet.athletics || 0);       // Athletics
    this.fillSkillDots("Habilidades.0.1", sheet.brawl || 0);           // Brawl
    this.fillSkillDots("Habilidades.0.2", sheet.crafts || 0);          // Crafts
    this.fillSkillDots("Habilidades.0.3", sheet.drive || 0);           // Drive
    this.fillSkillDots("Habilidades.0.4", sheet.firearms || 0);        // Firearms
    this.fillSkillDots("Habilidades.0.5", sheet.larceny || 0);         // Larceny
    this.fillSkillDots("Habilidades.0.6", sheet.melee || 0);           // Melee
    this.fillSkillDots("Habilidades.0.7", sheet.stealth || 0);         // Stealth
    this.fillSkillDots("Habilidades.0.8", sheet.survival || 0);        // Survival
    
    // Social skills (Habilidades.1.x.y)
    this.fillSkillDots("Habilidades.1.0", sheet.animalKen || 0);       // Animal Ken
    this.fillSkillDots("Habilidades.1.1", sheet.etiquette || 0);       // Etiquette
    this.fillSkillDots("Habilidades.1.2", sheet.insight || 0);         // Insight
    this.fillSkillDots("Habilidades.1.3", sheet.intimidation || 0);    // Intimidation
    this.fillSkillDots("Habilidades.1.4", sheet.leadership || 0);      // Leadership
    this.fillSkillDots("Habilidades.1.5", sheet.performance || 0);     // Performance
    this.fillSkillDots("Habilidades.1.6", sheet.persuasion || 0);      // Persuasion
    this.fillSkillDots("Habilidades.1.7", sheet.streetwise || 0);      // Streetwise
    this.fillSkillDots("Habilidades.1.8", sheet.subterfuge || 0);      // Subterfuge
    
    // Mental skills (Habilidades.2.x.y)
    this.fillSkillDots("Habilidades.2.0", sheet.academics || 0);       // Academics
    this.fillSkillDots("Habilidades.2.1", sheet.awareness || 0);       // Awareness
    this.fillSkillDots("Habilidades.2.2", sheet.finance || 0);         // Finance
    this.fillSkillDots("Habilidades.2.3", sheet.investigation || 0);   // Investigation
    this.fillSkillDots("Habilidades.2.4", sheet.medicine || 0);        // Medicine
    this.fillSkillDots("Habilidades.2.5", sheet.occult || 0);          // Occult
    this.fillSkillDots("Habilidades.2.6", sheet.politics || 0);        // Politics
    this.fillSkillDots("Habilidades.2.7", sheet.science || 0);         // Science
    this.fillSkillDots("Habilidades.2.8", sheet.technology || 0);      // Technology
  }

  /**
   * Fills skill dots using the correct format
   * Habilidades.x.y.z where z goes from 0 to 3 (4 levels total)
   */
  fillSkillDots(baseFieldName, value) {
    for (let i = 0; i <= 3; i++) {  // Changed from 2 to 3 (4 levels: 0,1,2,3)
      const fieldName = `${baseFieldName}.${i}`;
      this.fillCheckBox(fieldName, i < value);
    }
  }

  /**
   * Fills disciplines section
   */
  fillDisciplines() {
    const sheet = this.sheet;
    
    if (sheet.disciplines) {
      // Map disciplines to the PDF format (pDisciplinas.x.y.z)
      const disciplineMapping = {
        animalism: "pDisciplinas.0",
        auspex: "pDisciplinas.1", 
        celerity: "pDisciplinas.2",
        dominate: "pDisciplinas.3",
        fortitude: "pDisciplinas.4",
        obfuscate: "pDisciplinas.5",
        potence: "pDisciplinas.6",
        presence: "pDisciplinas.7",
        protean: "pDisciplinas.8",
        bloodSorcery: "pDisciplinas.9",
        oblivion: "pDisciplinas.10",
        thinBloodAlchemy: "pDisciplinas.11"
      };
      
      Object.entries(sheet.disciplines).forEach(([discipline, value]) => {
        const baseField = disciplineMapping[discipline];
        if (baseField) {
          this.fillDisciplineDots(baseField, value);
        }
      });
    }
  }

  /**
   * Fills discipline dots
   * pDisciplinas.x.y.z where z goes from 0 to 3 (4 levels total)
   */
  fillDisciplineDots(baseFieldName, value) {
    for (let i = 0; i <= 3; i++) {  // Changed from 2 to 3 (4 levels: 0,1,2,3)
      const fieldName = `${baseFieldName}.${i}`;
      this.fillCheckBox(fieldName, i < value);
    }
  }

  /**
   * Fills advantages section
   */
  fillAdvantages() {
    const sheet = this.sheet;
    
    // Blood Potency
    this.fillBloodPotency(sheet.bloodPotency || 0);
    
    // Humanity
    this.fillHumanity(sheet.humanity || 7);
    
    // Merits and Flaws (p.MerYDef.x.y format)
    if (sheet.merits) {
      // Map merits to the PDF format
      // This would need to be customized based on the specific merits
    }
  }

  /**
   * Fills blood potency dots
   */
  fillBloodPotency(value) {
    for (let i = 0; i <= 9; i++) {
      const fieldName = `PotenciaSangre.${i}`;
      this.fillCheckBox(fieldName, i < value);
    }
  }

  /**
   * Fills humanity dots
   */
  fillHumanity(value) {
    for (let i = 0; i <= 9; i++) {
      const fieldName = `Humanidad.${i}`;
      this.fillCheckBox(fieldName, i < value);
    }
  }

  /**
   * Fills beliefs and convictions section
   */
  fillBeliefs() {
    const sheet = this.sheet;
    
    // Touchstones and convictions
    if (sheet.touchstones || sheet.convictions) {
      const beliefsText = [
        ...(sheet.convictions || []),
        ...(sheet.touchstones || [])
      ].join("; ");
      
      this.fillTextField("Piedras de Toque y Convicciones", beliefsText);
    }
  }

  /**
   * Fills health and willpower tracks
   */
  fillHealthWillpower() {
    const sheet = this.sheet;
    
    // Health track (Salud.x format)
    const maxHealth = sheet.stamina + 3;
    for (let i = 0; i <= 9; i++) {
      const fieldName = `Salud.${i}`;
      this.fillCheckBox(fieldName, i < maxHealth);
    }
    
    // Willpower track (FdV.x format)
    const maxWillpower = sheet.composure + sheet.resolve;
    for (let i = 0; i <= 9; i++) {
      const fieldName = `FdV.${i}`;
      this.fillCheckBox(fieldName, i < maxWillpower);
    }
    
    // Hunger track (Ansia.x format)
    const hunger = sheet.hunger || 0;
    for (let i = 0; i <= 4; i++) {
      const fieldName = `Ansia.${i}`;
      this.fillCheckBox(fieldName, i <= hunger);
    }
  }

  /**
   * Fills experience section
   */
  fillExperience() {
    const sheet = this.sheet;
    
    this.fillTextField("Experiencia Total", sheet.experience || 0);
    this.fillTextField("Experiencia Gastada", sheet.experienceSpent || 0);
  }

  /**
   * Fills haven information
   */
  fillHaven() {
    const sheet = this.sheet;
    
    if (sheet.haven) {
      // Haven info could go in notes or a specific field
      const havenInfo = `Haven: ${sheet.haven.name || ""} - ${sheet.haven.description || ""}`;
      this.fillTextField("Notas", (sheet.notes || "") + "\n" + havenInfo);
    }
  }

  /**
   * Fills notes section
   */
  fillNotes() {
    const sheet = this.sheet;
    
    if (sheet.notes) {
      this.fillTextField("Notas", sheet.notes);
    }
    
    if (sheet.history) {
      this.fillTextField("Historia", sheet.history);
    }
  }
}
