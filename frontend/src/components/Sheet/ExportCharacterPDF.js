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
    
    // Columna 1: Habilidades Físicas
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("FÍSICAS:", margin, yPosition);
    yPosition += lineHeight;
    pdf.setFont("helvetica", "normal");
    
    physicalSkills.forEach(skill => {
      pdf.text(`${skill.name}: ${skill.value}`, margin, yPosition);
      yPosition += lineHeight;
    });
    yPosition += lineHeight;
    
    // Columna 2: Habilidades Sociales
    const socialX = margin + columnWidth + columnSpacing;
    pdf.setFont("helvetica", "bold");
    pdf.text("SOCIALES:", socialX, yPosition - (physicalSkills.length + 1) * lineHeight);
    pdf.setFont("helvetica", "normal");
    
    socialSkills.forEach((skill, index) => {
      pdf.text(`${skill.name}: ${skill.value}`, socialX, yPosition - (physicalSkills.length - index) * lineHeight);
    });
    
    // Columna 3: Habilidades Mentales
    const mentalX = margin + 2 * columnWidth + 2 * columnSpacing;
    pdf.setFont("helvetica", "bold");
    pdf.text("MENTALES:", mentalX, yPosition - (physicalSkills.length + 1) * lineHeight);
    pdf.setFont("helvetica", "normal");
    
    mentalSkills.forEach((skill, index) => {
      pdf.text(`${skill.name}: ${skill.value}`, mentalX, yPosition - (physicalSkills.length - index) * lineHeight);
    });
    
    yPosition += lineHeight * 2 + sectionSpacing;

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

    // Merits
    if (sheet.merits && sheet.merits.length > 0) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text("Merits:", margin, yPosition);
      yPosition += lineHeight;
      pdf.setFont("helvetica", "normal");
      
      sheet.merits.forEach(merit => {
        if (merit.name && merit.level) {
          pdf.text(`  ${merit.name}: ${merit.level}`, margin, yPosition);
          yPosition += lineHeight;
        }
      });
      yPosition += lineHeight;
    }

    // Flaws
    if (sheet.flaws && sheet.flaws.length > 0) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text("Flaws:", margin, yPosition);
      yPosition += lineHeight;
      pdf.setFont("helvetica", "normal");
      
      sheet.flaws.forEach(flaw => {
        if (flaw.name && flaw.level) {
          pdf.text(`  ${flaw.name}: ${flaw.level}`, margin, yPosition);
          yPosition += lineHeight;
        }
      });
      yPosition += lineHeight;
    }

    // Backgrounds
    if (sheet.backgrounds && sheet.backgrounds.length > 0) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text("Backgrounds:", margin, yPosition);
      yPosition += lineHeight;
      pdf.setFont("helvetica", "normal");
      
      sheet.backgrounds.forEach(background => {
        if (background.name && background.level) {
          pdf.text(`  ${background.name}: ${background.level}`, margin, yPosition);
          yPosition += lineHeight;
        }
      });
      yPosition += lineHeight;
    }

    yPosition += sectionSpacing;

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
    yPosition += lineHeight * 2;

    // Experiencia
    pdf.text(`Experiencia: ${sheet.exp_current || 0}`, margin, yPosition);
    yPosition += lineHeight;
    pdf.text(`Experiencia Total: ${sheet.exp_total || 0}`, margin, yPosition);
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