export const character_delete = {
	name: 'DELETE_CHARACTER',
	async execute(data, contextSetters) {
		contextSetters.setCharacters(prevCharacters => {
      delete prevCharacters[data.id];
			return {...prevCharacters};
		});
	},
};