import {
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";
import getCharacter from "@src/modules/getCharacter";
import Roll from "@src/modules/dice/roll";
import API from "@api";
import { Splats } from "@constants/index";

const passedString = "```ansi\n\u001b[2;33mPassed [{dice}]\u001b[0m\n```";
const failedString =
  "```ansi\n\u001b[2;33m\u001b[2;31mFailed [{dice}]\u001b[0m\u001b[2;33m\u001b[0m\n```";

interface RageRollResult {
  dice: number[];
  passed: boolean;
}

interface RageResults {
  decreased: number;
  rolls: RageRollResult[];
  toString: string;
  color: string;
}

interface RageArgs {
  character: any;
  checks: number;
  reroll?: boolean | null;
  notes?: string | null;
}

type RageInteraction = ChatInputCommandInteraction & {
  args?: RageArgs;
  results?: RageResults;
};

export default async function rageRoll(
  interaction: RageInteraction
): Promise<{ embeds: EmbedBuilder[] }> {
  interaction.args = await getArgs(interaction);
  interaction.results = {
    decreased: 0,
    rolls: [],
    toString:
      "```ansi\n\u001b[2;36m\u001b[2;34m\u001b[2;36mRage Decreased{amount}\u001b[0m\u001b[2;34m\u001b[0m\u001b[2;36m\u001b[0m\n```",
    color: "#1981bd",
  } as RageResults;

  for (let i = 0; i < interaction.args.checks; i++) {
    const roll = rollCheck(interaction.args.reroll);
    interaction.results.rolls.push(roll);
    if (!roll.passed) interaction.results.decreased++;
  }

  if (interaction.results.decreased === 0) {
    interaction.results.toString = "```Rage Unchanged```";
    interaction.results.color = "#1c1616";
  } else {
    interaction.results.toString = interaction.results.toString.replace(
      "{amount}",
      ` by ${interaction.results.decreased}`
    );
  }

  await updateRage(interaction);
  return { embeds: [getEmbed(interaction)] };
}

async function getArgs(interaction: ChatInputCommandInteraction): Promise<RageArgs> {
  const args: RageArgs = {
    character: await getCharacter(
      interaction.options.getString("character"),
      interaction,
      false
    ),
    checks: interaction.options.getInteger("checks") ?? 1,
    reroll: interaction.options.getBoolean("reroll"),
    notes: interaction.options.getString("notes"),
  } as RageArgs;

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
      } as any;
    }
  }
  return args;
}

function rollCheck(reroll?: boolean | null): RageRollResult {
  const rollResults: RageRollResult = {
    dice: [Roll.single(10)],
    passed: false,
  };
  if (reroll) rollResults.dice.push(Roll.single(10));

  for (const dice of rollResults.dice) if (dice >= 6) rollResults.passed = true;
  return rollResults;
}

function getEmbed(interaction: RageInteraction): EmbedBuilder {
  const results = interaction.results as RageResults;
  const embed = new EmbedBuilder();

  embed.setAuthor({
    name:
      (interaction.member as any)?.displayName ??
      (interaction.user as any).displayName ??
      interaction.user.username,
    iconURL:
      (interaction.member as any)?.displayAvatarURL() ??
      interaction.user.displayAvatarURL(),
  });

  embed.setTitle("Rage Check");
  embed.setColor(results.color as any);
  embed.setURL("https://realmofdarkness.app/");

  if (interaction.args?.character) {
    const char = interaction.args.character;
    embed.addFields({ name: "Character", value: char.name });
    if (char.tracked?.thumbnail) embed.setThumbnail(char.tracked.thumbnail);
  }

  // Dice fields per roll
  results.rolls.forEach((roll, index) => {
    let str = roll.passed ? passedString : failedString;
    str = str.replace("{dice}", roll.dice.join(" "));
    embed.addFields({ name: `Rage Roll ${index + 1}`, value: str });
  });

  // Notes field
  if (interaction.args?.notes)
    embed.addFields({ name: "Notes", value: interaction.args.notes });

  // Result field
  embed.addFields({ name: "Result", value: results.toString });

  // Links at bottom
  const links =
    "[Website](https://realmofdarkness.app/)" +
    " | [Commands](https://v5.realmofdarkness.app/)" +
    " | [Patreon](https://www.patreon.com/MiraiMiki)";
  embed.addFields({ name: "⠀", value: links });

  return embed;
}

async function updateRage(interaction: RageInteraction): Promise<void> {
  if (!interaction.results?.decreased) return;
  const char = interaction.args?.character;
  if (char?.tracked?.rage) {
    if ((API as any).characters?.updateRage)
      await (API as any).characters.updateRage(
        interaction.client,
        char.tracked.id,
        Math.max(char.tracked.rage.current - interaction.results.decreased, 0)
      );
  }
}
