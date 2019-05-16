import { Action } from 'redux';

export enum Keys {
	SHIFT
}

export const types = {
	KEYS: {
		DOWN: {
			SHIFT: 'KEYS.DOWN.SHIFT'
		},
		UP: {
			SHIFT: 'KEYS.UP.SHIFT'
		}
	}
};

export interface KeyDownShiftAction extends Action {
	key: Keys;
}

export interface KeyUpShiftAction extends Action {
	key: Keys;
}

//------------------------------------------------------------------------

export const keyDownShiftAction = (): KeyDownShiftAction => ({
	type: types.KEYS.DOWN.SHIFT,
	key: Keys.SHIFT
});

export const keyUpShiftAction = (): KeyUpShiftAction => ({
	type: types.KEYS.UP.SHIFT,
	key: Keys.SHIFT
});
