import { ButtonInteraction } from "discord.js";
import { ComponentCID } from "@constants/index";
import { component as findCharacterComponent } from "@modules/findCharacter";

export default {
  name: ComponentCID.FindCharacter,
  async execute(interaction: ButtonInteraction) {
    await interaction.deferUpdate();
    return findCharacterComponent(interaction);
  },
};