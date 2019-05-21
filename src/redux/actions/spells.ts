import { CharacterSpell } from '../../5e/models/Character';

export const types = {
	SPELLS: {
		FILTER: {
			TEXT_CHANGE: 'SPELLS.FILTER.TEXT_CHANGE'
		},
		LAST_UPDATE: {
			SYNC: 'SPELLS.LAST_UPDATE.SYNC'
		},
		SYNC: 'SPELLS.SYNC',
		SYNC_FAILED: 'SPELLS.SYNC_FAILED',
		UPDATE: 'SPELLS.UPDATE',
		NEW: {
			SAVE: 'SPELLS.NEW.SAVE'
		}
	}
};

export const syncSpells = (spells: CharacterSpell[]) => ({
	type: types.SPELLS.SYNC,
	spells
});

export const syncSpellsFailed = (error: Error) => ({
	type: types.SPELLS.SYNC_FAILED,
	error
});

export const changeSpellFilterText = (text: string) => ({
	type: types.SPELLS.FILTER.TEXT_CHANGE,
	text
});

export const updateSpell = (spellId: string, spell: CharacterSpell) => ({
	type: types.SPELLS.UPDATE,
	spellId,
	spell
});

export const saveNewSpell = (spell: CharacterSpell) => ({
	type: types.SPELLS.NEW.SAVE,
	spell
});

export const syncSpellLastUpdate = (lastUpdate: number) => ({
	type: types.SPELLS.LAST_UPDATE.SYNC,
	lastUpdate
});
