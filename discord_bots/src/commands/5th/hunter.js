"use strict";
require(`${process.cwd()}/alias`);
const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { Splats } = require("@constants");
const tracker = require("@modules/tracker");
const getHexColor = require("@modules/getColorHex");
const verifySupporterStatus = require("@modules/verifySupporterStatus");
const commandUpdate = require("@modules/commandDatabaseUpdate");
const autocomplete5th = require("@modules/autocomplete");

module.exports = {
  data: getCommands(),
  async execute(interaction) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    await commandUpdate(interaction);

    if (!interaction.isRepliable()) return "notRepliable";
    interaction.arguments = await getArgs(interaction);
    switch (interaction.options.getSubcommand()) {
      case "new":
        return await tracker.new(interaction, Splats.hunter5th);
      case "update":
        return await tracker.update(interaction, Splats.hunter5th);
      case "set":
        return await tracker.set(interaction, Splats.hunter5th);
    }
  },

  async autocomplete(interaction) {
    return await autocomplete5th(interaction, Splats.hunter5th.slug);
  },
};

async function getArgs(interaction) {
  const args = {
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
    desperation: interaction.options.getInteger("desperation"),
    danger: interaction.options.getInteger("danger"),
    despair: interaction.options.getBoolean("despair"),
  };

  if (args.color || args.thumbnail)
    await verifySupporterStatus.fledgling(interaction.user.id);
  return args;
}

function getCommands() {
  const command = new SlashCommandBuilder()
    .setName("hunter")
    .setDescription("Hunter tracker commands.");

  ////////////////// New Vampire ////////////////////////////
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
          .setName("desperation")
          .setDescription("Current Desperation (1-5).")
          .setMaxValue(5)
          .setMinValue(1)
      )

      .addIntegerOption((option) =>
        option
          .setName("danger")
          .setDescription("Current Danger (1-5).")
          .setMaxValue(5)
          .setMinValue(1)
      )

      .addBooleanOption((option) =>
        option
          .setName("despair")
          .setDescription("If you are currently in despair.")
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
          .setDescription("Superficial Willpower Damage (0-15).")
          .setMaxValue(15)
          .setMinValue(0)
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower_agg")
          .setDescription("Aggravated Willpower Damage (0-15).")
          .setMaxValue(15)
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
          .setName("desperation")
          .setDescription("Current Desperation (1-5).")
          .setMaxValue(5)
          .setMinValue(1)
      )

      .addIntegerOption((option) =>
        option
          .setName("danger")
          .setDescription("Current Danger (1-5).")
          .setMaxValue(5)
          .setMinValue(1)
      )

      .addBooleanOption((option) =>
        option
          .setName("despair")
          .setDescription("If you are currently in despair.")
      )

      .addIntegerOption((option) =>
        option
          .setName("exp")
          .setDescription(
            "Total Experience. Positive values increase current exp."
          )
          .setMaxValue(1000)
          .setMinValue(0)
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower_superficial")
          .setDescription("Superficial Willpower Damage (0-15).")
          .setMaxValue(15)
          .setMinValue(0)
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower_agg")
          .setDescription("Aggravated Willpower Damage (0-15).")
          .setMaxValue(15)
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
          .setName("desperation")
          .setDescription("Change Desperation by value (-10 to 10).")
          .setMaxValue(10)
          .setMinValue(-10)
      )

      .addIntegerOption((option) =>
        option
          .setName("danger")
          .setDescription("Change Danger by value (-10 to 10).")
          .setMaxValue(10)
          .setMinValue(-10)
      )

      .addBooleanOption((option) =>
        option
          .setName("despair")
          .setDescription("If you are currently in despair.")
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower_superficial")
          .setDescription(
            "Change Superficial Willpower Damage by value (-20 to 20)."
          )
          .setMaxValue(20)
          .setMinValue(-20)
      )

      .addIntegerOption((option) =>
        option
          .setName("health_superficial")
          .setDescription(
            "Change Superficial Health Damage by value (-30 to 30)."
          )
          .setMaxValue(30)
          .setMinValue(-30)
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower_agg")
          .setDescription(
            "Change Aggravated Willpower Damage by value (-20 to 20)."
          )
          .setMaxValue(20)
          .setMinValue(-20)
      )

      .addIntegerOption((option) =>
        option
          .setName("health_agg")
          .setDescription(
            "Change Aggravated Health Damage by value (-30 to 30)."
          )
          .setMaxValue(30)
          .setMinValue(-30)
      )

      .addIntegerOption((option) =>
        option
          .setName("exp")
          .setDescription("Change Experience by value.")
          .setMaxValue(2000)
          .setMinValue(-2000)
      )

      .addIntegerOption((option) =>
        option
          .setName("willpower")
          .setDescription("Change Total Willpower by value (-20 to 20).")
          .setMaxValue(20)
          .setMinValue(-20)
      )

      .addIntegerOption((option) =>
        option
          .setName("health")
          .setDescription("Change Total Health by value (-30 to 30).")
          .setMaxValue(30)
          .setMinValue(-30)
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
