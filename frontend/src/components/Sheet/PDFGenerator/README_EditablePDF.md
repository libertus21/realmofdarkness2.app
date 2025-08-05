# Generador de PDFs Editables

Este nuevo sistema permite generar PDFs de personajes editando plantillas PDF existentes en lugar de generarlas desde cero. Esto es mucho más simple, rápido y mantiene el diseño profesional original.

## Ventajas del nuevo enfoque

- ✅ **Diseño profesional**: Mantiene el diseño original de la ficha
- ✅ **Más rápido**: No necesita generar todo desde cero
- ✅ **Menos código**: Mucho más simple de mantener
- ✅ **Más estético**: Resultado visual superior
- ✅ **Fácil personalización**: Solo necesitas editar los campos

## Cómo usar

### 1. Generador básico

```javascript
import PDFGeneratorFactory from './PDFGenerator/PDFGeneratorFactory';

// Crear un generador editable
const generator = PDFGeneratorFactory.createGenerator('v5_editable', characterData);

// Generar el PDF
await generator.generate();
```

### 2. Con opciones adicionales

```javascript
const generator = PDFGeneratorFactory.createGenerator('v5_editable', characterData, {
  debug: true, // Muestra campos disponibles en consola
  templatePath: '/custom/template.pdf' // Ruta personalizada
});

await generator.generate();
```

### 3. Vista previa

```javascript
const generator = PDFGeneratorFactory.createGenerator('v5_editable', characterData);

// Cargar plantilla
await generator.loadTemplate();

// Obtener vista previa
const base64 = await generator.getBase64();
// Usar base64 para mostrar en iframe o nueva ventana
```

## Tipos de generadores disponibles

| Tipo | Descripción | Clase |
|------|-------------|-------|
| `v5` | Vampire 5th (generado desde cero) | `Vampire5thPDFGenerator` |
| `v5_editable` | Vampire 5th (editable - **recomendado**) | `Vampire5thEditablePDFGenerator` |
| `w5` | Werewolf 5th | `Werewolf5thPDFGenerator` |

## Estructura de archivos

```
PDFGenerator/
├── EditablePDFGenerator.js          # Clase base para PDFs editables
├── PDFGeneratorFactory.js           # Factory para crear generadores
├── PDFFieldMapper.js               # Utilidad para mapear campos
├── BasePDFGenerator.js             # Clase base original (jsPDF)
├── sheet/
│   └── 5th/
│       ├── Vampire5thPDFGenerator.js           # Generador original
│       ├── Vampire5thEditablePDFGenerator.js   # Nuevo generador editable
│       └── Werewolf5thPDFGenerator.js
└── README_EditablePDF.md           # Este archivo
```

## Mapeo de campos

El sistema usa un mapeo de campos para conectar los datos del personaje con los campos del PDF. Los campos más comunes son:

### Información básica
- `character_name` - Nombre del personaje
- `player_name` - Nombre del jugador
- `clan` - Clan del vampiro
- `generation` - Generación

### Atributos
- `strength_1` a `strength_5` - Fuerza (dots)
- `dexterity_1` a `dexterity_5` - Destreza (dots)
- `stamina_1` a `stamina_5` - Resistencia (dots)
- etc.

### Habilidades
- `athletics_1` a `athletics_5` - Atletismo (dots)
- `brawl_1` a `brawl_5` - Pelea (dots)
- etc.

## Debug y desarrollo

Para ver qué campos están disponibles en tu PDF:

```javascript
const generator = PDFGeneratorFactory.createGenerator('v5_editable', characterData, {
  debug: true
});

await generator.generate();
// Revisa la consola para ver todos los campos disponibles
```

## Agregar nuevos tipos de ficha

1. **Crear la plantilla PDF editable** con los campos necesarios
2. **Crear el generador** extendiendo `EditablePDFGenerator`:

```javascript
import EditablePDFGenerator from "../../EditablePDFGenerator";

export default class NewSheetEditablePDFGenerator extends EditablePDFGenerator {
  constructor(sheet, options = {}) {
    super(sheet, {
      templatePath: "/static/pdfFicha/NewSheetTemplate.pdf",
      ...options,
    });
  }

  async generate() {
    await this.loadTemplate();
    
    // Llenar campos específicos
    this.fillTextField("field_name", this.sheet.value);
    this.fillDotField("attribute_name", this.sheet.attributeValue);
    
    await this.save("character_sheet.pdf");
  }
}
```

3. **Agregar al factory**:

```javascript
// En PDFGeneratorFactory.js
case "new_sheet":
  return new NewSheetEditablePDFGenerator(sheet, options);
```

## Dependencias

- `pdf-lib`: Para editar PDFs existentes
- `jspdf`: Para generación desde cero (legacy)

## Notas importantes

1. **Plantillas PDF**: Las plantillas deben estar en `public/static/pdfFicha/`
2. **Campos**: Los nombres de los campos deben coincidir exactamente con los del PDF
3. **Debug**: Usa el modo debug para identificar campos faltantes
4. **Compatibilidad**: El sistema es compatible con el generador original

## Migración desde el sistema anterior

El nuevo sistema es completamente compatible. Solo cambia el tipo de generador:

```javascript
// Antes
const generator = PDFGeneratorFactory.createGenerator('v5', characterData);

// Ahora (recomendado)
const generator = PDFGeneratorFactory.createGenerator('v5_editable', characterData);
```

¡El nuevo sistema es mucho más simple y produce resultados superiores! 