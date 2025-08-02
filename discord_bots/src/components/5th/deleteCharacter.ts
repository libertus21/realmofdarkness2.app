import { ButtonInteraction } from "discord.js";
import { ComponentCID } from "@constants/index";
import { component as deleteCharacterComponent } from "@modules/deleteCharacter";

export default {
  name: ComponentCID.DeleteCharacters,
  async execute(interaction: ButtonInteraction) {
    await interaction.deferUpdate();
    return deleteCharacterComponent(interaction);
  },
};