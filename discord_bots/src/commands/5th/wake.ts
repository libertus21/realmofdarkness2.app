import { SlashCommandBuilder, ChatInputCommandInteraction, AutocompleteInteraction, SlashCommandOptionsOnlyBuilder } from "discord.js";
import v5Wake from "@modules/dice/5th/v5WakeRoll";
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

    return await v5Wake(interaction);
  },

  async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
    return await autocomplete5th(interaction, Splats.vampire5th.slug);
  },
};

function getCommand(): SlashCommandBuilder | SlashCommandOptionsOnlyBuilder {
  return new SlashCommandBuilder()
    .setName("wake")
    .setDescription("Vampire wake command.")

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
}

export default module; 