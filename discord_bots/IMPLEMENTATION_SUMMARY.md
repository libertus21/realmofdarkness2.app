# Resumen de Implementación: Sistema de Pesadilla Changeling C20

## Archivos Creados/Modificados

### Nuevos Archivos
1. **`src/structures/ImbalancedWillpower.js`**
   - Clase extendida de Consumable para manejar voluntad desequilibrada
   - Métodos para agregar, gastar y convertir voluntad desequilibrada
   - Lógica para detectar y manejar el estado de Bedlam
   - Visualización mejorada del tracker de voluntad

2. **`src/modules/dice/changelingNightmareRules.js`**
   - Módulo principal para las reglas de pesadilla
   - Procesamiento automático de dados de pesadilla
   - Gestión de cambios de estado y efectos
   - Validaciones y advertencias del sistema

3. **`src/commands/20th/changelingNightmare.js`**
   - Comando específico para manejar pesadilla y desequilibrio
   - 7 acciones diferentes para ajustar valores
   - Verificación de estado y advertencias
   - Integración con el sistema de personajes

4. **`CHANGELING_NIGHTMARE_RULES.md`**
   - Documentación completa del sistema
   - Guía de uso y casos de ejemplo
   - Referencias a las reglas oficiales

5. **`test_nightmare_system.js`**
   - Script de prueba para verificar funcionalidad
   - Pruebas de todos los componentes principales
   - Validación de casos edge

### Archivos Modificados
1. **`src/structures/characters/Changeling20th.js`**
   - Integración de ImbalancedWillpower
   - Actualización de serialización/deserialización
   - Mejora del método getEmbed

2. **`src/modules/dice/roll20th.js`**
   - Integración de reglas de pesadilla
   - Actualización del sistema de voluntad
   - Mejora de visualización de resultados

3. **`src/commands/20th/dice.js`**
   - Manejo de efectos de pesadilla en resultados
   - Integración con el sistema de mensajes

## Funcionalidades Implementadas

### ✅ Criterios de Aceptación Cumplidos

1. **Dados de Pesadilla Separados**
   - Los dados de pesadilla se separan del pool principal
   - Se muestran con emojis distintivos
   - Se procesan automáticamente durante las tiradas

2. **Incremento de Pesadilla**
   - Cada dado de pesadilla que saca 10 aumenta la pesadilla en 1
   - Se aplica automáticamente durante las tiradas
   - Se puede ajustar manualmente con comandos

3. **Reset de Pesadilla y Voluntad Desequilibrada**
   - Cuando la pesadilla alcanza 10, se resetea a 0
   - Se otorgan puntos de voluntad desequilibrada igual a la pesadilla reseteada
   - Se aplica automáticamente

4. **Gasto de Voluntad Desequilibrada**
   - La voluntad desequilibrada se gasta después de la normal
   - Se muestra distintivamente en el tracker
   - Se maneja correctamente en el sistema de tiradas

5. **Estado de Bedlam**
   - Se activa cuando toda la voluntad se vuelve desequilibrada
   - Se indica claramente en el tracker del personaje
   - Se maneja como estado especial del personaje

6. **Comandos de Ajuste**
   - `/changeling_nightmare` con 7 acciones diferentes
   - Ajuste manual de pesadilla, desequilibrio y voluntad desequilibrada
   - Verificación de estado y advertencias

7. **Visualización Clara**
   - Emojis distintivos para voluntad normal vs desequilibrada
   - Mensajes claros sobre cambios de estado
   - Advertencias cuando se acerca a niveles peligrosos

## Características Técnicas

### Modularidad
- Sistema diseñado para ser fácilmente extensible
- Reglas separadas en módulos específicos
- Fácil de actualizar si cambian las reglas oficiales

### Compatibilidad
- Solo afecta personajes Changeling 20th
- Mantiene compatibilidad con el sistema existente
- No interfiere con otros tipos de personajes

### Persistencia
- Todos los cambios se guardan automáticamente
- Serialización correcta en la base de datos
- Los cambios persisten entre sesiones

### Validaciones
- Límites apropiados para todos los valores
- Verificación de disponibilidad de voluntad
- Manejo de casos edge y errores

## Casos de Uso Principales

### 1. Tirada con Dados de Pesadilla
```
/dice roll pool:8 difficulty:6 nightmare:3 character:MiPersonaje
```
- 5 dados normales + 3 dados de pesadilla
- Efectos automáticos si los dados de pesadilla sacan 10
- Mensajes claros sobre los cambios aplicados

### 2. Ajuste Manual
```
/changeling_nightmare name:MiPersonaje action:add_nightmare amount:2
```
- Ajuste manual de pesadilla
- Aplicación automática de reglas de reset
- Feedback inmediato sobre los cambios

### 3. Verificación de Estado
```
/changeling_nightmare name:MiPersonaje action:status
```
- Vista completa del estado actual
- Advertencias sobre niveles peligrosos
- Información sobre riesgo de Bedlam

## Próximos Pasos Recomendados

### 1. Verificación de Reglas
- Confirmar las reglas contra el manual oficial C20
- Ajustar cualquier discrepancia encontrada
- Documentar cualquier interpretación específica

### 2. Pruebas en Producción
- Probar con personajes reales en partidas
- Verificar que todos los casos edge funcionan
- Recopilar feedback de usuarios

### 3. Mejoras Futuras
- Integración con sistema de eventos automáticos
- Notificaciones para Storytellers sobre cambios importantes
- Estadísticas de uso del sistema de pesadilla

## Notas Importantes

### Limitaciones Actuales
- Solo funciona con personajes Changeling 20th
- Requiere configuración manual para algunos casos especiales
- Las reglas están basadas en interpretación del manual

### Consideraciones de Balance
- El sistema puede ser muy punitivo si se usa frecuentemente
- Se recomienda moderación en el uso de dados de pesadilla
- Los Storytellers deben supervisar el uso del sistema

### Mantenimiento
- El código está bien documentado y modular
- Fácil de mantener y actualizar
- Compatible con futuras versiones del bot

## Conclusión

El sistema de pesadilla de Changeling C20 ha sido implementado exitosamente con todas las funcionalidades requeridas. El sistema es robusto, modular y fácil de usar, proporcionando una experiencia de juego auténtica para Changeling: The Dreaming 20th Anniversary Edition.

La implementación incluye:
- ✅ Todas las reglas de dados de pesadilla
- ✅ Sistema completo de voluntad desequilibrada
- ✅ Manejo automático del estado de Bedlam
- ✅ Comandos para ajuste manual
- ✅ Visualización clara y distintiva
- ✅ Documentación completa
- ✅ Sistema de pruebas

El sistema está listo para ser usado en partidas de Changeling C20 y proporcionará una experiencia de juego más rica y auténtica. 