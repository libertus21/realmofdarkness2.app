import {
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { trimString } from "@modules/misc";
import getCharacter from "@src/modules/getCharacter";
import Roll from "@src/modules/dice/roll";
import API from "@api";
import { Splats } from "@constants/index";

const passedString = "`Passed [{dice}]`";
const failedString = "`Failed [{dice}]`";

type RageInteraction = ChatInputCommandInteraction & {
  args?: {
    character: any;
    checks: number;
    reroll?: boolean | null;
    notes?: string | null;
  };
  results?: any;
}

export default async function rageRoll(
  interaction: RageInteraction
): Promise<{ embeds: EmbedBuilder[] }> {
  interaction.args = await getArgs(interaction);
  interaction.results = {
    decreased: 0,
    rolls: [] as Array<{ dice: number[]; passed: boolean }> ,
    toString:
      "```ansi\n\u001b[2;36m\u001b[2;34m\u001b[2;36mRage Decreased{amount}\u001b[0m\u001b[2;34m\u001b[0m\u001b[2;36m\u001b[0m\n```",
    color: "#1981bd",
  } as any;

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

async function getArgs(interaction: ChatInputCommandInteraction) {
  const args = {
    character: await getCharacter(
      interaction.options.getString("character"),
      interaction,
      false
    ),
    checks: interaction.options.getInteger("checks") ?? 1,
    reroll: interaction.options.getBoolean("reroll"),
    notes: interaction.options.getString("notes"),
  } as any;

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
      };
    }
  }
  return args;
}

function rollCheck(reroll?: boolean) {
  const rollResults = {
    dice: [Roll.single(10)],
    passed: false,
  };
  if (reroll) rollResults.dice.push(Roll.single(10));

  for (const dice of rollResults.dice) if (dice >= 6) rollResults.passed = true;
  return rollResults;
}

function getEmbed(interaction: any) {
  const results = interaction.results;
  const embed = new EmbedBuilder();
  embed.setAuthor({
    name:
      interaction.member?.displayName ??
      interaction.user.displayName ??
      interaction.user.username,
    iconURL:
      interaction.member?.displayAvatarURL() ??
      interaction.user.displayAvatarURL(),
  });

  embed.setTitle("Rage Check");
  embed.setColor(results.color);
  embed.setURL("https://realmofdarkness.app/");

  if (interaction.args.character) {
    const char = interaction.args.character;
    embed.addFields({ name: "Character", value: char.name });
    if (char.tracked?.thumbnail) embed.setThumbnail(char.tracked.thumbnail);
  }

  // Dice fields
  let diceField = "";
  for (const roll of results.rolls) {
    let str = roll.passed ? passedString : failedString;
    str = str.replace("{dice}", roll.dice.join(", "));
    diceField += str;
  }
  embed.addFields({ name: "Rolls", value: trimString(diceField) });

  return embed;
}

async function updateRage(interaction: any) {
  if (!interaction.results.decreased) return;
  const char = interaction.args.character;
  if (char?.tracked?.rage) {
    if ((API as any).characters?.updateRage) await (API as any).characters.updateRage(
      interaction.client,
      char.tracked.id,
      Math.max(char.tracked.rage.current - interaction.results.decreased, 0)
    );
  }
}
