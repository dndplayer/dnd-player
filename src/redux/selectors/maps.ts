import { createSelector } from 'reselect';

const mapsSelector = state => state.maps.maps;
const activeMapId = state => (state.globalState.state ? state.globalState.state.activeMapId : null);

export const getCurrentMap = createSelector(
	mapsSelector,
	activeMapId,
	(maps, activeMapId) => (!maps || !activeMapId ? null : maps.find(x => x.id === activeMapId))
);

export const getCurrentMapBackgroundColour = createSelector(
	getCurrentMap,
	map => (!map ? null : map.backgroundColour)
);
