import { SlashCommandBuilder, ChatInputCommandInteraction, AutocompleteInteraction, SlashCommandOptionsOnlyBuilder } from "discord.js";
import { v5SheetRoll } from "@modules/dice/5th/vtmRoll.js";
import commandUpdate from "@modules/commandDatabaseUpdate";
import autocomplete5th from "@modules/autocomplete";
import { Splats } from "@constants";

interface CommandModule {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<any>;
  autocomplete(interaction: AutocompleteInteraction): Promise<void>;
}

const commandModule: CommandModule = {
  data: getCommand(),
  async execute(interaction: ChatInputCommandInteraction): Promise<any> {
    await interaction.deferReply();
    await commandUpdate(interaction);
    if (!interaction.isRepliable()) return "notRepliable";

    return await v5SheetRoll(interaction);
  },

  async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
    return await autocomplete5th(interaction, [
      Splats.vampire5th.slug,
      Splats.hunter5th.slug,
      Splats.werewolf5th.slug,
      Splats.human5th.slug,
      Splats.ghoul5th.slug,
    ]);
  },
};

function getCommand(): SlashCommandBuilder | SlashCommandOptionsOnlyBuilder {
  const command = new SlashCommandBuilder()
    .setName("sheet")
    .setDescription("Dice rolls for VTM V5 character sheets.")

    .addStringOption((option) => {
      option
        .setName("name")
        .setDescription(
          "Name of the character making the roll (must be a sheet character)."
        )
        .setMaxLength(50)
        .setAutocomplete(true)
        .setRequired(true);
      return option;
    })

    .addStringOption((option) => {
      option
        .setName("notes")
        .setDescription(
          "Any additional information you want to include about this roll."
        )
        .setMaxLength(300);
      return option;
    });

  return command;
}

export default commandModule; 