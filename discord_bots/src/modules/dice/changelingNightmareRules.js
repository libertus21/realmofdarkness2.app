"use strict";
require(`${process.cwd()}/alias`);
const { RealmError, ErrorCodes } = require("@errors");

/**
 * Módulo para manejar las reglas especiales de dados de Pesadilla de Changeling C20
 */
class ChangelingNightmareRules {
  /**
   * Procesa los resultados de dados de pesadilla y aplica las reglas correspondientes
   * @param {Object} interaction - La interacción de Discord
   * @param {Array} nightmareDice - Array de resultados de dados de pesadilla
   * @param {Object} character - El personaje Changeling
   * @returns {Object} - Información sobre los cambios aplicados
   */
  static async processNightmareDice(interaction, nightmareDice, character) {
    const changes = {
      nightmareIncreased: 0,
      willpowerImbalanced: 0,
      bedlamTriggered: false,
      messages: []
    };

    if (!character || character.splat.slug !== 'changeling20th') {
      return changes;
    }

    // Contar dados de pesadilla que sacaron 10
    const nightmareTens = nightmareDice.filter(die => die === 10).length;
    
    if (nightmareTens > 0) {
      // Incrementar pesadilla por cada 10
      const oldNightmare = character.nightmare.secondary;
      character.nightmare.updateSecondary(nightmareTens);
      changes.nightmareIncreased = nightmareTens;
      
      changes.messages.push(`🎭 **Pesadilla aumentada**: ${oldNightmare} → ${character.nightmare.secondary} (+${nightmareTens})`);
      
      // Verificar si la pesadilla alcanza 10 o más
      if (character.nightmare.secondary >= 10) {
        const nightmareReset = character.nightmare.secondary;
        character.nightmare.setSecondary(0);
        
        // Otorgar voluntad desequilibrada
        character.willpower.resetNightmare(nightmareReset);
        changes.willpowerImbalanced = nightmareReset;
        
        changes.messages.push(`💀 **Pesadilla reseteada**: ${nightmareReset} → 0`);
        changes.messages.push(`⚡ **Voluntad Desequilibrada otorgada**: +${nightmareReset} puntos`);
        
        // Verificar si el personaje entra en Bedlam
        if (character.willpower.isBedlam) {
          changes.bedlamTriggered = true;
          changes.messages.push(`🚨 **¡BEDLAM!** El personaje ha perdido toda su voluntad normal y entra en Bedlam.`);
        }
      }
    }

    return changes;
  }

  /**
   * Maneja el gasto de voluntad desequilibrada
   * @param {Object} character - El personaje Changeling
   * @param {number} amount - Cantidad de voluntad a gastar
   * @returns {Object} - Información sobre el gasto
   */
  static spendWillpower(character, amount = 1) {
    if (!character || character.splat.slug !== 'changeling20th') {
      return { success: false, error: "No es un personaje Changeling" };
    }

    const result = character.willpower.spendWillpower(amount);
    
    return {
      success: true,
      normalSpent: result.normal,
      imbalancedSpent: result.imbalanced,
      totalSpent: result.normal + result.imbalanced,
      bedlamTriggered: character.willpower.isBedlam
    };
  }

  /**
   * Obtiene información del estado actual de pesadilla y voluntad
   * @param {Object} character - El personaje Changeling
   * @returns {Object} - Estado actual
   */
  static getNightmareStatus(character) {
    if (!character || character.splat.slug !== 'changeling20th') {
      return null;
    }

    return {
      nightmare: character.nightmare.secondary,
      imbalance: character.nightmare.primary,
      willpower: character.willpower.getWillpowerStatus(),
      bedlamRisk: character.nightmare.secondary >= 8, // Advertencia cuando se acerca a 10
      bedlamImminent: character.nightmare.secondary >= 9 // Muy cerca del Bedlam
    };
  }

  /**
   * Aplica las reglas de dados de pesadilla a un resultado de tirada
   * @param {Object} interaction - La interacción de Discord
   * @param {Object} results - Los resultados de la tirada
   * @returns {Promise<Object>} - Los cambios aplicados
   */
  static async applyNightmareRules(interaction, results) {
    const character = interaction.arguments.character?.tracked;
    
    if (!character || character.splat.slug !== 'changeling20th') {
      return { changes: {}, messages: [] };
    }

    // Solo procesar si hay dados de pesadilla
    if (!results.nightmareDice || results.nightmareDice.length === 0) {
      return { changes: {}, messages: [] };
    }

    const changes = await this.processNightmareDice(interaction, results.nightmareDice, character);
    
    // Guardar los cambios en el personaje
    if (changes.nightmareIncreased > 0 || changes.willpowerImbalanced > 0) {
      await character.save(interaction.client);
    }

    return { changes, messages: changes.messages };
  }

  /**
   * Genera un mensaje de resumen de los efectos de pesadilla
   * @param {Object} changes - Los cambios aplicados
   * @returns {string} - Mensaje de resumen
   */
  static generateNightmareSummary(changes) {
    if (!changes.messages || changes.messages.length === 0) {
      return "";
    }

    return changes.messages.join('\n');
  }

  /**
   * Verifica si un personaje puede gastar voluntad
   * @param {Object} character - El personaje Changeling
   * @param {number} amount - Cantidad a gastar
   * @returns {boolean} - Si puede gastar la cantidad especificada
   */
  static canSpendWillpower(character, amount = 1) {
    if (!character || character.splat.slug !== 'changeling20th') {
      return false;
    }

    const status = character.willpower.getWillpowerStatus();
    return status.available >= amount;
  }

  /**
   * Obtiene una advertencia sobre el estado de pesadilla
   * @param {Object} character - El personaje Changeling
   * @returns {string|null} - Mensaje de advertencia o null
   */
  static getNightmareWarning(character) {
    if (!character || character.splat.slug !== 'changeling20th') {
      return null;
    }

    const nightmare = character.nightmare.secondary;
    
    if (nightmare >= 9) {
      return "🚨 **¡ADVERTENCIA!** La pesadilla está a punto de alcanzar 10. ¡Cuidado con el Bedlam!";
    } else if (nightmare >= 7) {
      return "⚠️ **Advertencia**: La pesadilla se acerca a niveles peligrosos.";
    }
    
    return null;
  }
}

module.exports = ChangelingNightmareRules; 