import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  AnyComponentBuilder,
  MessageFlags,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

import generalRoll from "@src/modules/dice/generalRoll";
import wtaRoll from "@modules/dice/5th/wtaRoll";
import rageRoll from "@modules/dice/5th/rageRoll";
import riteRoll from "@modules/dice/5th/riteRoll";
import commandUpdate from "@modules/commandDatabaseUpdate";
import autocomplete5th from "@modules/autocomplete";
import { Splats } from "@constants/index";

/* --------------------------------------------------------------------------
 * Types
 * --------------------------------------------------------------------------*/

// Discord.js reply payloads used by the dice helpers -----------------------
export type DiceResponse =
  | {
      content: string;
      embeds: EmbedBuilder[];
      components: ActionRowBuilder<AnyComponentBuilder>[];
    }
  | { embeds: EmbedBuilder[] }
  | { embeds: EmbedBuilder[]; flags: MessageFlags };

interface CommandModule {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute(
    interaction: ChatInputCommandInteraction
  ): Promise<DiceResponse | string | void>;
  autocomplete(interaction: AutocompleteInteraction): Promise<void>;
}

/* --------------------------------------------------------------------------
 * Command implementation
 * --------------------------------------------------------------------------*/

const commandModule: CommandModule = {
  data: getCommand(),

  async execute(
    interaction: ChatInputCommandInteraction
  ): Promise<DiceResponse | string | void> {
    await interaction.deferReply();
    await commandUpdate(interaction);

    if (!interaction.isRepliable()) return "notRepliable";

    let result: DiceResponse | string | void;
    switch (interaction.options.getSubcommand()) {
      case "roll":
        result = await wtaRoll(interaction);
        break;
      case "rage":
        result = await rageRoll(interaction);
        break;
      case "rite":
        result = await riteRoll(interaction);
        break;
      case "general":
        result = generalRoll(interaction);
        break;
    }

    // send response
    if (typeof result === "string") {
      await interaction.editReply({ content: result });
    } else if (result) {
      await interaction.editReply(result as any);
    }
    return "notRepliable";
  },

  async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
    return autocomplete5th(interaction, [
      Splats.werewolf5th.slug,
      Splats.human5th.slug,
    ]);
  },
};

/* --------------------------------------------------------------------------
 * Builder
 * --------------------------------------------------------------------------*/

function getCommand(): SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder {
  const command = new SlashCommandBuilder()
    .setName("w")
    .setDescription("Dice rolls for the WtA 5th game.");

  ///////////////////////// WtA Roll Command //////////////////////
  command.addSubcommand((subcommand) =>
    subcommand
      .setName("roll")
      .setDescription("Roll dice using Werewolf: the Apocalypse 5th rules.")
      .addIntegerOption((option) =>
        option
          .setName("pool")
          .setDescription("Base dice pool to roll. Can be modified by other options.")
          .setMaxValue(50)
          .setMinValue(1)
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName("rage")
          .setDescription("Number of rage dice (0-5). Defaults to 0.")
          .setMaxValue(5)
          .setMinValue(0)
      )
      .addBooleanOption((option) =>
        option
          .setName("use_char_rage")
          .setDescription("Use rage dice from your linked character (Defaults to true).")
      )
      .addIntegerOption((option) =>
        option
          .setName("difficulty")
          .setDescription("Number of successes needed to succeed (1-50). Defaults to 1.")
          .setMaxValue(50)
          .setMinValue(1)
      )
      .addStringOption((option) =>
        option
          .setName("speciality")
          .setDescription("Specialty applied to the roll (Adds 1 die).")
          .setMaxLength(100)
      )
      .addStringOption((option) =>
        option
          .setName("rage_check")
          .setDescription("Adds a rage check to the roll.")
          .setChoices({ name: "No Reroll", value: "No Reroll" }, { name: "Reroll", value: "Reroll" })
      )
      .addStringOption((option) =>
        option
          .setName("double_rage_check")
          .setDescription("Adds a double rage check to the roll.")
          .setChoices({ name: "No Reroll", value: "No Reroll" }, { name: "Reroll", value: "Reroll" })
      )
      .addStringOption((option) =>
        option
          .setName("notes")
          .setDescription("Additional notes for the roll.")
          .setMaxLength(1000)
      )
      .addStringOption((option) =>
        option
          .setName("character")
          .setDescription("Linked character name to use for the roll.")
          .setAutocomplete(true)
      )
  );

  ////////////////////// Rage Check Command //////////////////////
  command.addSubcommand((subcommand) =>
    subcommand
      .setName("rage")
      .setDescription("Perform a Rage check.")
      .addIntegerOption((option) =>
        option
          .setName("checks")
          .setDescription("Number of rage checks to roll (1-5).")
          .setMaxValue(5)
          .setMinValue(1)
      )
      .addBooleanOption((option) =>
        option
          .setName("reroll")
          .setDescription("Roll an extra die for each check and keep the highest.")
      )
      .addStringOption((option) =>
        option
          .setName("character")
          .setDescription("Linked character name to use for the check.")
          .setAutocomplete(true)
      )
      .addStringOption((option) =>
        option
          .setName("notes")
          .setDescription("Additional notes for the check.")
          .setMaxLength(1000)
      )
  );

  ////////////////////// Rite Roll Command //////////////////////
  command.addSubcommand((subcommand) =>
    subcommand
      .setName("rite")
      .setDescription("Perform a Rite roll.")
      .addStringOption((option) =>
        option
          .setName("rite")
          .setDescription("Type of Rite.")
          .setChoices(
            { name: "Level 0", value: "0" },
            { name: "Level 1", value: "1" },
            { name: "Level 2", value: "2" },
            { name: "Level 3", value: "3" },
            { name: "Level 4", value: "4" },
            { name: "Level 5", value: "5" }
          )
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName("pool")
          .setDescription("Base dice pool for the Rite.")
          .setMaxValue(50)
          .setMinValue(1)
      )
      .addIntegerOption((option) =>
        option
          .setName("difficulty")
          .setDescription("Difficulty of the Rite (1-10).")
          .setMaxValue(10)
          .setMinValue(1)
      )
      .addStringOption((option) =>
        option
          .setName("character")
          .setDescription("Linked character name to use for the roll.")
          .setAutocomplete(true)
      )
      .addStringOption((option) =>
        option
          .setName("notes")
          .setDescription("Additional notes for the roll.")
          .setMaxLength(1000)
      )
  );

  ////////////////////// General Roll Command //////////////////////
  command.addSubcommand((subcommand) =>
    subcommand
      .setName("general")
      .setDescription("Generic d10 pool roll (with optional Hunger/Rage dice).")
      .addIntegerOption((option) =>
        option
          .setName("pool")
          .setDescription("Base dice pool.")
          .setMaxValue(50)
          .setMinValue(1)
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName("hunger_rage")
          .setDescription("Number of Hunger/Rage dice to add (0-5).")
          .setMaxValue(5)
          .setMinValue(0)
      )
      .addIntegerOption((option) =>
        option
          .setName("difficulty")
          .setDescription("Difficulty of the roll (1-10).")
          .setMaxValue(10)
          .setMinValue(1)
      )
      .addStringOption((option) =>
        option
          .setName("notes")
          .setDescription("Additional notes for the roll.")
          .setMaxLength(1000)
      )
  );

  return command;
}

export default commandModule;
