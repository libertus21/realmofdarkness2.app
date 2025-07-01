"use strict";
require(`${process.cwd()}/alias`);
const API = require("@api");

// Sincroniza todos los miembros de un servidor con la base de datos
module.exports = async function syncGuildMembers(guild, progressCallback = null) {
  try {
    console.log(`Iniciando sincronización de miembros para: ${guild.name} (${guild.id})`);
    
    // Obtener todos los miembros del servidor
    const members = await guild.members.fetch();
    let syncedCount = 0;
    let errorCount = 0;
    const errors = [];
    
    // Sincronizar cada miembro
    for (const [index, [memberId, member]] of members.entries()) {
      try {
        await API.updateUser(member, true);
        syncedCount++;
        
        // Reportar progreso si se proporciona callback
        if (progressCallback && typeof progressCallback === 'function') {
          progressCallback({
            current: index + 1,
            total: members.size,
            synced: syncedCount,
            errors: errorCount
          });
        }
        
        // Pequeña pausa para evitar rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        errorCount++;
        const errorInfo = {
          memberId,
          memberName: member.user.tag,
          error: error.message
        };
        errors.push(errorInfo);
        console.error(`Error sincronizando miembro ${memberId} en ${guild.name}:`, error.message);
      }
    }
    
    const result = {
      guildId: guild.id,
      guildName: guild.name,
      totalMembers: members.size,
      syncedCount,
      errorCount,
      errors,
      success: errorCount === 0
    };
    
    console.log(`Sincronización completada para ${syncedCount}/${members.size} miembros en ${guild.name}`);
    return result;
    
  } catch (error) {
    console.error(`Error durante la sincronización de miembros en ${guild.name}:`, error.message);
    throw error;
  }
}; 