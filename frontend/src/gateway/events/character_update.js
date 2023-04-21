export const character_update = {
	name: 'UPDATE_CHARACTER',
	async execute(data, contextSetters) {
		contextSetters.setCharacters(prevCharacters => {
			return {...prevCharacters, [data.id]: data.character};
		});
	},
};