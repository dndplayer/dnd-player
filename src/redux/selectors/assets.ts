import { createSelector } from 'reselect';

const npcs = state => state.assets.nonPlayerCharacters;
const npcFilter = state => state.assets.nonPlayerCharacterFilter;

export const getFilteredNpcs = createSelector(
	npcs,
	npcFilter,
	(npcs, npcFilter) =>
		!npcs
			? npcs
			: []
					.concat(npcs)
					.filter(x => x.name.toLowerCase().indexOf(npcFilter) > -1)
					.sort((x, y) => x.name.localeCompare(y.name))
);
