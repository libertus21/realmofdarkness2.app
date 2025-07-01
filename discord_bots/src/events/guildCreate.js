"use strict";
require(`${process.cwd()}/alias`);
const { Events } = require("discord.js");
const setActivity = require("@modules/setActivity");
const API = require("@api");
const syncGuildMembers = require("@modules/syncGuildMembers");

module.exports = {
  name: Events.GuildCreate,
  once: false,
  async execute(guild) {
    await setActivity(guild.client);
    await API.updateGuild(guild);
    
    // Sincronizar miembros existentes cuando el bot se une al servidor
    try {
      await syncGuildMembers(guild);
    } catch (error) {
      console.error(`Error durante la sincronización de miembros en ${guild.name}:`, error.message);
    }
  },
};
