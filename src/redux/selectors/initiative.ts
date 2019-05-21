import { createSelector } from 'reselect';
import { AppState } from '../reducers';

const currentTurnSelector = (state: AppState) =>
	state.initiative.rolls ? state.initiative.rolls.currentTurn : null;

export const getCurrentInitiativeTurn = createSelector(
	currentTurnSelector,
	(currentTurnId?: string) => currentTurnId
);
