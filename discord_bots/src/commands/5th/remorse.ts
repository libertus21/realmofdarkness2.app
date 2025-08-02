import { SlashCommandBuilder, ChatInputCommandInteraction, AutocompleteInteraction, EmbedBuilder, SlashCommandOptionsOnlyBuilder } from "discord.js";
import remorse from "@modules/dice/5th/remorse.js";
import commandUpdate from "@modules/commandDatabaseUpdate";
import autocomplete5th from "@modules/autocomplete";
import { Splats } from "@constants";

interface CommandModule {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<{ content: string; embeds: EmbedBuilder[] } | string | void>;
  autocomplete(interaction: AutocompleteInteraction): Promise<void>;
}

const commandModule: CommandModule = {
  data: getCommand(),
  async execute(interaction: ChatInputCommandInteraction): Promise<{ content: string; embeds: EmbedBuilder[] } | string | void> {
    await interaction.deferReply();
    await commandUpdate(interaction);

    if (!interaction.isRepliable()) return "notRepliable";

    return await remorse(interaction);
  },

  async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
    return await autocomplete5th(interaction, [
      Splats.vampire5th.slug,
      Splats.human5th.slug,
      Splats.ghoul5th.slug,
    ]);
  },
};

function getCommand(): SlashCommandBuilder | SlashCommandOptionsOnlyBuilder {
  const command = new SlashCommandBuilder()
    .setName("remorse")
    .setDescription("Humanity Remorse roll (p239).")

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
          "Any additional information you want to include about this roll."
        )
        .setMaxLength(300);
      return option;
    });

  return command;
}

export default commandModule; 