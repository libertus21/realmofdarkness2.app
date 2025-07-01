"use strict";
require(`${process.cwd()}/alias`);
const { Events } = require("discord.js");
const API = require("@api");

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(member) {
    try {
      console.log(`Nuevo miembro se unió: ${member.user.tag} en ${member.guild.name}`);
      await API.updateUser(member, true);
    } catch (error) {
      console.error(`Error sincronizando nuevo miembro ${member.user.tag} en ${member.guild.name}:`, error.message);
    }
  },
}; 