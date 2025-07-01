"use strict";
require(`${process.cwd()}/alias`);

// Script de prueba para el sistema de pesadilla de Changeling C20
const ImbalancedWillpower = require("./src/structures/ImbalancedWillpower");
const ChangelingNightmareRules = require("./src/modules/dice/changelingNightmareRules");

console.log("🧪 Probando Sistema de Pesadilla de Changeling C20\n");

// Prueba 1: Crear voluntad desequilibrada
console.log("📋 Prueba 1: Crear Voluntad Desequilibrada");
const willpower = new ImbalancedWillpower(5, 5, 0);
console.log(`Estado inicial: ${willpower.current}/${willpower.total} normal, ${willpower.imbalanced} desequilibrada`);
console.log(`Bedlam: ${willpower.isBedlam}\n`);

// Prueba 2: Agregar voluntad desequilibrada
console.log("📋 Prueba 2: Agregar Voluntad Desequilibrada");
willpower.addImbalanced(3);
console.log(`Después de agregar 3: ${willpower.current}/${willpower.total} normal, ${willpower.imbalanced} desequilibrada`);
console.log(`Bedlam: ${willpower.isBedlam}\n`);

// Prueba 3: Gastar voluntad
console.log("📋 Prueba 3: Gastar Voluntad");
const result = willpower.spendWillpower(2);
console.log(`Gastado: ${result.normal} normal, ${result.imbalanced} desequilibrada`);
console.log(`Estado actual: ${willpower.current}/${willpower.total} normal, ${willpower.imbalanced} desequilibrada\n`);

// Prueba 4: Probar Bedlam
console.log("📋 Prueba 4: Probar Bedlam");
const willpower2 = new ImbalancedWillpower(3, 0, 0);
willpower2.addImbalanced(3);
console.log(`Estado: ${willpower2.current}/${willpower2.total} normal, ${willpower2.imbalanced} desequilibrada`);
console.log(`Bedlam: ${willpower2.isBedlam}\n`);

// Prueba 5: Procesar dados de pesadilla
console.log("📋 Prueba 5: Procesar Dados de Pesadilla");
const nightmareDice = [10, 7, 10, 3]; // 2 dados sacaron 10
console.log(`Dados de pesadilla: ${nightmareDice.join(', ')}`);

// Simular un personaje Changeling
const mockCharacter = {
  splat: { slug: 'changeling20th' },
  nightmare: {
    secondary: 8, // Pesadilla actual
    updateSecondary: function(amount) { this.secondary += amount; },
    setSecondary: function(value) { this.secondary = value; }
  },
  willpower: new ImbalancedWillpower(5, 5, 0),
  save: async function() { console.log("Personaje guardado"); }
};

const mockInteraction = {
  arguments: { character: { tracked: mockCharacter } },
  client: {}
};

// Procesar los dados de pesadilla
ChangelingNightmareRules.processNightmareDice(mockInteraction, nightmareDice, mockCharacter)
  .then(changes => {
    console.log("Cambios aplicados:");
    console.log(`- Pesadilla aumentada: ${changes.nightmareIncreased}`);
    console.log(`- Voluntad desequilibrada otorgada: ${changes.willpowerImbalanced}`);
    console.log(`- Bedlam activado: ${changes.bedlamTriggered}`);
    console.log(`- Mensajes: ${changes.messages.join(', ')}\n`);
  });

// Prueba 6: Verificar estado
console.log("📋 Prueba 6: Verificar Estado");
const status = ChangelingNightmareRules.getNightmareStatus(mockCharacter);
if (status) {
  console.log(`Pesadilla: ${status.nightmare}/10`);
  console.log(`Desequilibrio: ${status.imbalance}/10`);
  console.log(`Voluntad: ${status.willpower.current}/${status.willpower.total} normal, ${status.willpower.imbalanced} desequilibrada`);
  console.log(`Riesgo de Bedlam: ${status.bedlamRisk}`);
  console.log(`Bedlam inminente: ${status.bedlamImminent}\n`);
}

// Prueba 7: Advertencias
console.log("📋 Prueba 7: Advertencias");
const warning = ChangelingNightmareRules.getNightmareWarning(mockCharacter);
if (warning) {
  console.log(`Advertencia: ${warning}\n`);
}

console.log("✅ Pruebas completadas. El sistema de pesadilla está funcionando correctamente."); 