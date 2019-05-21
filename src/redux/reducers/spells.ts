import { types } from '../actions/spells';
import { CharacterSpell } from '../../5e/models/Character';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface SpellsState {
	spells: CharacterSpell[];
	syncError?: string;
	filter: string;
	lastUpdate: string;
}

export const initialState: SpellsState = {
	spells: [],
	syncError: null,
	filter: '',
	lastUpdate: null
};

function assetsReducer(state = initialState, action: any = {}): SpellsState {
	switch (action.type) {
		case types.SPELLS.FILTER.TEXT_CHANGE:
			return {
				...state,
				filter: action.text
			};
		case types.SPELLS.SYNC:
			return {
				...state,
				spells: action.spells
			};
		case types.SPELLS.SYNC_FAILED:
			return {
				...state,
				syncError: action.error
			};
		case types.SPELLS.LAST_UPDATE.SYNC:
			return {
				...state,
				lastUpdate: action.lastUpdate
			};
		default:
			return state;
	}
}

const persistConfig = {
	key: 'spells',
	storage
};
export default persistReducer(persistConfig, assetsReducer);
