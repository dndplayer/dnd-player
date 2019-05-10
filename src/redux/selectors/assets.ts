import { createSelector } from 'reselect';

const npcIndex = state => state.assets.nonPlayerCharactersIndex;
const npcFilter = state => state.assets.nonPlayerCharacterFilter;

export const getFilteredNpcs = createSelector(
	npcIndex,
	npcFilter,
	(npcIndex, npcFilter) =>
		!npcIndex
			? npcIndex
			: []
					.concat(npcIndex)
					.filter(x => x.name.toLowerCase().indexOf(npcFilter) > -1)
					.sort((x, y) => x.name.localeCompare(y.name))
);
