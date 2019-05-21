import { Action } from 'redux';
import { InitiativeRoller, InitiativeData } from '../../models/Initiative';

export const types = {
	INITIATIVE: {
		SYNC: {
			SUCCESS: 'INITIATIVE.SYNC.SUCCESS',
			FAILURE: 'INITIATIVE.SYNC.FAILURE'
		},
		SET_CURRENT_TURN: 'INITIATIVE.SET_CURRENT_TURN',
		ADD_ROLL: 'INITIATIVE.ADD_ROLL',
		CLEAR: 'INITIATIVE.CLEAR'
	}
};

export interface InitiativeSyncSuccessAction extends Action {
	initiativeData: InitiativeData;
}

export interface InitiativeSyncFailureAction extends Action {
	error?: any;
}

export interface InitiativeAddRollAction extends Action {
	data: InitiativeRoller;
}

export interface InitiativeSetCurrentTurnAction extends Action {
	id: string;
}

export interface InitiativeClearAction extends Action {}

/////////////////////////////////////////////////////////////////////

export const syncInitiativeSuccess = (
	initiativeData: InitiativeData
): InitiativeSyncSuccessAction => ({
	type: types.INITIATIVE.SYNC.SUCCESS,
	initiativeData
});

export const syncInitiativeFailure = (error: any): InitiativeSyncFailureAction => ({
	type: types.INITIATIVE.SYNC.SUCCESS,
	error
});

export const addInitiativeRoll = (data: InitiativeRoller): InitiativeAddRollAction => ({
	type: types.INITIATIVE.ADD_ROLL,
	data
});

export const setCurrentTurn = (id: string): InitiativeSetCurrentTurnAction => ({
	type: types.INITIATIVE.SET_CURRENT_TURN,
	id
});

export const clearInitiatives = (): InitiativeClearAction => ({
	type: types.INITIATIVE.CLEAR
});
