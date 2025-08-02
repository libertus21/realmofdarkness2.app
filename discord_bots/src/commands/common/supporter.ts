import { SlashCommandBuilder, MessageFlags, ChatInputCommandInteraction, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { supporterStatus, supporterJoin } from "@modules/supporter";
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

    switch (interaction.options.getSubcommand()) {
      case "status":
        return await supporterStatus(interaction);
      case "join":
        return await supporterJoin(interaction);
    }
  },
};

function getCommands(): SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder {
  return (
    new SlashCommandBuilder()
      .setName("supporter")
      .setDescription("Supporter commands.")

      /////////////////// Supporter Status Command ////////////////////////////
      .addSubcommand((subcommand) =>
        subcommand
          .setName("status")
          .setDescription("Your current supporter tier and information.")
      )

      ///////////////////////// Supporter Join Command //////////////////
      .addSubcommand((subcommand) =>
        subcommand.setName("join").setDescription("Become a supporter.")
      )
  );
}

export default commandModule; 