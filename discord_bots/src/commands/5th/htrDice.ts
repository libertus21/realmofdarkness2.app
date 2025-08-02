import { SlashCommandBuilder, ChatInputCommandInteraction, AutocompleteInteraction, SlashCommandOptionsOnlyBuilder } from "discord.js";
import htrDice from "@modules/dice/5th/hunterRoll";
import commandUpdate from "@modules/commandDatabaseUpdate";
import autocomplete5th from "@modules/autocomplete";
import { Splats } from "@constants";

interface CommandModule {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<any>;
  autocomplete(interaction: AutocompleteInteraction): Promise<void>;
}

const module: CommandModule = {
  data: getCommand(),
  async execute(interaction: ChatInputCommandInteraction): Promise<any> {
    await interaction.deferReply();
    await commandUpdate(interaction);
    if (!interaction.isRepliable()) return "notRepliable";

    return await htrDice(interaction);
  },

  async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
    return await autocomplete5th(interaction, Splats.hunter5th.slug);
  },
};

function getCommand(): SlashCommandBuilder | SlashCommandOptionsOnlyBuilder {
  const command = new SlashCommandBuilder()
    .setName("htr_dice")
    .setDescription("Hunter dice rolls.")

    .addIntegerOption((option) => {
      option
        .setName("pool")
        .setDescription("Number of dice to roll.")
        .setMaxValue(50)
        .setMinValue(1)
        .setRequired(true);
      return option;
    })

    .addIntegerOption((option) => {
      option
        .setName("difficulty")
        .setDescription("Difficulty of the roll.")
        .setMaxValue(50)
        .setMinValue(1)
        .setRequired(true);
      return option;
    })

    .addIntegerOption((option) => {
      option
        .setName("modifier")
        .setDescription("Adds or removes additional dice to the roll.")
        .setMaxValue(50)
        .setMinValue(1);
      return option;
    })

    .addStringOption((option) => {
      option
        .setName("name")
        .setDescription(
          "Name of the character making the roll (must be a sheet character)."
        )
        .setMaxLength(50)
        .setAutocomplete(true);
      return option;
    })

    .addStringOption((option) => {
      option
        .setName("notes")
        .setDescription(
          "Any additional information you would like to include about this roll."
        )
        .setMaxLength(300);
      return option;
    });

  return command;
}

export default module; 