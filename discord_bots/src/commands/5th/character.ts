import { SlashCommandBuilder, MessageFlags, ChatInputCommandInteraction, AutocompleteInteraction, EmbedBuilder, ActionRowBuilder, AnyComponentBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import findCharacterCommand from "@modules/findCharacter";
import deleteCharacterCommand from "@modules/deleteCharacter";
import setDefaultCharacter from "@modules/setDefaultCharacter";
import commandUpdate from "@modules/commandDatabaseUpdate";
import autocomplete5th from "@modules/autocomplete";
import { Splats } from "@constants";

interface CommandModule {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<{ embeds: EmbedBuilder[]; components: ActionRowBuilder<AnyComponentBuilder>[]; flags: MessageFlags } | { content: string; embeds: EmbedBuilder[] } | { embeds: EmbedBuilder[]; flags: MessageFlags } | string | void>;
  autocomplete(interaction: AutocompleteInteraction): Promise<void>;
}

const module: CommandModule = {
  data: getCommands(),
  async execute(interaction: ChatInputCommandInteraction): Promise<{ embeds: EmbedBuilder[]; components: ActionRowBuilder<AnyComponentBuilder>[]; flags: MessageFlags } | { content: string; embeds: EmbedBuilder[] } | { embeds: EmbedBuilder[]; flags: MessageFlags } | string | void> {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    await commandUpdate(interaction);

    if (!interaction.isRepliable()) return "notRepliable";

    switch (interaction.options.getSubcommand()) {
      case "find":
        return await findCharacterCommand.command(interaction);
      case "delete":
        return await deleteCharacterCommand.command(interaction);
      case "default":
        return await setDefaultCharacter(interaction);
    }
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

function getCommands(): SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder {
  return (
    new SlashCommandBuilder()
      .setName("character")
      .setDescription("Character commands.")

      ////////////////////////// Character find Command ///////////////////////
      .addSubcommand((subcommand) =>
        subcommand
          .setName("find")
          .setDescription("Find a tracked character.")
          .addUserOption((option) =>
            option
              .setName("player")
              .setDescription(
                "Storytellers must select the player this character belongs to."
              )
          )
      )
      ///////////////////// Character Delete Command //////////////////////////
      .addSubcommand((subcommand) =>
        subcommand
          .setName("delete")
          .setDescription("Delete a tracked character.")
          .addUserOption((option) =>
            option
              .setName("player")
              .setDescription(
                "Storytellers must select the player this character belongs to."
              )
          )
      )
      ///////////////////////// Character Defaults /////////////////////
      .addSubcommand((subcommand) =>
        subcommand
          .setName("default")
          .setDescription(
            "Set a default character for dice rolls and updates on this server. [Supporter Required]"
          )
          .addStringOption((option) =>
            option
              .setName("name")
              .setDescription("Name of the character to set as default.")
              .setMaxLength(50)
              .setAutocomplete(true)
          )
          .addBooleanOption((option) =>
            option
              .setName("use_char_hunger")
              .setDescription(
                "If enabled, rolls always use this character's hunger."
              )
          )
          .addBooleanOption((option) =>
            option
              .setName("disable")
              .setDescription("Disable default character.")
          )
      )
  );
}

export default module; 