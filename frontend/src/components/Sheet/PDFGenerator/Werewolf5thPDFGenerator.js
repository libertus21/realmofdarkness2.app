import BasePDFGenerator from './BasePDFGenerator';

/**
 * Generador de PDF específico para Hombre Lobo 5th Edition
 * Extiende BasePDFGenerator con funcionalidades específicas de W5
 */
export default class Werewolf5thPDFGenerator extends BasePDFGenerator {
  constructor(sheet, options = {}) {
    super(sheet, {
      colors: {
        primary: [0.55, 0.27, 0.07], // Marrón para hombre lobo
        text: [0, 0, 0],
        border: [0.4, 0.2, 0.05],
      },
      ...options
    });
  }

  generate() {
    this.generateHeader();
    this.generateCharacterInfo();
    this.generateAttributes();
    this.generateSkills();
    this.addNewPage();
    this.generateGifts();
    this.generateAdvantages();
    this.generateBeliefs();
    this.addNewPage();
    this.generateNotes();
    this.generateHealthRage();
    this.generateExperience();
    this.generateTerritory();
    
    const fileName = `${this.sheet.name || "character"}_W5.pdf`;
    this.save(fileName);
  }

  generateHeader() {
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(24);
    this.pdf.setTextColor(...this.colors.primary);
    this.pdf.text("WEREWOLF", this.pageWidth / 2, this.yPosition, { align: "center" });
    this.yPosition += this.options.lineHeight * 2;
    this.pdf.setFontSize(16);
    this.pdf.text("THE APOCALYPSE 5th EDITION", this.pageWidth / 2, this.yPosition, {
      align: "center",
    });
    this.yPosition += this.options.lineHeight * 3;
  }

  generateCharacterInfo() {
    let sectionStart = this.yPosition;
    this.pdf.setTextColor(...this.colors.text);
    this.pdf.setFontSize(10);

    // Primera columna
    this.pdf.setFont("helvetica", "bold");
    this.pdf.text("Name:", this.options.margin, this.yPosition);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.text(this.sheet.name || "", this.options.margin + 25, this.yPosition);
    this.yPosition += this.options.lineHeight * 1.5;

    this.pdf.setFont("helvetica", "bold");
    this.pdf.text("Chronicle:", this.options.margin, this.yPosition);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.text(this.sheet.chronicle || "", this.options.margin + 25, this.yPosition);
    this.yPosition += this.options.lineHeight * 1.5;

    this.pdf.setFont("helvetica", "bold");
    this.pdf.text("Auspice:", this.options.margin, this.yPosition);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.text(this.sheet.auspice || "", this.options.margin + 25, this.yPosition);
    this.yPosition += this.options.lineHeight * 1.5;

    this.pdf.setFont("helvetica", "bold");
    this.pdf.text("Tribe:", this.options.margin, this.yPosition);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.text(this.sheet.tribe || "", this.options.margin + 25, this.yPosition);
    this.yPosition += this.options.lineHeight * 1.5;

    this.pdf.setFont("helvetica", "bold");
    this.pdf.text("Breed:", this.options.margin, this.yPosition);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.text(this.sheet.breed || "", this.options.margin + 25, this.yPosition);
    this.yPosition += this.options.lineHeight * 1.5;

    // Segunda columna
    const col2X = this.pageWidth / 2;
    this.yPosition = sectionStart;

    this.pdf.setFont("helvetica", "bold");
    this.pdf.text("Primal Urge:", col2X, this.yPosition);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.text(String(this.sheet.primal_urge || 0), col2X + 35, this.yPosition);
    this.yPosition += this.options.lineHeight * 1.5;

    this.pdf.setFont("helvetica", "bold");
    this.pdf.text("Rage:", col2X, this.yPosition);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.text(String(this.sheet.rage || 0), col2X + 35, this.yPosition);
    this.yPosition += this.options.lineHeight * 1.5;

    this.pdf.setFont("helvetica", "bold");
    this.pdf.text("Gnosis:", col2X, this.yPosition);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.text(String(this.sheet.gnosis || 0), col2X + 35, this.yPosition);
    this.yPosition += this.options.lineHeight * 1.5;

    this.pdf.setFont("helvetica", "bold");
    this.pdf.text("Harmony:", col2X, this.yPosition);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.text(String(this.sheet.harmony || 0), col2X + 35, this.yPosition);
    this.yPosition += this.options.lineHeight * 2;

    this.drawSimpleBox("CHARACTER INFORMATION", sectionStart - this.options.lineHeight, this.yPosition);
    this.yPosition += this.options.sectionSpacing * 2;
  }

  generateAttributes() {
    // Similar a Vampire5thPDFGenerator pero con atributos específicos de W5
    const sectionStart = this.yPosition;
    this.pdf.setFont("helvetica", "bold");

    // Físicos
    const physicalX = this.options.margin + 10;
    this.pdf.text("Physical", physicalX, this.yPosition);
    this.yPosition += this.options.lineHeight * 1.5;

    const attributes = [
      { name: "Strength", value: this.sheet.attributes?.strength || 0 },
      { name: "Dexterity", value: this.sheet.attributes?.dexterity || 0 },
      { name: "Stamina", value: this.sheet.attributes?.stamina || 0 },
    ];

    attributes.forEach((attr) => {
      this.pdf.setFont("helvetica", "normal");
      this.pdf.text(attr.name, physicalX, this.yPosition);
      this.drawSimpleDots(attr.value, physicalX + 30, this.yPosition - 1.5);
      this.yPosition += this.options.lineHeight;
    });

    // Sociales
    this.yPosition = sectionStart;
    const socialX = this.options.margin + this.contentWidth / 3 + 5;
    this.pdf.setFont("helvetica", "bold");
    this.pdf.text("Social", socialX, this.yPosition);
    this.yPosition += this.options.lineHeight * 1.5;

    const socialAttributes = [
      { name: "Charisma", value: this.sheet.attributes?.charisma || 0 },
      { name: "Manipulation", value: this.sheet.attributes?.manipulation || 0 },
      { name: "Composure", value: this.sheet.attributes?.composure || 0 },
    ];

    socialAttributes.forEach((attr) => {
      this.pdf.setFont("helvetica", "normal");
      this.pdf.text(attr.name, socialX, this.yPosition);
      this.drawSimpleDots(attr.value, socialX + 30, this.yPosition - 1.5);
      this.yPosition += this.options.lineHeight;
    });

    // Mentales
    this.yPosition = sectionStart;
    const mentalX = this.options.margin + (2 * this.contentWidth) / 3;
    this.pdf.setFont("helvetica", "bold");
    this.pdf.text("Mental", mentalX, this.yPosition);
    this.yPosition += this.options.lineHeight * 1.5;

    const mentalAttributes = [
      { name: "Intelligence", value: this.sheet.attributes?.intelligence || 0 },
      { name: "Wits", value: this.sheet.attributes?.wits || 0 },
      { name: "Resolve", value: this.sheet.attributes?.resolve || 0 },
    ];

    mentalAttributes.forEach((attr) => {
      this.pdf.setFont("helvetica", "normal");
      this.pdf.text(attr.name, mentalX, this.yPosition);
      this.drawSimpleDots(attr.value, mentalX + 30, this.yPosition - 1.5);
      this.yPosition += this.options.lineHeight;
    });

    const attrEndY = sectionStart + this.options.lineHeight * 5;
    this.drawSimpleBox("ATTRIBUTES", sectionStart - this.options.lineHeight, attrEndY);
    this.yPosition = attrEndY + this.options.sectionSpacing * 2;
  }

  generateSkills() {
    // Similar a Vampire5thPDFGenerator pero con habilidades específicas de W5
    const sectionStart = this.yPosition;

    // Habilidades Físicas
    this.yPosition += this.options.lineHeight * 1.5;
    const physicalX = this.options.margin + 10;

    const physicalSkills = [
      { name: "Athletics", value: this.sheet.skills?.athletics?.value || 0 },
      { name: "Brawl", value: this.sheet.skills?.brawl?.value || 0 },
      { name: "Craft", value: this.sheet.skills?.craft?.value || 0 },
      { name: "Drive", value: this.sheet.skills?.drive?.value || 0 },
      { name: "Firearms", value: this.sheet.skills?.firearms?.value || 0 },
      { name: "Melee", value: this.sheet.skills?.melee?.value || 0 },
      { name: "Larceny", value: this.sheet.skills?.larceny?.value || 0 },
      { name: "Stealth", value: this.sheet.skills?.stealth?.value || 0 },
      { name: "Survival", value: this.sheet.skills?.survival?.value || 0 },
    ];

    physicalSkills.forEach((skill) => {
      this.pdf.setFont("helvetica", "normal");
      this.pdf.text(skill.name, physicalX, this.yPosition);
      this.drawSimpleDots(skill.value, physicalX + 30, this.yPosition - 1.5);
      this.yPosition += this.options.lineHeight;
    });

    // Habilidades Sociales
    this.yPosition = sectionStart;
    this.yPosition += this.options.lineHeight * 1.5;
    const socialX = this.options.margin + this.contentWidth / 3 + 5;

    const socialSkills = [
      { name: "Animal Ken", value: this.sheet.skills?.animal_ken?.value || 0 },
      { name: "Etiquette", value: this.sheet.skills?.etiquette?.value || 0 },
      { name: "Insight", value: this.sheet.skills?.insight?.value || 0 },
      { name: "Intimidation", value: this.sheet.skills?.intimidation?.value || 0 },
      { name: "Leadership", value: this.sheet.skills?.leadership?.value || 0 },
      { name: "Performance", value: this.sheet.skills?.performance?.value || 0 },
      { name: "Persuasion", value: this.sheet.skills?.persuasion?.value || 0 },
      { name: "Streetwise", value: this.sheet.skills?.streetwise?.value || 0 },
      { name: "Subterfuge", value: this.sheet.skills?.subterfuge?.value || 0 },
    ];

    socialSkills.forEach((skill) => {
      this.pdf.setFont("helvetica", "normal");
      this.pdf.text(skill.name, socialX, this.yPosition);
      this.drawSimpleDots(skill.value, socialX + 30, this.yPosition - 1.5);
      this.yPosition += this.options.lineHeight;
    });

    // Habilidades Mentales
    this.yPosition = sectionStart;
    this.yPosition += this.options.lineHeight * 1.5;
    const mentalX = this.options.margin + (2 * this.contentWidth) / 3;

    const mentalSkills = [
      { name: "Academics", value: this.sheet.skills?.academics?.value || 0 },
      { name: "Awareness", value: this.sheet.skills?.awareness?.value || 0 },
      { name: "Finance", value: this.sheet.skills?.finance?.value || 0 },
      { name: "Investigation", value: this.sheet.skills?.investigation?.value || 0 },
      { name: "Medicine", value: this.sheet.skills?.medicine?.value || 0 },
      { name: "Occult", value: this.sheet.skills?.occult?.value || 0 },
      { name: "Politics", value: this.sheet.skills?.politics?.value || 0 },
      { name: "Science", value: this.sheet.skills?.science?.value || 0 },
      { name: "Technology", value: this.sheet.skills?.technology?.value || 0 },
    ];

    mentalSkills.forEach((skill) => {
      this.pdf.setFont("helvetica", "normal");
      this.pdf.text(skill.name, mentalX, this.yPosition);
      this.drawSimpleDots(skill.value, mentalX + 30, this.yPosition - 1.5);
      this.yPosition += this.options.lineHeight;
    });

    const skillsEndY = sectionStart + this.options.lineHeight * 11;
    this.drawSimpleBox("SKILLS", sectionStart - this.options.lineHeight, skillsEndY);
    this.yPosition = skillsEndY + this.options.sectionSpacing * 2;
  }

  generateGifts() {
    const sectionStart = this.yPosition;
    this.pdf.setFont("helvetica", "bold");

    if (this.sheet.gifts && Object.keys(this.sheet.gifts).length > 0) {
      Object.entries(this.sheet.gifts).forEach(([gift, giftData]) => {
        const level = typeof giftData === 'object' ? giftData.value || 0 : giftData || 0;
        
        if (level > 0) {
          this.pdf.setFont("helvetica", "normal");
          this.pdf.text(gift, this.options.margin + 10, this.yPosition);
          this.drawSimpleDots(level, this.options.margin + 50, this.yPosition - 1.5, 5);
          this.yPosition += this.options.lineHeight;
        }
      });
    } else {
      this.pdf.setFont("helvetica", "normal");
      this.pdf.text("No gifts", this.options.margin + 10, this.yPosition);
      this.yPosition += this.options.lineHeight;
    }

    this.drawSimpleBox("GIFTS", sectionStart - this.options.lineHeight, this.yPosition);
    this.yPosition += this.options.sectionSpacing * 2;
  }

  generateAdvantages() {
    const sectionStart = this.yPosition;

    const addAdvantageSection = (title, items, startY) => {
      if (!items || items.length === 0) return startY;

      this.pdf.setFont("helvetica", "bold");
      this.pdf.text(title, this.options.margin + 10, startY);
      let currentY = startY + this.options.lineHeight * 1.5;

      items.forEach((item) => {
        if (item.name) {
          this.pdf.setFont("helvetica", "normal");
          this.pdf.text(item.name, this.options.margin + 15, currentY);
          this.drawSimpleDots(item.rating || item.level || 0, this.options.margin + 70, currentY - 1.5);
          currentY += this.options.lineHeight;

          if (item.description) {
            const heightUsed = this.addWrappedText(
              item.description,
              this.options.margin + 20,
              currentY,
              this.contentWidth - 40
            );
            currentY += heightUsed;
          }

          if (item.notes) {
            this.pdf.setFont("helvetica", "italic");
            const heightUsed = this.addWrappedText(
              item.notes,
              this.options.margin + 20,
              currentY,
              this.contentWidth - 40
            );
            currentY += heightUsed;
          }
          currentY += this.options.lineHeight / 2;
        }
      });

      return currentY;
    };

    let advantagesY = this.yPosition;
    advantagesY = addAdvantageSection("Merits", this.sheet.merits, advantagesY);
    advantagesY = addAdvantageSection("Flaws", this.sheet.flaws, advantagesY);
    advantagesY = addAdvantageSection("Backgrounds", this.sheet.backgrounds, advantagesY);

    this.drawSimpleBox("ADVANTAGES", sectionStart - this.options.lineHeight, advantagesY);
    this.yPosition = advantagesY + this.options.sectionSpacing * 2;
  }

  generateBeliefs() {
    if (this.sheet.tenets || this.sheet.touchstones || this.sheet.convictions) {
      const sectionStart = this.yPosition;

      if (this.sheet.tenets) {
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text("Tenets", this.options.margin + 10, this.yPosition);
        this.yPosition += this.options.lineHeight * 1.5;

        if (Array.isArray(this.sheet.tenets)) {
          this.sheet.tenets.forEach((tenet, index) => {
            if (tenet && tenet.trim()) {
              this.pdf.setFont("helvetica", "normal");
              const heightUsed = this.addWrappedText(
                `${index + 1}. ${tenet}`,
                this.options.margin + 15,
                this.yPosition,
                this.contentWidth - 30
              );
              this.yPosition += heightUsed + this.options.lineHeight / 2;
            }
          });
        } else {
          this.pdf.setFont("helvetica", "normal");
          const heightUsed = this.addWrappedText(
            this.sheet.tenets,
            this.options.margin + 15,
            this.yPosition,
            this.contentWidth - 30
          );
          this.yPosition += heightUsed + this.options.lineHeight;
        }
      }

      this.drawSimpleBox("BELIEFS & CONVICTIONS", sectionStart - this.options.lineHeight, this.yPosition);
      this.yPosition += this.options.sectionSpacing * 2;
    }
  }

  generateNotes() {
    if (this.sheet.notes || this.sheet.notes2 || this.sheet.history || this.sheet.appearance_description) {
      const sectionStart = this.yPosition;

      if (this.sheet.history) {
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text("History", this.options.margin + 10, this.yPosition);
        this.yPosition += this.options.lineHeight * 1.5;

        this.pdf.setFont("helvetica", "normal");
        const heightUsed = this.addWrappedText(
          this.sheet.history,
          this.options.margin + 15,
          this.yPosition,
          this.contentWidth - 30
        );
        this.yPosition += heightUsed + this.options.lineHeight;
      }

      if (this.sheet.appearance_description) {
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text("Appearance", this.options.margin + 10, this.yPosition);
        this.yPosition += this.options.lineHeight * 1.5;

        this.pdf.setFont("helvetica", "normal");
        const heightUsed = this.addWrappedText(
          this.sheet.appearance_description,
          this.options.margin + 15,
          this.yPosition,
          this.contentWidth - 30
        );
        this.yPosition += heightUsed + this.options.lineHeight;
      }

      if (this.sheet.notes) {
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text("Notes", this.options.margin + 10, this.yPosition);
        this.yPosition += this.options.lineHeight * 1.5;

        this.pdf.setFont("helvetica", "normal");
        const heightUsed = this.addWrappedText(
          this.sheet.notes,
          this.options.margin + 15,
          this.yPosition,
          this.contentWidth - 30
        );
        this.yPosition += heightUsed + this.options.lineHeight;
      }

      if (this.sheet.notes2) {
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text("Additional Notes", this.options.margin + 10, this.yPosition);
        this.yPosition += this.options.lineHeight * 1.5;

        this.pdf.setFont("helvetica", "normal");
        const heightUsed = this.addWrappedText(
          this.sheet.notes2,
          this.options.margin + 15,
          this.yPosition,
          this.contentWidth - 30
        );
        this.yPosition += heightUsed + this.options.lineHeight;
      }

      this.drawSimpleBox("NOTES & DESCRIPTIONS", sectionStart - this.options.lineHeight, this.yPosition);
      this.yPosition += this.options.sectionSpacing * 2;
    }
  }

  generateHealthRage() {
    const sectionStart = this.yPosition;
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(12);
    this.pdf.setTextColor(...this.colors.primary);
    this.pdf.text("HEALTH & RAGE", this.options.margin, this.yPosition);
    this.pdf.setTextColor(...this.colors.text);
    this.pdf.setFontSize(10);
    this.yPosition += this.options.lineHeight * 2;

    // Health
    const healthY = this.yPosition;
    const healthBoxY = healthY + this.options.lineHeight * 1.9;
    this.pdf.setFont("helvetica", "bold");
    this.pdf.text("Health", this.options.margin + 10, healthY);
    this.yPosition += this.options.lineHeight * 1.9;

    const healthTotal = this.sheet.health?.total || 10;
    const healthSuperficial = this.sheet.health?.superficial || 0;
    const healthAggravated = this.sheet.health?.aggravated || 0;

    for (let i = 0; i < healthTotal; i++) {
      const boxX = this.options.margin + 15 + i * 5;
      if (i < healthAggravated) {
        this.pdf.setFillColor(0, 0, 0);
        this.pdf.rect(boxX, healthBoxY - 2, 4, 4, "F");
        this.pdf.setTextColor(1, 1, 1);
        this.pdf.setFontSize(6);
        this.pdf.text("X", boxX + 1, healthBoxY + 1);
        this.pdf.setTextColor(0, 0, 0);
        this.pdf.setFontSize(10);
      } else if (i < healthAggravated + healthSuperficial) {
        this.pdf.setDrawColor(0, 0, 0);
        this.pdf.setLineWidth(0.2);
        this.pdf.rect(boxX, healthBoxY - 2, 4, 4);
        this.pdf.line(boxX, healthBoxY - 2, boxX + 4, healthBoxY + 2);
      } else {
        this.pdf.setDrawColor(0, 0, 0);
        this.pdf.setLineWidth(0.2);
        this.pdf.rect(boxX, healthBoxY - 2, 4, 4);
      }
    }
    this.yPosition += this.options.lineHeight * 2;

    // Rage
    const rageX = this.options.margin + 100;
    const rageBoxY = healthY + this.options.lineHeight * 1.9;
    this.pdf.setFont("helvetica", "bold");
    this.pdf.text("Rage", rageX, healthY);
    
    const rageTotal = this.sheet.rage?.total || 10;
    const rageCurrent = this.sheet.rage?.current || 0;

    for (let i = 0; i < rageTotal; i++) {
      const boxX = rageX + 5 + i * 5;
      if (i < rageCurrent) {
        this.pdf.setFillColor(...this.colors.primary);
        this.pdf.rect(boxX, rageBoxY - 2, 4, 4, "F");
      } else {
        this.pdf.setDrawColor(0, 0, 0);
        this.pdf.setLineWidth(0.2);
        this.pdf.rect(boxX, rageBoxY - 2, 4, 4);
      }
    }
    this.yPosition += this.options.lineHeight * 2;

    this.pdf.setDrawColor(...this.colors.border);
    this.pdf.setLineWidth(0.2);
    this.pdf.rect(this.options.margin - 3, sectionStart - 5, this.contentWidth + 6, this.yPosition - sectionStart + 5);
    this.yPosition += this.options.sectionSpacing * 2;
  }

  generateExperience() {
    const sectionStart = this.yPosition;
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(12);
    this.pdf.setTextColor(...this.colors.primary);
    this.pdf.text("EXPERIENCE", this.options.margin, this.yPosition);
    this.pdf.setTextColor(...this.colors.text);
    this.pdf.setFontSize(10);
    this.yPosition += this.options.lineHeight * 2;

    const expY = this.yPosition;
    const expCurrentY = expY + this.options.lineHeight * 1.5;
    const expTotalY = expCurrentY + this.options.lineHeight;
    this.pdf.setFont("helvetica", "bold");
    this.pdf.text("Experience", this.options.margin + 10, expY);
    this.yPosition += this.options.lineHeight * 1.5;

    this.pdf.setFont("helvetica", "normal");
    if (this.sheet.exp) {
      this.pdf.text(`Current: ${this.sheet.exp.current || 0}`, this.options.margin + 15, expCurrentY);
      this.yPosition += this.options.lineHeight;
      this.pdf.text(`Total: ${this.sheet.exp.total || 0}`, this.options.margin + 15, expTotalY);
    } else {
      this.pdf.text(`Current: ${this.sheet.exp_current || 0}`, this.options.margin + 15, expCurrentY);
      this.yPosition += this.options.lineHeight;
      this.pdf.text(`Total: ${this.sheet.exp_total || 0}`, this.options.margin + 15, expTotalY);
    }
    this.yPosition += this.options.lineHeight;

    this.pdf.setDrawColor(...this.colors.border);
    this.pdf.setLineWidth(0.2);
    this.pdf.rect(this.options.margin - 3, sectionStart - 5, this.contentWidth + 6, this.yPosition - sectionStart + 5);
    this.yPosition += this.options.sectionSpacing * 2;
  }

  generateTerritory() {
    if (this.sheet.territory_name || this.sheet.territory_location || this.sheet.territory_description) {
      const sectionStart = this.yPosition;
      this.pdf.setFont("helvetica", "bold");
      this.pdf.setFontSize(12);
      this.pdf.setTextColor(...this.colors.primary);
      this.pdf.text("TERRITORY", this.options.margin, this.yPosition);
      this.pdf.setTextColor(...this.colors.text);
      this.pdf.setFontSize(10);
      this.yPosition += this.options.lineHeight * 2;

      if (this.sheet.territory_name) {
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text("Name", this.options.margin + 10, this.yPosition);
        this.pdf.setFont("helvetica", "normal");
        this.pdf.text(this.sheet.territory_name, this.options.margin + 50, this.yPosition);
        this.yPosition += this.options.lineHeight * 1.5;
      }

      if (this.sheet.territory_location) {
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text("Location", this.options.margin + 10, this.yPosition);
        this.pdf.setFont("helvetica", "normal");
        this.pdf.text(this.sheet.territory_location, this.options.margin + 50, this.yPosition);
        this.yPosition += this.options.lineHeight * 1.5;
      }

      if (this.sheet.territory_description) {
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text("Description", this.options.margin + 10, this.yPosition);
        this.pdf.setFont("helvetica", "normal");
        this.pdf.text(this.sheet.territory_description || "", this.options.margin + 50, this.yPosition);
        this.yPosition += this.options.lineHeight * 1.5;
      }

      this.pdf.setDrawColor(...this.colors.border);
      this.pdf.setLineWidth(0.2);
      this.pdf.rect(this.options.margin - 3, sectionStart - 5, this.contentWidth + 6, this.yPosition - sectionStart + 5);
    }
  }
} 