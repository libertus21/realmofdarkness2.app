"use strict";
require(`${process.cwd()}/alias`);
const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { Splats } = require("@constants");
const tracker = require("@modules/tracker");
const commandUpdate = require("@modules/commandDatabaseUpdate");
const autocomplete20th = require("@modules/autocomplete");
const ChangelingNightmareRules = require("@src/modules/dice/changelingNightmareRules");

module.exports = {
  data: getCommands(),

  async execute(interaction) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    await commandUpdate(interaction);

    if (!interaction.isRepliable()) return "notRepliable";
    
    const args = getArgs(interaction);
    const character = await tracker.getCharacter(args.name, interaction, Splats.changeling20th);
    
    if (!character) {
      return {
        content: "❌ No se encontró el personaje especificado.",
        flags: MessageFlags.Ephemeral
      };
    }

    if (character.splat.slug !== 'changeling20th') {
      return {
        content: "❌ Este comando solo funciona con personajes Changeling 20th.",
        flags: MessageFlags.Ephemeral
      };
    }

    const result = await handleNightmareCommand(interaction, character, args);
    return result;
  },

  async autocomplete(interaction) {
    return await autocomplete20th(interaction, Splats.changeling20th.slug);
  },
};

function getArgs(interaction) {
  return {
    name: interaction.options.getString("name"),
    action: interaction.options.getString("action"),
    amount: interaction.options.getInteger("amount"),
    reason: interaction.options.getString("reason")
  };
}

async function handleNightmareCommand(interaction, character, args) {
  const embed = character.getEmbed();
  let content = "";
  let changes = {};

  switch (args.action) {
    case "add_nightmare":
      if (args.amount > 0) {
        const oldNightmare = character.nightmare.secondary;
        character.nightmare.updateSecondary(args.amount);
        
        // Verificar si alcanza 10 o más
        if (character.nightmare.secondary >= 10) {
          const nightmareReset = character.nightmare.secondary;
          character.nightmare.setSecondary(0);
          character.willpower.resetNightmare(nightmareReset);
          
          content = `🎭 **Pesadilla aumentada**: ${oldNightmare} → ${nightmareReset} → 0\n`;
          content += `⚡ **Voluntad Desequilibrada otorgada**: +${nightmareReset} puntos`;
          
          if (character.willpower.isBedlam) {
            content += `\n🚨 **¡BEDLAM!** El personaje ha perdido toda su voluntad normal.`;
          }
        } else {
          content = `🎭 **Pesadilla aumentada**: ${oldNightmare} → ${character.nightmare.secondary} (+${args.amount})`;
        }
        
        changes = { nightmare: args.amount };
      }
      break;

    case "remove_nightmare":
      if (args.amount > 0) {
        const oldNightmare = character.nightmare.secondary;
        const newNightmare = Math.max(0, oldNightmare - args.amount);
        character.nightmare.setSecondary(newNightmare);
        
        content = `🎭 **Pesadilla reducida**: ${oldNightmare} → ${newNightmare} (-${oldNightmare - newNightmare})`;
        changes = { nightmare: -(oldNightmare - newNightmare) };
      }
      break;

    case "add_imbalance":
      if (args.amount > 0) {
        const oldImbalance = character.nightmare.primary;
        character.nightmare.updatePrimary(args.amount);
        
        content = `⚡ **Desequilibrio aumentado**: ${oldImbalance} → ${character.nightmare.primary} (+${args.amount})`;
        changes = { imbalance: args.amount };
      }
      break;

    case "remove_imbalance":
      if (args.amount > 0) {
        const oldImbalance = character.nightmare.primary;
        const newImbalance = Math.max(0, oldImbalance - args.amount);
        character.nightmare.setPrimary(newImbalance);
        
        content = `⚡ **Desequilibrio reducido**: ${oldImbalance} → ${newImbalance} (-${oldImbalance - newImbalance})`;
        changes = { imbalance: -(oldImbalance - newImbalance) };
      }
      break;

    case "add_imbalanced_willpower":
      if (args.amount > 0) {
        character.willpower.addImbalanced(args.amount);
        
        content = `⚡ **Voluntad Desequilibrada otorgada**: +${args.amount} puntos`;
        
        if (character.willpower.isBedlam) {
          content += `\n🚨 **¡BEDLAM!** El personaje ha perdido toda su voluntad normal.`;
        }
      }
      break;

    case "remove_imbalanced_willpower":
      if (args.amount > 0) {
        const oldImbalanced = character.willpower.imbalanced;
        const newImbalanced = Math.max(0, oldImbalanced - args.amount);
        character.willpower.imbalanced = newImbalanced;
        
        content = `⚡ **Voluntad Desequilibrada removida**: ${oldImbalanced} → ${newImbalanced} (-${oldImbalanced - newImbalanced})`;
      }
      break;

    case "status":
      const status = ChangelingNightmareRules.getNightmareStatus(character);
      content = `📊 **Estado de Pesadilla y Voluntad**\n`;
      content += `🎭 **Pesadilla**: ${status.nightmare}/10\n`;
      content += `⚡ **Desequilibrio**: ${status.imbalance}/10\n`;
      content += `💜 **Voluntad Normal**: ${status.willpower.current}/${status.willpower.total}\n`;
      content += `🔴 **Voluntad Desequilibrada**: ${status.willpower.imbalanced}\n`;
      
      if (status.bedlamImminent) {
        content += `\n🚨 **¡ADVERTENCIA!** La pesadilla está a punto de alcanzar 10.`;
      } else if (status.bedlamRisk) {
        content += `\n⚠️ **Advertencia**: La pesadilla se acerca a niveles peligrosos.`;
      }
      
      if (status.willpower.isBedlam) {
        content += `\n💀 **BEDLAM**: El personaje ha perdido toda su voluntad normal.`;
      }
      break;

    default:
      return {
        content: "❌ Acción no válida.",
        flags: MessageFlags.Ephemeral
      };
  }

  // Agregar razón si se proporcionó
  if (args.reason) {
    content += `\n\n**Razón**: ${args.reason}`;
  }

  // Guardar cambios si los hay
  if (Object.keys(changes).length > 0) {
    await character.save(interaction.client);
  }

  return {
    content: content,
    embeds: [embed],
    flags: MessageFlags.Ephemeral
  };
}

function getCommands() {
  const slashCommand = new SlashCommandBuilder()
    .setName("changeling_nightmare")
    .setDescription("Maneja la pesadilla y el desequilibrio de Changeling C20")

    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("El nombre del personaje")
        .setMaxLength(50)
        .setRequired(true)
        .setAutocomplete(true)
    )

    .addStringOption((option) =>
      option
        .setName("action")
        .setDescription("La acción a realizar")
        .setRequired(true)
        .addChoices(
          { name: "Añadir Pesadilla", value: "add_nightmare" },
          { name: "Remover Pesadilla", value: "remove_nightmare" },
          { name: "Añadir Desequilibrio", value: "add_imbalance" },
          { name: "Remover Desequilibrio", value: "remove_imbalance" },
          { name: "Añadir Voluntad Desequilibrada", value: "add_imbalanced_willpower" },
          { name: "Remover Voluntad Desequilibrada", value: "remove_imbalanced_willpower" },
          { name: "Ver Estado", value: "status" }
        )
    )

    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Cantidad (no requerido para 'Ver Estado')")
        .setMinValue(1)
        .setMaxValue(10)
    )

    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Razón del cambio (opcional)")
        .setMaxLength(200)
    );

  return slashCommand;
} 