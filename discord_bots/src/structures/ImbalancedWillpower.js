"use strict";
require(`${process.cwd()}/alias`);
const Consumable = require("./Consumable");
const { Emoji } = require("@constants");

module.exports = class ImbalancedWillpower extends Consumable {
  constructor(total, current = total, min = 0) {
    super(total, current, min);
    this.imbalanced = 0; // Cantidad de puntos de voluntad desequilibrados
    this.isBedlam = false; // Si el personaje está en Bedlam
  }

  /**
   * Agrega puntos de voluntad desequilibrados
   * @param {number} amount - Cantidad de puntos a agregar
   */
  addImbalanced(amount) {
    this.imbalanced += amount;
    
    // Si toda la voluntad se vuelve desequilibrada, el personaje entra en Bedlam
    if (this.imbalanced >= this.total) {
      this.isBedlam = true;
      this.imbalanced = this.total;
    }
  }

  /**
   * Gasta un punto de voluntad desequilibrada
   * @returns {boolean} - true si se gastó exitosamente, false si no hay voluntad desequilibrada
   */
  spendImbalanced() {
    if (this.imbalanced > 0) {
      this.imbalanced--;
      return true;
    }
    return false;
  }

  /**
   * Gasta voluntad normal (no desequilibrada)
   * @param {number} amount - Cantidad a gastar
   * @returns {boolean} - true si se gastó exitosamente
   */
  spendNormal(amount = 1) {
    if (this.current >= amount) {
      this.updateCurrent(-amount);
      return true;
    }
    return false;
  }

  /**
   * Gasta voluntad, priorizando la normal sobre la desequilibrada
   * @param {number} amount - Cantidad a gastar
   * @returns {object} - { normal: cantidad gastada de voluntad normal, imbalanced: cantidad gastada de voluntad desequilibrada }
   */
  spendWillpower(amount = 1) {
    let normalSpent = 0;
    let imbalancedSpent = 0;
    let remaining = amount;

    // Primero gasta voluntad normal
    const canSpendNormal = Math.min(this.current, remaining);
    if (canSpendNormal > 0) {
      this.updateCurrent(-canSpendNormal);
      normalSpent = canSpendNormal;
      remaining -= canSpendNormal;
    }

    // Si aún necesita gastar más, usa voluntad desequilibrada
    if (remaining > 0 && this.imbalanced > 0) {
      const canSpendImbalanced = Math.min(this.imbalanced, remaining);
      this.imbalanced -= canSpendImbalanced;
      imbalancedSpent = canSpendImbalanced;
    }

    return { normal: normalSpent, imbalanced: imbalancedSpent };
  }

  /**
   * Obtiene el tracker de voluntad mostrando tanto la normal como la desequilibrada
   * @param {Object} options - Opciones para el tracker
   * @returns {string} - String del tracker
   */
  getWillpowerTracker({
    showEmoji = true,
    normalEmoji = Emoji.purple_dot_3,
    imbalancedEmoji = Emoji.red_dot,
  } = {}) {
    if (this.total > 15 || !showEmoji) {
      let tracker = `\`\`\`q\n[${this.current}/${this.total}]`;
      if (this.imbalanced > 0) {
        tracker += ` (${this.imbalanced} desequilibrada)`;
      }
      if (this.isBedlam) {
        tracker += ` [BEDLAM]`;
      }
      tracker += `\n\`\`\``;
      return tracker;
    }

    let tracker = "";
    const totalSlots = Math.max(this.total, this.current, this.imbalanced);

    for (let i = 0; i < totalSlots; i++) {
      if (i < this.current) {
        tracker += normalEmoji; // Voluntad normal
      } else if (i < this.current + this.imbalanced) {
        tracker += imbalancedEmoji; // Voluntad desequilibrada
      } else {
        tracker += Emoji.blank_dot; // Slots vacíos
      }
    }

    if (this.isBedlam) {
      tracker += " [BEDLAM]";
    }

    tracker += "⠀";
    return tracker;
  }

  /**
   * Convierte voluntad normal a desequilibrada
   * @param {number} amount - Cantidad a convertir
   * @returns {boolean} - true si se convirtió exitosamente
   */
  convertToImbalanced(amount = 1) {
    if (this.current >= amount) {
      this.updateCurrent(-amount);
      this.addImbalanced(amount);
      return true;
    }
    return false;
  }

  /**
   * Resetea la pesadilla y otorga voluntad desequilibrada
   * @param {number} nightmareAmount - Cantidad de pesadilla que se resetea
   */
  resetNightmare(nightmareAmount) {
    this.addImbalanced(nightmareAmount);
  }

  /**
   * Obtiene información del estado de la voluntad
   * @returns {object} - Estado actual de la voluntad
   */
  getWillpowerStatus() {
    return {
      total: this.total,
      current: this.current,
      imbalanced: this.imbalanced,
      isBedlam: this.isBedlam,
      available: this.current + this.imbalanced
    };
  }
}; 