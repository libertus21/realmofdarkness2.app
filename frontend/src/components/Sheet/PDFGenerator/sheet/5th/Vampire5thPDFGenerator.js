import BasePDFGenerator from "../../BasePDFGenerator";

/**
 * Professional and aesthetic PDF generator for Vampire 5th Edition
 * Features modern design with elegant typography and visual hierarchy
 */
export default class Vampire5thPDFGenerator extends BasePDFGenerator {
  constructor(sheet, options = {}) {
    super(sheet, {
      fonts: {
        title: { size: 28, weight: "bold" },
        subtitle: { size: 16, weight: "bold" },
        sectionHeader: { size: 14, weight: "bold" },
        fieldLabel: { size: 10, weight: "bold" },
        fieldValue: { size: 10, weight: "normal" },
        body: { size: 9, weight: "normal" },
      },
      spacing: {
        titleMargin: 25,
        sectionGap: 20,
        fieldGap: 12,
        columnGap: 15,
      },
      ...options,
    });

    // Override colors after super() call to ensure proper initialization
    this.colors = {
      primary: [0.15, 0, 0], // Deep crimson for vampire
      secondary: [0.4, 0.1, 0.1], // Darker red accent
      accent: [0.6, 0.2, 0.2], // Medium red for highlights
      text: [0.1, 0.1, 0.1], // Soft black for better readability
      lightText: [0.4, 0.4, 0.4], // Gray for secondary text
      border: [0.2, 0, 0], // Rich red borders
      background: [0.95, 0.95, 0.95], // Very light gray background
    };
  }

  generate() {
    this.generateHeader();
    this.generateCharacterInfo();
    this.generateAttributes();
    this.generateSkills();
    this.addNewPage();
    this.generateDisciplines();
    this.generateAdvantages();
    this.generateBeliefs();
    this.addNewPage();
    this.generateNotes();
    this.generateHealthWillpower();
    this.generateExperience();
    this.generateHaven();

    const fileName = `${this.sheet.name || "character"}_V5.pdf`;
    this.save(fileName);
  }

  generateHeader() {
    // Elegant header with decorative elements
    const centerX = this.pageWidth / 2;

    // Main title with larger, more dramatic font
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(28);
    this.pdf.setTextColor(...this.colors.primary);
    this.pdf.text("VAMPIRE", centerX, this.yPosition + 20, { align: "center" });

    // Decorative double lines with gothic feel
    this.pdf.setDrawColor(...this.colors.primary);
    this.pdf.setLineWidth(1.5);
    this.pdf.line(
      centerX - 60,
      this.yPosition + 25,
      centerX + 60,
      this.yPosition + 25
    );
    this.pdf.setLineWidth(0.5);
    this.pdf.line(
      centerX - 65,
      this.yPosition + 27,
      centerX + 65,
      this.yPosition + 27
    );

    // Subtitle with elegant spacing
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(16);
    this.pdf.setTextColor(...this.colors.secondary);
    this.pdf.text("THE MASQUERADE", centerX, this.yPosition + 38, {
      align: "center",
    });

    // Edition with style
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setFontSize(10);
    this.pdf.setTextColor(...this.colors.lightText);
    this.pdf.text("5TH EDITION", centerX, this.yPosition + 48, {
      align: "center",
    });

    // Ornamental corner elements
    this.pdf.setDrawColor(...this.colors.accent);
    this.pdf.setLineWidth(0.8);
    // Top left corner
    this.pdf.line(
      this.options.margin,
      this.yPosition + 5,
      this.options.margin + 15,
      this.yPosition + 5
    );
    this.pdf.line(
      this.options.margin,
      this.yPosition + 5,
      this.options.margin,
      this.yPosition + 15
    );
    // Top right corner
    this.pdf.line(
      this.pageWidth - this.options.margin,
      this.yPosition + 5,
      this.pageWidth - this.options.margin - 15,
      this.yPosition + 5
    );
    this.pdf.line(
      this.pageWidth - this.options.margin,
      this.yPosition + 5,
      this.pageWidth - this.options.margin,
      this.yPosition + 15
    );

    this.yPosition += 70;
  }

  // Elegant section design with decorative borders
  drawStyledSection(title, startY, endY, accentColor = null) {
    const sectionColor = accentColor || this.colors.primary;

    // Main section border with rounded corners effect
    this.pdf.setDrawColor(...sectionColor);
    this.pdf.setLineWidth(1);
    this.pdf.rect(
      this.options.margin - 5,
      startY - 15,
      this.contentWidth + 10,
      endY - startY + 20
    );

    // Inner decorative border
    this.pdf.setLineWidth(0.3);
    this.pdf.rect(
      this.options.margin - 3,
      startY - 13,
      this.contentWidth + 6,
      endY - startY + 16
    );

    // Title with elegant underline
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(14);
    this.pdf.setTextColor(...sectionColor);
    this.pdf.text(title, this.options.margin, startY - 5);

    // Decorative underline for title
    this.pdf.setLineWidth(0.8);
    const titleWidth = this.pdf.getTextWidth(title);
    this.pdf.line(
      this.options.margin,
      startY - 2,
      this.options.margin + titleWidth + 10,
      startY - 2
    );

    // Small decorative elements at corners
    this.pdf.setLineWidth(0.5);
    // Top corners
    this.pdf.line(
      this.options.margin - 5,
      startY - 10,
      this.options.margin + 5,
      startY - 10
    );
    this.pdf.line(
      this.options.margin + this.contentWidth + 5,
      startY - 10,
      this.options.margin + this.contentWidth - 5,
      startY - 10
    );

    // Reset text color
    this.pdf.setTextColor(...this.colors.text);
  }

  drawStyledField(label, value, x, y, width = 85) {
    // Elegant field with double border effect
    this.pdf.setDrawColor(...this.colors.border);
    this.pdf.setLineWidth(0.8);
    this.pdf.rect(x, y - 3, width, 12);

    // Inner shadow effect with lighter border
    this.pdf.setDrawColor(...this.colors.lightText);
    this.pdf.setLineWidth(0.2);
    this.pdf.rect(x + 1, y - 2, width - 2, 10);

    // Label with better typography
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(8);
    this.pdf.setTextColor(...this.colors.primary);
    this.pdf.text(label + ":", x + 3, y + 1);

    // Value with elegant spacing
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setFontSize(10);
    this.pdf.setTextColor(...this.colors.text);
    this.pdf.text(String(value || ""), x + 3, y + 6);
  }

  drawStyledDots(value, x, y, maxDots = 5, size = 2) {
    const spacing = 8;
    for (let i = 0; i < maxDots; i++) {
      const dotX = x + i * spacing;

      if (i < value) {
        // Filled dot with enhanced style
        this.pdf.setFont("helvetica", "normal");
        this.pdf.setFontSize(10);
        this.pdf.setTextColor(...this.colors.primary);
        this.pdf.text("●", dotX, y + 1);
      } else {
        // Empty dot with elegant outline
        this.pdf.setFont("helvetica", "normal");
        this.pdf.setFontSize(10);
        this.pdf.setTextColor(...this.colors.lightText);
        this.pdf.text("○", dotX, y + 1);
      }
    }

    // Add decorative bracket around dots
    if (maxDots > 0) {
      this.pdf.setDrawColor(...this.colors.lightText);
      this.pdf.setLineWidth(0.3);
      const startX = x - 2;
      const endX = x + (maxDots - 1) * spacing + 4;
      this.pdf.line(startX, y - 2, startX, y + 4);
      this.pdf.line(endX, y - 2, endX, y + 4);
      this.pdf.line(startX, y - 2, startX + 2, y - 2);
      this.pdf.line(startX, y + 4, startX + 2, y + 4);
      this.pdf.line(endX, y - 2, endX - 2, y - 2);
      this.pdf.line(endX, y + 4, endX - 2, y + 4);
    }
  }

  generateCharacterInfo() {
    const sectionStart = this.yPosition;

    // Character name with dramatic presentation
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(18);
    this.pdf.setTextColor(...this.colors.primary);
    const characterName = this.sheet.name || "Unnamed Character";
    this.pdf.text(characterName, this.options.margin, this.yPosition);

    // Decorative line under character name
    this.pdf.setDrawColor(...this.colors.accent);
    this.pdf.setLineWidth(0.5);
    const nameWidth = this.pdf.getTextWidth(characterName);
    this.pdf.line(
      this.options.margin,
      this.yPosition + 3,
      this.options.margin + nameWidth,
      this.yPosition + 3
    );

    this.yPosition += 20;

    // Enhanced two-column layout with better spacing
    const col1X = this.options.margin;
    const col2X = this.options.margin + this.contentWidth / 2 + 5;
    const fieldSpacing = 15;

    let currentY = this.yPosition;

    // Left column with enhanced fields
    this.drawStyledField(
      "Chronicle",
      this.sheet.chronicle,
      col1X,
      currentY,
      90
    );
    currentY += fieldSpacing;
    this.drawStyledField("Clan", this.sheet.clan, col1X, currentY, 90);
    currentY += fieldSpacing;
    this.drawStyledField(
      "Blood Potency",
      this.sheet.blood_potency,
      col1X,
      currentY,
      90
    );
    currentY += fieldSpacing;

    // Right column (reset Y)
    currentY = this.yPosition;
    this.drawStyledField(
      "Predator Type",
      this.sheet.predator_type,
      col2X,
      currentY,
      90
    );
    currentY += fieldSpacing;
    this.drawStyledField(
      "Generation",
      this.sheet.generation,
      col2X,
      currentY,
      90
    );
    currentY += fieldSpacing;
    this.drawStyledField("Humanity", this.sheet.humanity, col2X, currentY, 90);
    currentY += fieldSpacing;

    this.yPosition = currentY + 15;
    this.drawStyledSection(
      "CHARACTER INFORMATION",
      sectionStart,
      this.yPosition,
      this.colors.secondary
    );
    this.yPosition += 25;
  }

  generateAttributes() {
    const sectionStart = this.yPosition;

    // Enhanced three-column layout for attributes
    const col1X = this.options.margin + 5;
    const col2X = this.options.margin + this.contentWidth / 3 + 5;
    const col3X = this.options.margin + (2 * this.contentWidth) / 3 + 5;

    // Physical attributes with enhanced styling
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(12);
    this.pdf.setTextColor(...this.colors.primary);
    this.pdf.text("Physical", col1X, this.yPosition);

    // Decorative underline for category
    this.pdf.setDrawColor(...this.colors.primary);
    this.pdf.setLineWidth(0.5);
    this.pdf.line(col1X, this.yPosition + 2, col1X + 40, this.yPosition + 2);

    this.pdf.setFont("helvetica", "normal");
    this.pdf.setFontSize(9);
    this.pdf.setTextColor(...this.colors.text);

    let attrY = this.yPosition + 12;
    const attributes = [
      { name: "Strength", value: this.sheet.attributes?.strength || 0 },
      { name: "Dexterity", value: this.sheet.attributes?.dexterity || 0 },
      { name: "Stamina", value: this.sheet.attributes?.stamina || 0 },
    ];

    attributes.forEach((attr) => {
      this.pdf.text(attr.name, col1X, attrY);
      this.drawStyledDots(attr.value, col1X + 45, attrY - 2, 5);
      attrY += 12;
    });

    // Social attributes
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(12);
    this.pdf.setTextColor(...this.colors.primary);
    this.pdf.text("Social", col2X, this.yPosition);

    this.pdf.setDrawColor(...this.colors.primary);
    this.pdf.setLineWidth(0.5);
    this.pdf.line(col2X, this.yPosition + 2, col2X + 30, this.yPosition + 2);

    this.pdf.setFont("helvetica", "normal");
    this.pdf.setFontSize(9);
    this.pdf.setTextColor(...this.colors.text);

    attrY = this.yPosition + 12;
    const socialAttributes = [
      { name: "Charisma", value: this.sheet.attributes?.charisma || 0 },
      { name: "Manipulation", value: this.sheet.attributes?.manipulation || 0 },
      { name: "Composure", value: this.sheet.attributes?.composure || 0 },
    ];

    socialAttributes.forEach((attr) => {
      this.pdf.text(attr.name, col2X, attrY);
      this.drawStyledDots(attr.value, col2X + 45, attrY - 2, 5);
      attrY += 12;
    });

    // Mental attributes
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(12);
    this.pdf.setTextColor(...this.colors.primary);
    this.pdf.text("Mental", col3X, this.yPosition);

    this.pdf.setDrawColor(...this.colors.primary);
    this.pdf.setLineWidth(0.5);
    this.pdf.line(col3X, this.yPosition + 2, col3X + 35, this.yPosition + 2);

    this.pdf.setFont("helvetica", "normal");
    this.pdf.setFontSize(9);
    this.pdf.setTextColor(...this.colors.text);

    attrY = this.yPosition + 12;
    const mentalAttributes = [
      { name: "Intelligence", value: this.sheet.attributes?.intelligence || 0 },
      { name: "Wits", value: this.sheet.attributes?.wits || 0 },
      { name: "Resolve", value: this.sheet.attributes?.resolve || 0 },
    ];

    mentalAttributes.forEach((attr) => {
      this.pdf.text(attr.name, col3X, attrY);
      this.drawStyledDots(attr.value, col3X + 45, attrY - 2, 5);
      attrY += 12;
    });

    this.yPosition += 50;
    this.drawStyledSection(
      "ATTRIBUTES",
      sectionStart,
      this.yPosition,
      this.colors.accent
    );
    this.yPosition += 25;
  }

  generateSkills() {
    const sectionStart = this.yPosition;

    // Enhanced three-column layout for skills
    const col1X = this.options.margin + 5;
    const col2X = this.options.margin + this.contentWidth / 3 + 5;
    const col3X = this.options.margin + (2 * this.contentWidth) / 3 + 5;

    // Physical skills with enhanced styling
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(12);
    this.pdf.setTextColor(...this.colors.primary);
    this.pdf.text("Physical", col1X, this.yPosition);

    this.pdf.setDrawColor(...this.colors.primary);
    this.pdf.setLineWidth(0.5);
    this.pdf.line(col1X, this.yPosition + 2, col1X + 40, this.yPosition + 2);

    this.pdf.setFont("helvetica", "normal");
    this.pdf.setFontSize(8);
    this.pdf.setTextColor(...this.colors.text);

    let skillY = this.yPosition + 12;
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
      this.pdf.text(skill.name, col1X, skillY);
      this.drawStyledDots(skill.value, col1X + 40, skillY - 2, 5);
      skillY += 10;
    });

    // Social skills
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(12);
    this.pdf.setTextColor(...this.colors.primary);
    this.pdf.text("Social", col2X, this.yPosition);

    this.pdf.setDrawColor(...this.colors.primary);
    this.pdf.setLineWidth(0.5);
    this.pdf.line(col2X, this.yPosition + 2, col2X + 30, this.yPosition + 2);

    this.pdf.setFont("helvetica", "normal");
    this.pdf.setFontSize(8);
    this.pdf.setTextColor(...this.colors.text);

    skillY = this.yPosition + 12;
    const socialSkills = [
      { name: "Animal Ken", value: this.sheet.skills?.animal_ken?.value || 0 },
      { name: "Etiquette", value: this.sheet.skills?.etiquette?.value || 0 },
      { name: "Insight", value: this.sheet.skills?.insight?.value || 0 },
      {
        name: "Intimidation",
        value: this.sheet.skills?.intimidation?.value || 0,
      },
      { name: "Leadership", value: this.sheet.skills?.leadership?.value || 0 },
      {
        name: "Performance",
        value: this.sheet.skills?.performance?.value || 0,
      },
      { name: "Persuasion", value: this.sheet.skills?.persuasion?.value || 0 },
      { name: "Streetwise", value: this.sheet.skills?.streetwise?.value || 0 },
      { name: "Subterfuge", value: this.sheet.skills?.subterfuge?.value || 0 },
    ];

    socialSkills.forEach((skill) => {
      this.pdf.text(skill.name, col2X, skillY);
      this.drawStyledDots(skill.value, col2X + 40, skillY - 2, 5);
      skillY += 10;
    });

    // Mental skills
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(12);
    this.pdf.setTextColor(...this.colors.primary);
    this.pdf.text("Mental", col3X, this.yPosition);

    this.pdf.setDrawColor(...this.colors.primary);
    this.pdf.setLineWidth(0.5);
    this.pdf.line(col3X, this.yPosition + 2, col3X + 35, this.yPosition + 2);

    this.pdf.setFont("helvetica", "normal");
    this.pdf.setFontSize(8);
    this.pdf.setTextColor(...this.colors.text);

    skillY = this.yPosition + 12;
    const mentalSkills = [
      { name: "Academics", value: this.sheet.skills?.academics?.value || 0 },
      { name: "Awareness", value: this.sheet.skills?.awareness?.value || 0 },
      { name: "Finance", value: this.sheet.skills?.finance?.value || 0 },
      {
        name: "Investigation",
        value: this.sheet.skills?.investigation?.value || 0,
      },
      { name: "Medicine", value: this.sheet.skills?.medicine?.value || 0 },
      { name: "Occult", value: this.sheet.skills?.occult?.value || 0 },
      { name: "Politics", value: this.sheet.skills?.politics?.value || 0 },
      { name: "Science", value: this.sheet.skills?.science?.value || 0 },
      { name: "Technology", value: this.sheet.skills?.technology?.value || 0 },
    ];

    mentalSkills.forEach((skill) => {
      this.pdf.text(skill.name, col3X, skillY);
      this.drawStyledDots(skill.value, col3X + 40, skillY - 2, 5);
      skillY += 10;
    });

    this.yPosition += 95;
    this.drawStyledSection(
      "SKILLS",
      sectionStart,
      this.yPosition,
      this.colors.secondary
    );
    this.yPosition += 25;
  }

  generateDisciplines() {
    const sectionStart = this.yPosition;

    // Enhanced disciplines layout
    const hasDisplayedDisciplines =
      this.sheet.disciplines && Object.keys(this.sheet.disciplines).length > 0;

    if (hasDisplayedDisciplines) {
      // Create elegant two-column layout for disciplines
      const col1X = this.options.margin + 5;
      const col2X = this.options.margin + this.contentWidth / 2 + 10;
      let currentCol = 1;
      let col1Y = this.yPosition;
      let col2Y = this.yPosition;

      Object.entries(this.sheet.disciplines).forEach(
        ([discipline, disciplineData]) => {
          const level =
            typeof disciplineData === "object"
              ? disciplineData.value || 0
              : disciplineData || 0;

          if (level > 0) {
            // Capitalize discipline name for better presentation
            const disciplineName =
              discipline.charAt(0).toUpperCase() + discipline.slice(1);

            const x = currentCol === 1 ? col1X : col2X;
            const y = currentCol === 1 ? col1Y : col2Y;

            this.pdf.setFont("helvetica", "bold");
            this.pdf.setFontSize(10);
            this.pdf.setTextColor(...this.colors.primary);
            this.pdf.text(disciplineName, x, y);

            this.drawStyledDots(level, x + 60, y - 2, 5);

            // Add subtle separator line
            this.pdf.setDrawColor(...this.colors.lightText);
            this.pdf.setLineWidth(0.2);
            this.pdf.line(x, y + 2, x + 120, y + 2);

            if (currentCol === 1) {
              col1Y += 14;
              currentCol = 2;
            } else {
              col2Y += 14;
              currentCol = 1;
            }
          }
        }
      );

      this.yPosition = Math.max(col1Y, col2Y) + 5;
    } else {
      this.pdf.setFont("helvetica", "italic");
      this.pdf.setFontSize(10);
      this.pdf.setTextColor(...this.colors.lightText);
      this.pdf.text(
        "No disciplines acquired",
        this.options.margin + 5,
        this.yPosition
      );
      this.yPosition += 15;
    }

    this.drawStyledSection(
      "DISCIPLINES",
      sectionStart,
      this.yPosition,
      this.colors.primary
    );
    this.yPosition += 25;
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
          this.drawSimpleDots(
            item.rating || item.level || 0,
            this.options.margin + 70,
            currentY - 1.5
          );
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
    advantagesY = addAdvantageSection(
      "Backgrounds",
      this.sheet.backgrounds,
      advantagesY
    );

    this.drawSimpleBox(
      "ADVANTAGES",
      sectionStart - this.options.lineHeight,
      advantagesY
    );
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

      if (this.sheet.touchstones) {
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text("Touchstones", this.options.margin + 10, this.yPosition);
        this.yPosition += this.options.lineHeight * 1.5;

        if (Array.isArray(this.sheet.touchstones)) {
          this.sheet.touchstones.forEach((touchstone, index) => {
            if (touchstone && touchstone.trim()) {
              this.pdf.setFont("helvetica", "normal");
              const heightUsed = this.addWrappedText(
                `${index + 1}. ${touchstone}`,
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
            this.sheet.touchstones,
            this.options.margin + 15,
            this.yPosition,
            this.contentWidth - 30
          );
          this.yPosition += heightUsed + this.options.lineHeight;
        }
      }

      if (this.sheet.convictions) {
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text("Convictions", this.options.margin + 10, this.yPosition);
        this.yPosition += this.options.lineHeight * 1.5;

        if (Array.isArray(this.sheet.convictions)) {
          this.sheet.convictions.forEach((conviction, index) => {
            if (conviction && conviction.trim()) {
              this.pdf.setFont("helvetica", "normal");
              const heightUsed = this.addWrappedText(
                `${index + 1}. ${conviction}`,
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
            this.sheet.convictions,
            this.options.margin + 15,
            this.yPosition,
            this.contentWidth - 30
          );
          this.yPosition += heightUsed + this.options.lineHeight;
        }
      }

      this.drawSimpleBox(
        "BELIEFS & CONVICTIONS",
        sectionStart - this.options.lineHeight,
        this.yPosition
      );
      this.yPosition += this.options.sectionSpacing * 2;
    }
  }

  generateNotes() {
    if (
      this.sheet.notes ||
      this.sheet.notes2 ||
      this.sheet.history ||
      this.sheet.appearance_description
    ) {
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
        this.pdf.text(
          "Additional Notes",
          this.options.margin + 10,
          this.yPosition
        );
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

      this.drawSimpleBox(
        "NOTES & DESCRIPTIONS",
        sectionStart - this.options.lineHeight,
        this.yPosition
      );
      this.yPosition += this.options.sectionSpacing * 2;
    }
  }

  generateHealthWillpower() {
    const sectionStart = this.yPosition;

    // Enhanced health and willpower display with visual tracks
    const col1X = this.options.margin + 5;
    const col2X = this.options.margin + this.contentWidth / 2 + 10;

    // Health section
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(12);
    this.pdf.setTextColor(...this.colors.primary);
    this.pdf.text("Health", col1X, this.yPosition);

    // Decorative underline
    this.pdf.setDrawColor(...this.colors.primary);
    this.pdf.setLineWidth(0.5);
    this.pdf.line(col1X, this.yPosition + 2, col1X + 35, this.yPosition + 2);

    const healthTotal = this.sheet.health?.total || 10;
    const healthSuperficial = this.sheet.health?.superficial || 0;
    const healthAggravated = this.sheet.health?.aggravated || 0;

    // Health track visualization with boxes
    let healthY = this.yPosition + 8;
    this.drawHealthTrack(
      col1X,
      healthY,
      healthTotal,
      healthSuperficial,
      healthAggravated,
      this.colors.primary
    );

    // Health stats
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setFontSize(8);
    this.pdf.setTextColor(...this.colors.text);
    this.pdf.text(`Total: ${healthTotal}`, col1X, healthY + 25);
    this.pdf.text(`Superficial: ${healthSuperficial}`, col1X, healthY + 32);
    this.pdf.text(`Aggravated: ${healthAggravated}`, col1X, healthY + 39);

    // Willpower section
    this.pdf.setFont("helvetica", "bold");
    this.pdf.setFontSize(12);
    this.pdf.setTextColor(...this.colors.primary);
    this.pdf.text("Willpower", col2X, this.yPosition);

    this.pdf.setDrawColor(...this.colors.primary);
    this.pdf.setLineWidth(0.5);
    this.pdf.line(col2X, this.yPosition + 2, col2X + 45, this.yPosition + 2);

    const willTotal = this.sheet.willpower?.total || 10;
    const willSuperficial = this.sheet.willpower?.superficial || 0;
    const willAggravated = this.sheet.willpower?.aggravated || 0;

    // Willpower track visualization
    this.drawHealthTrack(
      col2X,
      healthY,
      willTotal,
      willSuperficial,
      willAggravated,
      this.colors.secondary
    );

    // Willpower stats
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setFontSize(8);
    this.pdf.setTextColor(...this.colors.text);
    this.pdf.text(`Total: ${willTotal}`, col2X, healthY + 25);
    this.pdf.text(`Superficial: ${willSuperficial}`, col2X, healthY + 32);
    this.pdf.text(`Aggravated: ${willAggravated}`, col2X, healthY + 39);

    this.yPosition += 55;
    this.drawStyledSection(
      "HEALTH & WILLPOWER",
      sectionStart,
      this.yPosition,
      this.colors.accent
    );
    this.yPosition += 25;
  }

  drawHealthTrack(x, y, total, superficial, aggravated, color) {
    const boxSize = 6;
    const boxSpacing = 8;
    const maxBoxesPerRow = 10;

    for (let i = 0; i < total; i++) {
      const row = Math.floor(i / maxBoxesPerRow);
      const col = i % maxBoxesPerRow;
      const boxX = x + col * boxSpacing;
      const boxY = y + row * boxSpacing;

      // Draw box border
      this.pdf.setDrawColor(...color);
      this.pdf.setLineWidth(0.5);
      this.pdf.rect(boxX, boxY, boxSize, boxSize);

      // Fill based on damage type
      if (i < aggravated) {
        // Aggravated damage - X mark
        this.pdf.setFont("helvetica", "bold");
        this.pdf.setFontSize(6);
        this.pdf.setTextColor(...color);
        this.pdf.text("X", boxX + boxSize / 2, boxY + boxSize / 2 + 1, {
          align: "center",
        });
      } else if (i < aggravated + superficial) {
        // Superficial damage - diagonal line
        this.pdf.setLineWidth(0.8);
        this.pdf.line(boxX, boxY, boxX + boxSize, boxY + boxSize);
      }
    }
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
      this.pdf.text(
        `Current: ${this.sheet.exp.current || 0}`,
        this.options.margin + 15,
        expCurrentY
      );
      this.yPosition += this.options.lineHeight;
      this.pdf.text(
        `Total: ${this.sheet.exp.total || 0}`,
        this.options.margin + 15,
        expTotalY
      );
    } else {
      this.pdf.text(
        `Current: ${this.sheet.exp_current || 0}`,
        this.options.margin + 15,
        expCurrentY
      );
      this.yPosition += this.options.lineHeight;
      this.pdf.text(
        `Total: ${this.sheet.exp_total || 0}`,
        this.options.margin + 15,
        expTotalY
      );
    }
    this.yPosition += this.options.lineHeight;

    this.pdf.setDrawColor(...this.colors.border);
    this.pdf.setLineWidth(0.2);
    this.pdf.rect(
      this.options.margin - 3,
      sectionStart - 5,
      this.contentWidth + 6,
      this.yPosition - sectionStart + 5
    );
    this.yPosition += this.options.sectionSpacing * 2;
  }

  generateHaven() {
    if (
      this.sheet.haven_name ||
      this.sheet.haven_location ||
      this.sheet.haven_description
    ) {
      const sectionStart = this.yPosition;
      this.pdf.setFont("helvetica", "bold");
      this.pdf.setFontSize(12);
      this.pdf.setTextColor(...this.colors.primary);
      this.pdf.text("HAVEN", this.options.margin, this.yPosition);
      this.pdf.setTextColor(...this.colors.text);
      this.pdf.setFontSize(10);
      this.yPosition += this.options.lineHeight * 2;

      if (this.sheet.haven_name) {
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text("Name", this.options.margin + 10, this.yPosition);
        this.pdf.setFont("helvetica", "normal");
        this.pdf.text(
          this.sheet.haven_name,
          this.options.margin + 50,
          this.yPosition
        );
        this.yPosition += this.options.lineHeight * 1.5;
      }

      if (this.sheet.haven_location) {
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text("Location", this.options.margin + 10, this.yPosition);
        this.pdf.setFont("helvetica", "normal");
        this.pdf.text(
          this.sheet.haven_location,
          this.options.margin + 50,
          this.yPosition
        );
        this.yPosition += this.options.lineHeight * 1.5;
      }

      if (this.sheet.haven_description) {
        this.pdf.setFont("helvetica", "bold");
        this.pdf.text("Description", this.options.margin + 10, this.yPosition);
        this.pdf.setFont("helvetica", "normal");
        this.pdf.text(
          this.sheet.haven_description || "",
          this.options.margin + 50,
          this.yPosition
        );
        this.yPosition += this.options.lineHeight * 1.5;
      }

      this.pdf.setDrawColor(...this.colors.border);
      this.pdf.setLineWidth(0.2);
      this.pdf.rect(
        this.options.margin - 3,
        sectionStart - 5,
        this.contentWidth + 6,
        this.yPosition - sectionStart + 5
      );
    }
  }
}
