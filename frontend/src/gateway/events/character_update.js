export const character_update = {
	name: 'UPDATE_CHARACTER',
	async execute(data, contextSetters) {
		if (data.sheet)	contextSetters.setSheet(data.sheet);
		contextSetters.setCharacters(prevCharacters => {
			return {...prevCharacters, [data.id]: data.character};
		});
	},
};