import { SlashCommandBuilder, MessageFlags, ChatInputCommandInteraction, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import setStorytellers from "@modules/setStorytellers";
import setTrackerChannel from "@modules/setTrackerChannel";
import commandUpdate from "@modules/commandDatabaseUpdate";

interface CommandModule {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<any>;
}

const commandModule: CommandModule = {
  data: getCommands(),
  async execute(interaction: ChatInputCommandInteraction): Promise<any> {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    await commandUpdate(interaction);

    if (!interaction.isRepliable()) return "notRepliable";

    switch (interaction.options.getSubcommand()) {
      case "tracker":
        return await setTrackerChannel(interaction);
      case "storytellers":
        return await setStorytellers(interaction);
    }
  },
};

function getCommands(): SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder {
  return (
    new SlashCommandBuilder()
      .setName("server")
      .setDescription("Server management commands.")

      /////////////////// Server Tracker Command ////////////////////////////
      .addSubcommand((subcommand) =>
        subcommand
          .setName("tracker")
          .setDescription(
            "Set or remove the channel for tracking posts. [ST only]"
          )

          .addChannelOption((option) =>
            option
              .setName("channel")
              .setDescription(
                "Channel to use for tracking posts, or remove if already set."
              )
          )
      )
      ///////////////////////// Server Storytellers Command //////////////////
      .addSubcommand((subcommand) =>
        subcommand
          .setName("storytellers")
          .setDescription(
            "Set or remove Storyteller (ST) role permissions. [Admin only]"
          )

          .addRoleOption((option) =>
            option.setName("role").setDescription("ST role to add or remove.")
          )
      )
  );
}

export default commandModule; 