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
		CLEAR: 'INITIATIVE.CLEAR',
		REMOVE: 'INITIATIVE.REMOVE',
		UPDATE: {
			ROLL: 'INITIATIVE.UPDATE.ROLL'
		}
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

export interface InitiativeRemoveAction extends Action {
	id: string;
}

export interface InitiativeClearAction extends Action {}

export interface InitiativeUpdateRollAction extends Action {
	initiativeId: string;
	newRoll: number;
}

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

export const removeInitiative = (id: string): InitiativeRemoveAction => ({
	type: types.INITIATIVE.REMOVE,
	id
});

export const clearInitiatives = (): InitiativeClearAction => ({
	type: types.INITIATIVE.CLEAR
});

export const updateInitiativeRoll = (
	initiativeId: string,
	newRoll: number
): InitiativeUpdateRollAction => ({
	type: types.INITIATIVE.UPDATE.ROLL,
	initiativeId,
	newRoll
});
