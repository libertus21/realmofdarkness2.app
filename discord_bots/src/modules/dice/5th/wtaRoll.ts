import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  AnyComponentBuilder,
} from "discord.js";
import getCharacter from "@src/modules/getCharacter";
import {
  getEmbed,
  getContent,
  getComponents,
} from "@modules/dice/5th/getWtaRollResponse";
import Wta5thRollResults from "@structures/Wta5thRollResults";
import handleButtonPress from "@modules/dice/5th/handleButtonPress";
import API from "@api";
import { Splats } from "@constants/index";

export type WtaRollResponse = {
  content: string;
  embeds: EmbedBuilder[];
  components: ActionRowBuilder<AnyComponentBuilder>[];
};

export default async function wtaRoll(
  interaction: ChatInputCommandInteraction & { arguments?: any; rollResults?: any }
): Promise<WtaRollResponse> {
  interaction.arguments = await getArgs(interaction);
  interaction.rollResults = await roll(interaction);

  await handleButtonPress(interaction, getEmbed, getComponents, getContent);
  return {
    content: getContent(interaction),
    embeds: [getEmbed(interaction)],
    components: getComponents(interaction),
  };
}

async function getArgs(interaction: ChatInputCommandInteraction) {
  const args = {
    pool: interaction.options.getInteger("pool"),
    rage: interaction.options.getInteger("rage"),
    autoRage: interaction.options.getBoolean("use_char_rage") ?? true,
    difficulty: interaction.options.getInteger("difficulty"),
    spec: interaction.options.getString("speciality"),
    rageCheck: interaction.options.getString("rage_check"),
    doubleRageCheck: interaction.options.getString("double_rage_check"),
    notes: interaction.options.getString("notes"),
    character: await getCharacter(
      interaction.options.getString("character"),
      interaction,
      false
    ),
  } as any;

  // Defaults
  if (!args.character?.tracked && interaction.guild) {
    const defaults = await API.characterDefaults.get(
      interaction.client,
      interaction.guild.id,
      interaction.user.id,
      [Splats.werewolf5th.slug, Splats.human5th.slug]
    );
    if (defaults) {
      args.character = {
        name: defaults.character.name,
        tracked: defaults.character,
      };
    }
  }
  return args;
}

async function roll(interaction: any) {
  const args = interaction.arguments;
  if (
    args.character?.tracked &&
    args.autoRage &&
    args.character.tracked.splat.slug === "werewolf5th"
  ) {
    args.rage = args.character.tracked.rage.current;
  }

  const results = new Wta5thRollResults({
    difficulty: args.difficulty ?? 1,
    pool: args.pool,
    spec: args.spec,
  });

  results.rollDice(args.rage);
  results.setOutcome();

  if (args.rageCheck != null) results.setRageCheck(args.rageCheck);
  else if (args.doubleRageCheck != null)
    results.setDoubleRageCheck(args.doubleRageCheck);

  await updateRage(interaction, results);
  return results;
}

async function updateRage(interaction: any, results: any) {
  let rage = 0;
  if (results.rageCheck != null) rage = 1;
  else if (results.doubleRageCheck != null) rage = 2;
  if (results.outcome.bestialOutcome) rage += 2;

  const char = interaction.arguments.character;
  if (char?.tracked?.rage) {
    if ((API as any).characters?.updateRage) await (API as any).characters.updateRage(
      interaction.client,
      char.tracked.id,
      char.tracked.rage.current + rage
    );
  }
}
