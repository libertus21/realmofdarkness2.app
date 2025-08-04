import jsPDF from "jspdf";

/**
 * Clase base abstracta para generar PDFs de fichas de personajes
 * Esta clase proporciona funcionalidades comunes que serán utilizadas
 * por todos los generadores específicos de cada tipo de ficha
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
    
    // Colores por defecto (pueden ser sobrescritos por subclases)
    this.colors = {
      primary: [0.2, 0, 0], // Rojo oscuro
      text: [0, 0, 0], // Negro puro
      border: [0.3, 0, 0], // Rojo para bordes
    };
  }

  /**
   * Método principal que debe ser implementado por cada subclase
   */
  generate() {
    throw new Error("El método generate() debe ser implementado por la subclase");
  }

  /**
   * Dibuja un borde simple
   */
  drawSimpleBorder(x, y, width, height) {
    this.pdf.setDrawColor(...this.colors.border);
    this.pdf.setLineWidth(0.2);
    this.pdf.rect(x, y, width, height);
  }

  /**
   * Dibuja una caja con título
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
   * Maneja texto largo con wrap
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
   * Dibuja puntos simples (para atributos, habilidades, etc.)
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
   * Agrega una nueva página
   */
  addNewPage() {
    this.pdf.addPage();
    this.yPosition = this.options.margin;
  }

  /**
   * Guarda el PDF con el nombre especificado
   */
  save(fileName) {
    this.pdf.save(fileName);
  }

  /**
   * Obtiene el PDF como blob (útil para preview o upload)
   */
  getBlob() {
    return this.pdf.output('blob');
  }

  /**
   * Obtiene el PDF como base64 (útil para preview)
   */
  getBase64() {
    return this.pdf.output('datauristring');
  }
} 