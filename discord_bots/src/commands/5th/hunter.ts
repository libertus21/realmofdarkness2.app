import { SlashCommandBuilder, MessageFlags, ChatInputCommandInteraction, AutocompleteInteraction, User, Attachment, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { Splats } from "@constants";
import tracker from "@modules/tracker";
import getHexColor from "@modules/getColorHex";
import verifySupporterStatus from "@modules/verifySupporterStatus";
import commandUpdate from "@modules/commandDatabaseUpdate";
import autocomplete5th from "@modules/autocomplete";

interface CommandModule {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<{ flags: MessageFlags; embeds: any[] } | string | void>;
  autocomplete(interaction: AutocompleteInteraction): Promise<void>;
}

interface InteractionArguments {
  player: User | null;
  name: string | null;
  exp: number | null;
  notes: string | null;
  nameChange: string | null;
  thumbnail: Attachment | null;
  color: string | null;
  willpower: number | null;
  health: number | null;
  willpowerSup: number | null;
  willpowerAgg: number | null;
  healthSup: number | null;
  healthAgg: number | null;
  humanity: number | null;
  stains: number | null;
}

const module: CommandModule = {
  data: getCommands(),
  async execute(interaction: ChatInputCommandInteraction): Promise<{ flags: MessageFlags; embeds: any[] } | string | void> {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    await commandUpdate(interaction);

    if (!interaction.isRepliable()) return "notRepliable";
    (interaction as any).arguments = await getArgs(interaction);
    switch (interaction.options.getSubcommand()) {
      case "new":
        return await tracker.new(interaction, Splats.hunter5th);
      case "update":
        return await tracker.update(interaction, null);
      case "set":
        return await tracker.set(interaction, null);
    }
  },

  async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
    return await autocomplete5th(interaction, Splats.hunter5th.slug);
  },
};

async function getArgs(interaction: ChatInputCommandInteraction): Promise<InteractionArguments> {
  const args: InteractionArguments = {
    player: interaction.options.getUser("player"),
    name: interaction.options.getString("name"),
    exp: interaction.options.getInteger("exp"),
    notes: interaction.options.getString("notes"),
    nameChange: interaction.options.getString("change_name"),
    thumbnail: interaction.options.getAttachment("image"),
    color: getHexColor(interaction.options.getString("color")),
    willpower: interaction.options.getInteger("willpower"),
    health: interaction.options.getInteger("health"),
    willpowerSup: interaction.options.getInteger("willpower_superficial"),
    willpowerAgg: interaction.options.getInteger("willpower_agg"),
    healthSup: interaction.options.getInteger("health_superficial"),
    healthAgg: interaction.options.getInteger("health_agg"),
    humanity: interaction.options.getInteger("humanity"),
    stains: interaction.options.getInteger("stains"),
  };

  if (args.color || args.thumbnail)
    await verifySupporterStatus.mortal(interaction.user.id);
  return args;
}

function getCommands(): SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder {
  const command = new SlashCommandBuilder()
    .setName("hunter")
    .setDescription("Hunter tracker commands.");

  ////////////////// New Hunter ////////////////////////////
  command.addSubcommand((subcommand) =>
    subcommand
      .setName("new")
      .setDescription("Create a new Hunter 5th character.")

      .addStringOption((option) =>
        option
          .setName("name")
          .setDescription("Name of your character.")
          .setRequired(true)
          .setMaxLength(50)
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower")
          .setDescription("Total Willpower (1-20).")
          .setMaxValue(20)
          .setMinValue(1)
          .setRequired(true)
      )

      .addIntegerOption((option) =>
        option
          .setName("health")
          .setDescription("Total Health (1-20).")
          .setMaxValue(20)
          .setMinValue(1)
          .setRequired(true)
      )

      .addIntegerOption((option) =>
        option
          .setName("humanity")
          .setDescription("Current Humanity (0-10).")
          .setMaxValue(10)
          .setMinValue(0)
          .setRequired(true)
      )

      .addIntegerOption((option) =>
        option
          .setName("exp")
          .setDescription("Total Experience.")
          .setMaxValue(1000)
          .setMinValue(0)
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower_superficial")
          .setDescription("Superficial Willpower Damage (0-20).")
          .setMaxValue(20)
          .setMinValue(0)
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower_agg")
          .setDescription("Aggravated Willpower Damage (0-20).")
          .setMaxValue(20)
          .setMinValue(0)
      )

      .addIntegerOption((option) =>
        option
          .setName("health_superficial")
          .setDescription("Superficial Health Damage (0-20).")
          .setMaxValue(20)
          .setMinValue(0)
      )

      .addIntegerOption((option) =>
        option
          .setName("health_agg")
          .setDescription("Aggravated Health Damage (0-20).")
          .setMaxValue(20)
          .setMinValue(0)
      )

      .addIntegerOption((option) =>
        option
          .setName("stains")
          .setDescription("Current Stains (0-10).")
          .setMaxValue(10)
          .setMinValue(0)
      )

      .addStringOption((option) =>
        option
          .setName("notes")
          .setDescription("Any additional information you want to include.")
          .setMaxLength(300)
      )

      .addStringOption((option) =>
        option
          .setName("color")
          .setDescription(
            "Sidebar color. Enter hex code (e.g. #6f82ab). [Supporter Only]"
          )
          .setMaxLength(7)
          .setMinLength(7)
      )

      .addAttachmentOption((option) =>
        option
          .setName("image")
          .setDescription(
            "Change your character's thumbnail image. [Supporter Only]"
          )
      )
  );

  //////////////////// Set Command ////////////////////////////////
  command.addSubcommand((subcommand) =>
    subcommand
      .setName("set")
      .setDescription("Set values for your Hunter 5th character.")

      .addStringOption((option) =>
        option
          .setName("name")
          .setDescription("Name of your character.")
          .setRequired(true)
          .setMaxLength(50)
          .setAutocomplete(true)
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower")
          .setDescription("Total Willpower (1-20).")
          .setMaxValue(20)
          .setMinValue(1)
      )

      .addIntegerOption((option) =>
        option
          .setName("health")
          .setDescription("Total Health (1-20).")
          .setMaxValue(20)
          .setMinValue(1)
      )

      .addIntegerOption((option) =>
        option
          .setName("humanity")
          .setDescription("Current Humanity (0-10).")
          .setMaxValue(10)
          .setMinValue(0)
      )

      .addIntegerOption((option) =>
        option
          .setName("exp")
          .setDescription("Total Experience. + values increase current.")
          .setMaxValue(1000)
          .setMinValue(0)
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower_superficial")
          .setDescription("Superficial Willpower Damage (0-20).")
          .setMaxValue(20)
          .setMinValue(0)
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower_agg")
          .setDescription("Aggravated Willpower Damage (0-20).")
          .setMaxValue(20)
          .setMinValue(0)
      )

      .addIntegerOption((option) =>
        option
          .setName("health_superficial")
          .setDescription("Superficial Health Damage (0-20).")
          .setMaxValue(20)
          .setMinValue(0)
      )

      .addIntegerOption((option) =>
        option
          .setName("health_agg")
          .setDescription("Aggravated Health Damage (0-20).")
          .setMaxValue(20)
          .setMinValue(0)
      )

      .addIntegerOption((option) =>
        option
          .setName("stains")
          .setDescription("Current Stains (0-10).")
          .setMaxValue(10)
          .setMinValue(0)
      )

      .addStringOption((option) =>
        option
          .setName("notes")
          .setDescription("Any additional information you want to include.")
          .setMaxLength(300)
      )

      .addStringOption((option) =>
        option
          .setName("change_name")
          .setDescription("Change your character's name.")
          .setMaxLength(50)
      )

      .addStringOption((option) =>
        option
          .setName("color")
          .setDescription(
            "Sidebar color. Enter hex code (e.g. #6f82ab). [Supporter Only]"
          )
          .setMaxLength(7)
          .setMinLength(7)
      )

      .addAttachmentOption((option) =>
        option
          .setName("image")
          .setDescription(
            "Change your character's thumbnail image. [Supporter Only]"
          )
      )
  );

  //////////////////////// Update Command ////////////////////////////////////
  command.addSubcommand((subcommand) =>
    subcommand
      .setName("update")
      .setDescription("Update values for your Hunter 5th character.")

      .addStringOption((option) =>
        option
          .setName("name")
          .setDescription("Name of your character.")
          .setRequired(true)
          .setMaxLength(50)
          .setAutocomplete(true)
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower_superficial")
          .setDescription(
            "Change Superficial Willpower Damage by amount (-30 to 30)."
          )
          .setMaxValue(30)
          .setMinValue(-30)
      )

      .addIntegerOption((option) =>
        option
          .setName("health_superficial")
          .setDescription(
            "Change Superficial Health Damage by amount (-30 to 30)."
          )
          .setMaxValue(30)
          .setMinValue(-30)
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower_agg")
          .setDescription(
            "Change Aggravated Willpower Damage by amount (-30 to 30)."
          )
          .setMaxValue(30)
          .setMinValue(-30)
      )

      .addIntegerOption((option) =>
        option
          .setName("health_agg")
          .setDescription(
            "Change Aggravated Health Damage by amount (-30 to 30)."
          )
          .setMaxValue(30)
          .setMinValue(-30)
      )

      .addIntegerOption((option) =>
        option
          .setName("stains")
          .setDescription("Change Stains by amount (-15 to 15).")
          .setMaxValue(15)
          .setMinValue(-15)
      )

      .addIntegerOption((option) =>
        option
          .setName("exp")
          .setDescription("Change Experience by amount.")
          .setMaxValue(2000)
          .setMinValue(-2000)
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower")
          .setDescription("Change Total Willpower by amount (-20 to 20).")
          .setMaxValue(20)
          .setMinValue(-20)
      )

      .addIntegerOption((option) =>
        option
          .setName("health")
          .setDescription("Change Total Health by amount (-30 to 30).")
          .setMaxValue(30)
          .setMinValue(-30)
      )

      .addIntegerOption((option) =>
        option
          .setName("humanity")
          .setDescription("Change Humanity by amount (-15 to 15).")
          .setMaxValue(15)
          .setMinValue(-15)
      )

      .addUserOption((option) =>
        option
          .setName("player")
          .setDescription(
            "Storytellers must select the player this character belongs to."
          )
      )

      .addStringOption((option) =>
        option
          .setName("notes")
          .setDescription("Any additional information you want to include.")
          .setMaxLength(300)
      )
  );
  return command;
}

export default module; 