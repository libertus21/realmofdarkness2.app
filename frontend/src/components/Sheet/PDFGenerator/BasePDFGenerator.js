import jsPDF from "jspdf";

/**
 * Abstract base class for generating character sheet PDFs
 * This class provides common functionalities that will be used
 * by all specific generators for each sheet type
 */
export default class BasePDFGenerator {
  constructor(sheet, options = {}) {
    this.sheet = sheet;
    this.options = {
      pageSize: "a4",
      orientation: "p",
      margin: 20,
      lineHeight: 6,
      sectionSpacing: 15,
      ...options
    };
    
    this.pdf = new jsPDF(this.options.orientation, "mm", this.options.pageSize);
    this.pageWidth = this.pdf.internal.pageSize.getWidth();
    this.pageHeight = this.pdf.internal.pageSize.getHeight();
    this.contentWidth = this.pageWidth - 2 * this.options.margin;
    this.yPosition = this.options.margin;
    
    // Default colors (can be overridden by subclasses)
    this.colors = {
      primary: [0.2, 0, 0], // Dark red
      text: [0, 0, 0], // Pure black
      border: [0.3, 0, 0], // Red for borders
    };
  }

  /**
   * Main method that must be implemented by each subclass
   */
  generate() {
    throw new Error("The generate() method must be implemented by the subclass");
  }

  /**
   * Draws a simple border
   */
  drawSimpleBorder(x, y, width, height) {
    this.pdf.setDrawColor(...this.colors.border);
    this.pdf.setLineWidth(0.2);
    this.pdf.rect(x, y, width, height);
  }

  /**
   * Draws a box with title
   */
  drawSimpleBox(title, startY, endY) {
    const boxMargin = 3;
    const titleHeight = 8;
    const boxStartY = startY - titleHeight - boxMargin;
    const boxEndY = endY + boxMargin;

    this.pdf.setDrawColor(...this.colors.border);
    this.pdf.setLineWidth(0.2);
    this.pdf.rect(
      this.options.margin - boxMargin,
      boxStartY,
      this.contentWidth + 2 * boxMargin,
      boxEndY - boxStartY
    );

    this.pdf.setFont("helvetica", "bold");
    this.pdf.setTextColor(...this.colors.primary);
    this.pdf.setFontSize(11);
    this.pdf.text(title, this.options.margin, boxStartY + 6);

    this.pdf.setTextColor(...this.colors.text);
    this.pdf.setFont("helvetica", "normal");
    this.pdf.setFontSize(10);

    return boxEndY;
  }

  /**
   * Handles long text with wrapping
   */
  addWrappedText(text, x, y, maxWidth) {
    if (!text) return 0;
    
    const words = text.split(" ");
    let line = "";
    let currentY = y;
    let linesAdded = 0;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const testWidth = this.pdf.getTextWidth(testLine);

      if (testWidth > maxWidth && line !== "") {
        this.pdf.text(line.trim(), x, currentY);
        line = words[i] + " ";
        currentY += this.options.lineHeight;
        linesAdded++;
      } else {
        line = testLine;
      }
    }

    if (line) {
      this.pdf.text(line.trim(), x, currentY);
      linesAdded++;
    }

    return linesAdded * this.options.lineHeight;
  }

  /**
   * Draws simple dots (for attributes, skills, etc.)
   */
  drawSimpleDots(value, x, y, maxDots = 5) {
    const dotRadius = 1;
    const dotSpacing = 4;

    for (let i = 0; i < maxDots; i++) {
      const dotX = x + i * dotSpacing;
      
      if (i < value) {
        this.pdf.setFillColor(...this.colors.primary);
        this.pdf.circle(dotX, y, dotRadius, "F");
      } else {
        this.pdf.setDrawColor(...this.colors.border);
        this.pdf.circle(dotX, y, dotRadius, "S");
      }
    }
  }

  /**
   * Adds a new page
   */
  addNewPage() {
    this.pdf.addPage();
    this.yPosition = this.options.margin;
  }

  /**
   * Saves the PDF with the specified filename
   */
  save(fileName) {
    this.pdf.save(fileName);
  }

  /**
   * Gets the PDF as blob (useful for preview or upload)
   */
  getBlob() {
    return this.pdf.output('blob');
  }

  /**
   * Gets the PDF as base64 (useful for preview)
   */
  getBase64() {
    return this.pdf.output('datauristring');
  }
} 