import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Tooltip, IconButton } from "@mui/material";
import jsPDF from "jspdf";

export default function ExportCharacterPDF(props) {
  const { sheet } = props;

  function generateV5PDF() {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    
    let yPosition = margin;
    const lineHeight = 7;
    const sectionSpacing = 10;

    // Configurar fuente
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    
    // Título principal
    pdf.text("Vampire: The Masquerade 5th Edition", pageWidth / 2, yPosition, { align: "center" });
    yPosition += lineHeight * 2;

    // Información general del personaje
    pdf.setFontSize(14);
    pdf.text("INFORMACIÓN GENERAL", margin, yPosition);
    yPosition += lineHeight;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    // Nombre y clan
    pdf.text(`Nombre: ${sheet.name || "Sin nombre"}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Clan: ${sheet.clan || "Sin clan"}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Generación: ${sheet.generation || "Sin especificar"}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Sire: ${sheet.sire || "Sin sire"}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Tipo de Depredador: ${sheet.predator_type || "Sin especificar"}`, margin, yPosition);
    yPosition += lineHeight * 2;

    // Ambición y Deseo
    pdf.text(`Ambición: ${sheet.ambition || "Sin ambición"}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Deseo: ${sheet.desire || "Sin deseo"}`, margin, yPosition);
    yPosition += lineHeight * 2;

    // Creencias y Touchstones
    if (sheet.tenets || sheet.touchstones || sheet.convictions) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("CREENCIAS Y PRINCIPIOS", margin, yPosition);
      yPosition += lineHeight;
      
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      
      if (sheet.tenets) {
        pdf.text(`Tenets: ${sheet.tenets}`, margin, yPosition);
        yPosition += lineHeight;
      }
      if (sheet.touchstones) {
        pdf.text(`Touchstones: ${sheet.touchstones}`, margin, yPosition);
        yPosition += lineHeight;
      }
      if (sheet.convictions) {
        pdf.text(`Convictions: ${sheet.convictions}`, margin, yPosition);
        yPosition += lineHeight;
      }
      yPosition += lineHeight;
    }

    // Atributos
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("ATRIBUTOS", margin, yPosition);
    yPosition += lineHeight;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    const attributes = [
      { name: "Fuerza", value: sheet.attributes?.strength || 0 },
      { name: "Destreza", value: sheet.attributes?.dexterity || 0 },
      { name: "Vigor", value: sheet.attributes?.stamina || 0 },
      { name: "Carisma", value: sheet.attributes?.charisma || 0 },
      { name: "Manipulación", value: sheet.attributes?.manipulation || 0 },
      { name: "Composición", value: sheet.attributes?.composure || 0 },
      { name: "Inteligencia", value: sheet.attributes?.intelligence || 0 },
      { name: "Percepción", value: sheet.attributes?.wits || 0 },
      { name: "Resolución", value: sheet.attributes?.resolve || 0 }
    ];

    const attributesPerColumn = 3;
    for (let i = 0; i < attributes.length; i += attributesPerColumn) {
      const columnX = margin + (i / attributesPerColumn) * (contentWidth / 3);
      for (let j = 0; j < attributesPerColumn && i + j < attributes.length; j++) {
        const attr = attributes[i + j];
        pdf.text(`${attr.name}: ${attr.value}`, columnX, yPosition + j * lineHeight);
      }
    }
    yPosition += lineHeight * 3 + sectionSpacing;

    // Habilidades
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("HABILIDADES", margin, yPosition);
    yPosition += lineHeight;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    const skills = [
      { name: "Atletismo", value: sheet.skills?.athletics?.value || 0 },
      { name: "Brawl", value: sheet.skills?.brawl?.value || 0 },
      { name: "Craft", value: sheet.skills?.craft?.value || 0 },
      { name: "Conducir", value: sheet.skills?.drive?.value || 0 },
      { name: "Armas de Fuego", value: sheet.skills?.firearms?.value || 0 },
      { name: "Larceny", value: sheet.skills?.larceny?.value || 0 },
      { name: "Melee", value: sheet.skills?.melee?.value || 0 },
      { name: "Sigilo", value: sheet.skills?.stealth?.value || 0 },
      { name: "Supervivencia", value: sheet.skills?.survival?.value || 0 },
      { name: "Animal Ken", value: sheet.skills?.animal_ken?.value || 0 },
      { name: "Etiqueta", value: sheet.skills?.etiquette?.value || 0 },
      { name: "Insight", value: sheet.skills?.insight?.value || 0 },
      { name: "Intimidation", value: sheet.skills?.intimidation?.value || 0 },
      { name: "Leadership", value: sheet.skills?.leadership?.value || 0 },
      { name: "Performance", value: sheet.skills?.performance?.value || 0 },
      { name: "Persuasion", value: sheet.skills?.persuasion?.value || 0 },
      { name: "Streetwise", value: sheet.skills?.streetwise?.value || 0 },
      { name: "Subterfuge", value: sheet.skills?.subterfuge?.value || 0 },
      { name: "Academics", value: sheet.skills?.academics?.value || 0 },
      { name: "Awareness", value: sheet.skills?.awareness?.value || 0 },
      { name: "Finance", value: sheet.skills?.finance?.value || 0 },
      { name: "Investigation", value: sheet.skills?.investigation?.value || 0 },
      { name: "Medicine", value: sheet.skills?.medicine?.value || 0 },
      { name: "Occult", value: sheet.skills?.occult?.value || 0 },
      { name: "Politics", value: sheet.skills?.politics?.value || 0 },
      { name: "Science", value: sheet.skills?.science?.value || 0 },
      { name: "Technology", value: sheet.skills?.technology?.value || 0 }
    ];

    // Organizar habilidades en 3 columnas: Físicas, Sociales, Mentales
    const physicalSkills = skills.slice(0, 9); // Primeras 9 habilidades físicas
    const socialSkills = skills.slice(9, 18);   // Siguientes 9 habilidades sociales
    const mentalSkills = skills.slice(18);      // Últimas 9 habilidades mentales
    
    const columnWidth = contentWidth / 3;
    const columnSpacing = 10;
    
    // Calcular la altura máxima de las columnas para alineación
    const maxSkillsPerColumn = Math.max(physicalSkills.length, socialSkills.length, mentalSkills.length);
    const skillsSectionHeight = maxSkillsPerColumn * lineHeight;
    
    // Columna 1: Habilidades Físicas
    const physicalX = margin;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("FÍSICAS:", physicalX, yPosition);
    yPosition += lineHeight;
    pdf.setFont("helvetica", "normal");
    
    physicalSkills.forEach((skill, index) => {
      pdf.text(`${skill.name}: ${skill.value}`, physicalX, yPosition + index * lineHeight);
    });
    
    // Columna 2: Habilidades Sociales
    const socialX = margin + columnWidth + columnSpacing;
    pdf.setFont("helvetica", "bold");
    pdf.text("SOCIALES:", socialX, yPosition - lineHeight);
    pdf.setFont("helvetica", "normal");
    
    socialSkills.forEach((skill, index) => {
      pdf.text(`${skill.name}: ${skill.value}`, socialX, yPosition + index * lineHeight);
    });
    
    // Columna 3: Habilidades Mentales
    const mentalX = margin + 2 * columnWidth + 2 * columnSpacing;
    pdf.setFont("helvetica", "bold");
    pdf.text("MENTALES:", mentalX, yPosition - lineHeight);
    pdf.setFont("helvetica", "normal");
    
    mentalSkills.forEach((skill, index) => {
      pdf.text(`${skill.name}: ${skill.value}`, mentalX, yPosition + index * lineHeight);
    });
    
    yPosition += skillsSectionHeight + sectionSpacing;

    // Disciplinas
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("DISCIPLINAS", margin, yPosition);
    yPosition += lineHeight;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    if (sheet.disciplines) {
      Object.entries(sheet.disciplines).forEach(([discipline, level]) => {
        if (level > 0) {
          pdf.text(`${discipline}: ${level}`, margin, yPosition);
          yPosition += lineHeight;
        }
      });
    }
    yPosition += sectionSpacing;

    // Ventajas
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("VENTAJAS", margin, yPosition);
    yPosition += lineHeight;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    // Función mejorada para manejar texto largo
    function addWrappedText(text, x, y, maxWidth) {
      const words = text.split(' ');
      let line = '';
      let currentY = y;
      let linesAdded = 0;
      
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const testWidth = pdf.getTextWidth(testLine);
        
        if (testWidth > maxWidth && line !== '') {
          pdf.text(line.trim(), x, currentY);
          line = words[i] + ' ';
          currentY += lineHeight;
          linesAdded++;
        } else {
          line = testLine;
        }
      }
      
      if (line) {
        pdf.text(line.trim(), x, currentY);
        linesAdded++;
      }
      
      return linesAdded * lineHeight;
    }

    // Función para agregar sección de ventajas de manera simétrica
    function addAdvantageSection(title, items, startY) {
      if (!items || items.length === 0) return startY;
      
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text(`${title}:`, margin, startY);
      let currentY = startY + lineHeight;
      pdf.setFont("helvetica", "normal");
      
      items.forEach(item => {
        if (item.name) {
          const rating = item.rating || item.level || 0;
          pdf.text(`  ${item.name}: ${rating}`, margin, currentY);
          currentY += lineHeight;
          
          if (item.description) {
            const descriptionText = `    Descripción: ${item.description}`;
            const heightUsed = addWrappedText(descriptionText, margin, currentY, contentWidth);
            currentY += heightUsed;
          }
          
          if (item.notes) {
            const notesText = `    Notas: ${item.notes}`;
            const heightUsed = addWrappedText(notesText, margin, currentY, contentWidth);
            currentY += heightUsed;
          }
        }
      });
      
      return currentY;
    }

    // Agregar secciones de ventajas de manera simétrica
    let advantagesY = yPosition;
    
    // Merits
    advantagesY = addAdvantageSection("Merits", sheet.merits, advantagesY);
    
    // Flaws
    advantagesY = addAdvantageSection("Flaws", sheet.flaws, advantagesY);
    
    // Backgrounds
    advantagesY = addAdvantageSection("Backgrounds", sheet.backgrounds, advantagesY);
    
    yPosition = advantagesY + sectionSpacing;

    // Salud y Voluntad
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("SALUD Y VOLUNTAD", margin, yPosition);
    yPosition += lineHeight;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    pdf.text(`Salud Total: ${sheet.health?.total || 0}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Salud Superficial: ${sheet.health?.superficial || 0}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Salud Agravada: ${sheet.health?.aggravated || 0}`, margin, yPosition);
    yPosition += lineHeight * 2;

    pdf.text(`Voluntad Total: ${sheet.willpower?.total || 0}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Voluntad Superficial: ${sheet.willpower?.superficial || 0}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Voluntad Agravada: ${sheet.willpower?.aggravated || 0}`, margin, yPosition);
    yPosition += lineHeight * 2;

    // Sangre y Potencia
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text("SANGRE Y POTENCIA", margin, yPosition);
    yPosition += lineHeight;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);

    pdf.text(`Potencia de Sangre: ${sheet.blood_potency || 0}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Hambre: ${sheet.hunger || 0}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Humanidad: ${sheet.humanity || 0}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Manchas: ${sheet.stains || 0}`, margin, yPosition);
    yPosition += lineHeight;
    if (sheet.resonance) {
      pdf.text(`Resonancia: ${sheet.resonance}`, margin, yPosition);
      yPosition += lineHeight;
    }
    if (sheet.hunting_roll) {
      pdf.text(`Tirada de Caza: ${sheet.hunting_roll}`, margin, yPosition);
      yPosition += lineHeight;
    }
    yPosition += lineHeight;

    // Experiencia
    if (sheet.exp) {
      pdf.text(`Experiencia Actual: ${sheet.exp.current || 0}`, margin, yPosition);
      yPosition += lineHeight;
      pdf.text(`Experiencia Total: ${sheet.exp.total || 0}`, margin, yPosition);
    } else {
      pdf.text(`Experiencia: ${sheet.exp_current || 0}`, margin, yPosition);
      yPosition += lineHeight;
      pdf.text(`Experiencia Total: ${sheet.exp_total || 0}`, margin, yPosition);
    }
    yPosition += lineHeight;

    // Haven
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = margin;
    }

    if (sheet.haven_name || sheet.haven_location || sheet.haven_description) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("HAVEN", margin, yPosition);
      yPosition += lineHeight;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);

      if (sheet.haven_name) {
        pdf.text(`Nombre: ${sheet.haven_name}`, margin, yPosition);
        yPosition += lineHeight;
      }
      if (sheet.haven_location) {
        pdf.text(`Ubicación: ${sheet.haven_location}`, margin, yPosition);
        yPosition += lineHeight;
      }
      if (sheet.haven_description) {
        pdf.text(`Descripción: ${sheet.haven_description}`, margin, yPosition);
        yPosition += lineHeight;
      }
      yPosition += sectionSpacing;
    }

    // Información adicional
    if (yPosition > pageHeight - 80) {
      pdf.addPage();
      yPosition = margin;
    }

    if (sheet.date_of_birth || sheet.age || sheet.apparent_age || sheet.date_of_death) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("INFORMACIÓN ADICIONAL", margin, yPosition);
      yPosition += lineHeight;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);

      if (sheet.date_of_birth) {
        pdf.text(`Fecha de Nacimiento: ${sheet.date_of_birth}`, margin, yPosition);
        yPosition += lineHeight;
      }
      if (sheet.age) {
        pdf.text(`Edad: ${sheet.age}`, margin, yPosition);
        yPosition += lineHeight;
      }
      if (sheet.apparent_age) {
        pdf.text(`Edad Aparente: ${sheet.apparent_age}`, margin, yPosition);
        yPosition += lineHeight;
      }
      if (sheet.date_of_death) {
        pdf.text(`Fecha de Muerte: ${sheet.date_of_death}`, margin, yPosition);
        yPosition += lineHeight;
      }
      yPosition += sectionSpacing;
    }

    // Notas
    if (sheet.notes || sheet.notes2 || sheet.history || sheet.appearance_description) {
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("NOTAS Y DESCRIPCIONES", margin, yPosition);
      yPosition += lineHeight;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);

      if (sheet.history) {
        const historyText = `Historia: ${sheet.history}`;
        const heightUsed = addWrappedText(historyText, margin, yPosition, contentWidth);
        yPosition += heightUsed;
      }
      if (sheet.appearance_description) {
        const appearanceText = `Descripción Física: ${sheet.appearance_description}`;
        const heightUsed = addWrappedText(appearanceText, margin, yPosition, contentWidth);
        yPosition += heightUsed;
      }
      if (sheet.notes) {
        const notesText = `Notas: ${sheet.notes}`;
        const heightUsed = addWrappedText(notesText, margin, yPosition, contentWidth);
        yPosition += heightUsed;
      }
      if (sheet.notes2) {
        const notes2Text = `Notas Adicionales: ${sheet.notes2}`;
        const heightUsed = addWrappedText(notes2Text, margin, yPosition, contentWidth);
        yPosition += heightUsed;
      }
      yPosition += sectionSpacing;
    }

    // Crónica
    if (sheet.chronicle) {
      pdf.text(`Crónica: ${sheet.chronicle}`, margin, yPosition);
    }

    // Guardar el PDF
    const fileName = `${sheet.name || "personaje"}_V5.pdf`;
    pdf.save(fileName);
  }

  return (
    <Tooltip title="Exportar como PDF">
      <IconButton onClick={generateV5PDF}>
        <PictureAsPdfIcon fontSize="large" color="secondary" />
      </IconButton>
    </Tooltip>
  );
} 