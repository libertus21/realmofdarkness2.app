# Reglas de Pesadilla para Changeling: The Dreaming 20th Anniversary Edition

## Resumen del Sistema

Este sistema implementa las reglas especiales de dados de Pesadilla para Changeling C20, incluyendo la gestión de Voluntad Desequilibrada y el estado de Bedlam.

## Mecánicas Principales

### 1. Dados de Pesadilla
- **Separación**: Los dados de pesadilla se separan del pool principal y se muestran distintivamente
- **Incremento**: Cada dado de pesadilla que saca 10 aumenta la pesadilla del personaje en 1 punto
- **Límite**: La pesadilla tiene un máximo de 10 puntos

### 2. Voluntad Desequilibrada
- **Activación**: Cuando la pesadilla alcanza 10, se resetea a 0 y otorga "Voluntad Desequilibrada"
- **Cantidad**: Se otorgan tantos puntos de voluntad desequilibrada como pesadilla se reseteó
- **Prioridad**: La voluntad desequilibrada se gasta después de la voluntad normal
- **Visualización**: Se muestra con emojis diferentes en el tracker del personaje

### 3. Bedlam
- **Condición**: Si toda la voluntad se vuelve desequilibrada, el personaje entra en Bedlam
- **Efecto**: El personaje pierde el control y se considera "perdido" para la sesión
- **Recuperación**: Requiere intervención del Storyteller para recuperarse

## Comandos Disponibles

### `/changeling_nightmare`
Comando específico para manejar la pesadilla y el desequilibrio:

#### Acciones Disponibles:
- **Añadir Pesadilla**: Incrementa la pesadilla del personaje
- **Remover Pesadilla**: Reduce la pesadilla del personaje
- **Añadir Desequilibrio**: Incrementa el desequilibrio del personaje
- **Remover Desequilibrio**: Reduce el desequilibrio del personaje
- **Añadir Voluntad Desequilibrada**: Otorga puntos de voluntad desequilibrada
- **Remover Voluntad Desequilibrada**: Remueve puntos de voluntad desequilibrada
- **Ver Estado**: Muestra el estado actual de pesadilla y voluntad

### `/dice roll`
El comando de tirada estándar ahora incluye:
- **Dados de Pesadilla**: Se muestran separadamente con emojis distintivos
- **Efectos Automáticos**: Los efectos de pesadilla se aplican automáticamente
- **Advertencias**: Se muestran advertencias cuando la pesadilla se acerca a niveles peligrosos

## Visualización en el Bot

### Tracker de Personaje
- **Voluntad Normal**: Mostrada con emojis púrpura
- **Voluntad Desequilibrada**: Mostrada con emojis rojos
- **Estado de Bedlam**: Indicado claramente cuando está activo

### Mensajes de Tirada
- **Dados de Pesadilla**: Se muestran con emojis especiales
- **Efectos Aplicados**: Se listan los cambios de pesadilla y voluntad
- **Advertencias**: Se muestran cuando la pesadilla se acerca a 10

## Reglas Técnicas

### Límites del Sistema
- **Pesadilla**: 0-10 puntos
- **Desequilibrio**: 0-10 puntos
- **Voluntad Desequilibrada**: Sin límite técnico, pero activa Bedlam al alcanzar el total de voluntad

### Validaciones
- No se puede gastar más voluntad de la disponible (normal + desequilibrada)
- La pesadilla se resetea automáticamente al alcanzar 10
- El Bedlam se activa automáticamente cuando toda la voluntad se vuelve desequilibrada

## Casos de Uso Comunes

### 1. Tirada con Dados de Pesadilla
```
/dice roll pool:8 difficulty:6 nightmare:3 character:MiPersonaje
```
- 5 dados normales + 3 dados de pesadilla
- Si algún dado de pesadilla saca 10, aumenta la pesadilla
- Se aplican automáticamente las reglas de reset y voluntad desequilibrada

### 2. Ajuste Manual de Pesadilla
```
/changeling_nightmare name:MiPersonaje action:add_nightmare amount:2 reason:Evento traumático
```
- Aumenta la pesadilla en 2 puntos
- Si alcanza 10, se resetea y otorga voluntad desequilibrada

### 3. Verificación de Estado
```
/changeling_nightmare name:MiPersonaje action:status
```
- Muestra el estado actual de pesadilla, desequilibrio y voluntad
- Incluye advertencias sobre niveles peligrosos

## Notas de Implementación

### Compatibilidad
- Solo funciona con personajes Changeling 20th
- Mantiene compatibilidad con el sistema existente
- No afecta otros tipos de personajes

### Persistencia
- Todos los cambios se guardan automáticamente
- La información se serializa correctamente en la base de datos
- Los cambios persisten entre sesiones

### Modularidad
- El sistema está diseñado para ser fácilmente extensible
- Las reglas están separadas en módulos específicos
- Fácil de actualizar si cambian las reglas oficiales

## Referencias de Reglas

Estas implementaciones se basan en las reglas de Changeling: The Dreaming 20th Anniversary Edition:
- **Pesadilla**: Página 274 del manual principal
- **Voluntad Desequilibrada**: Página 275 del manual principal
- **Bedlam**: Página 276 del manual principal

**Nota**: Se recomienda verificar estas reglas contra el manual oficial antes de usar en partidas, ya que pueden haber variaciones o interpretaciones específicas. 