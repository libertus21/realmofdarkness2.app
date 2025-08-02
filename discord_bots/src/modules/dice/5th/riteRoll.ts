import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  AnyComponentBuilder,
} from "discord.js";
import { getEmbed, getContent, getComponents } from "./getWtaRollResponse";
import { trimString } from "@modules/misc";
import getCharacter from "@src/modules/getCharacter";
import Wta5thRollResults from "@structures/Wta5thRollResults";
import type { CharacterSelection } from "../../../types/characters";
import type { RiteArgs } from "../../../types/rolls";
import handleButtonPress from "@modules/dice/5th/handleButtonPress";
import API from "@api";
import { Splats } from "@constants/index";

export type RiteResponse = {
  content: string;
  embeds: EmbedBuilder[];
  components: ActionRowBuilder<AnyComponentBuilder>[];
};

export default async function riteRoll(
  interaction: ChatInputCommandInteraction & { arguments?: RiteArgs; rollResults?: Wta5thRollResults }
): Promise<RiteResponse> {
  interaction.arguments = await getArgs(interaction);
  interaction.rollResults = await roll(interaction as ChatInputCommandInteraction & { arguments: RiteArgs });

  await handleButtonPress(interaction as ChatInputCommandInteraction & { arguments: RiteArgs }, getEmbed, getComponents, getContent);
  return {
    content: getContent(interaction),
    embeds: [getEmbed(interaction)],
    components: getComponents(interaction),
  };
}

async function getArgs(interaction: ChatInputCommandInteraction): Promise<RiteArgs> {
  const args = {
    pool: interaction.options.getInteger("pool"),
    rage: interaction.options.getInteger("rage"),
    useCharRage: interaction.options.getBoolean("use_character_rage") ?? true,
    trainedParticipants: interaction.options.getInteger("trained_participants"),
    participants: interaction.options.getInteger("participants"),
    difficulty: interaction.options.getInteger("difficulty"),
    spec: interaction.options.getString("speciality"),
    rageCheck: interaction.options.getString("rage_check"),
    notes: interaction.options.getString("notes"),
    character: await getCharacter(
      interaction.options.getString("character"),
      interaction,
      false
    ),
  } as RiteArgs;

  if (!args.character?.tracked && interaction.guild) {
    const defaults = await API.characterDefaults.get(
      interaction.client,
      interaction.guild.id,
      interaction.user.id,
      [Splats.werewolf5th.slug]
    );
    if (defaults) {
      args.character = {
        name: defaults.character.name,
        tracked: defaults.character,
      } as CharacterSelection;
    }
  }

  if (args.useCharRage && args.rage == null && args.character?.tracked?.rage) {
    args.rage = args.character.tracked.rage.current;
  }
  return args;
}

async function roll(interaction: ChatInputCommandInteraction & { arguments: RiteArgs }): Promise<Wta5thRollResults> {
  const args = interaction.arguments;
  const pool = (args.pool ?? 0) + (args.participants ?? 0) + (args.trainedParticipants ?? 0) * 2;

  const results = new Wta5thRollResults({
    difficulty: args.difficulty ?? 1,
    pool,
    spec: args.spec,
  });

  const rage = (args.rage ?? 0) + (args.participants ?? 0) + (args.trainedParticipants ?? 0);
  results.rollDice(rage);
  results.setOutcome();

  if (args.rageCheck != null) results.setRageCheck(args.rageCheck);
  return results;
}
