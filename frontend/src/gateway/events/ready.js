

module.exports = {
	name: 'READY',
	async execute(data, contextSetters) {
    contextSetters.setUser(data.user);
		contextSetters.setCharacters(data.characters);
	},
};