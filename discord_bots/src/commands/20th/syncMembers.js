"use strict";
require(`${process.cwd()}/alias`);
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const syncGuildMembers = require("@modules/syncGuildMembers");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("syncmembers")
    .setDescription("Sincroniza todos los miembros del servidor con la base de datos")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: true });
      
      const guild = interaction.guild;
      console.log(`Iniciando sincronización manual de miembros para: ${guild.name} (${guild.id})`);
      
      // Función para reportar progreso
      const progressCallback = async (progress) => {
        if (progress.current % 10 === 0 || progress.current === progress.total) {
          await interaction.editReply({
            content: `🔄 Sincronizando ${progress.total} miembros...\nProgreso: ${progress.current}/${progress.total}\n✅ Sincronizados: ${progress.synced}\n❌ Errores: ${progress.errors}`,
            ephemeral: true
          });
        }
      };
      
      // Ejecutar sincronización
      const result = await syncGuildMembers(guild, progressCallback);
      
      // Mensaje final
      await interaction.editReply({
        content: `✅ Sincronización completada!\n\n📊 Resultados:\n• Total de miembros: ${result.totalMembers}\n• Sincronizados exitosamente: ${result.syncedCount}\n• Errores: ${result.errorCount}`,
        ephemeral: true
      });
      
      console.log(`Sincronización manual completada para ${result.syncedCount}/${result.totalMembers} miembros en ${guild.name}`);
      
    } catch (error) {
      console.error(`Error durante la sincronización manual en ${interaction.guild.name}:`, error.message);
      await interaction.editReply({
        content: `❌ Error durante la sincronización: ${error.message}`,
        ephemeral: true
      });
    }
  },
}; 