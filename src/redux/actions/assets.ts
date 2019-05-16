/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';
import { createAction } from '../actionHelper';
import { ActionsUnion } from '../types';

export const ASSETS_OPEN_SHEET = 'ASSETS.OPEN_SHEET';
export const ASSETS_PLAYERCHARACTER_SYNC = 'ASSETS.PLAYERCHARACTER.SYNC';
export const ASSETS_PLAYERCHARACTER_SYNC_FAILED = 'ASSETS.PLAYERCHARACTER.SYNC_FAILED';
export const ASSETS_PLAYERCHARACTER_UPDATE = 'ASSETS.PLAYERCHARACTER.UPDATE';
export const ASSETS_PLAYERCHARACTER_NEW_SAVE = 'ASSETS.PLAYERCHARACTER.NEW.SAVE';

export const ASSETS_NONPLAYERCHARACTER_FILTER_TEXT_CHANGE =
	'ASSETS.NONPLAYERCHARACTER.FILTER.TEXT_CHANGE';
export const ASSETS_NONPLAYERCHARACTER_LAST_UPDATE_SYNC =
	'ASSETS.NONPLAYERCHARACTER.LAST_UPDATE.SYNC';
export const ASSETS_NONPLAYERCHARACTER_SYNC = 'ASSETS.NONPLAYERCHARACTER.SYNC';
export const ASSETS_NONPLAYERCHARACTER_SYNC_FAILED = 'ASSETS.NONPLAYERCHARACTER.SYNC_FAILED';
export const ASSETS_NONPLAYERCHARACTER_UPDATE = 'ASSETS.NONPLAYERCHARACTER.UPDATE';
export const ASSETS_NONPLAYERCHARACTER_NEW_SAVE = 'ASSETS.NONPLAYERCHARACTER.NEW.SAVE';

export const Actions = {
	openCharacterSheet: (characterId: string) => createAction(ASSETS_OPEN_SHEET, characterId),
	syncPlayerCharacters: (playerCharacters: PlayerCharacter[]) =>
		createAction(ASSETS_PLAYERCHARACTER_SYNC, playerCharacters),
	syncPlayerCharactersFailed: (error: Error) =>
		createAction(ASSETS_PLAYERCHARACTER_SYNC_FAILED, error),
	updatePlayerCharacter: (characterId: string, character: PlayerCharacter) =>
		createAction(ASSETS_PLAYERCHARACTER_UPDATE, {
			characterId,
			character
		}),
	saveNewPlayerCharacter: (playerCharacterData: PlayerCharacter) =>
		createAction(ASSETS_PLAYERCHARACTER_NEW_SAVE, playerCharacterData),
	syncNonPlayerCharacters: (nonPlayerCharacters: NonPlayerCharacter[]) =>
		createAction(ASSETS_NONPLAYERCHARACTER_SYNC, nonPlayerCharacters),
	syncNonPlayerCharactersFailed: (error: Error) =>
		createAction(ASSETS_NONPLAYERCHARACTER_SYNC_FAILED, error),
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) =>
		createAction(ASSETS_NONPLAYERCHARACTER_UPDATE, {
			characterId,
			character
		}),
	saveNewNonPlayerCharacter: (nonPlayerCharacterData: NonPlayerCharacter) =>
		createAction(ASSETS_NONPLAYERCHARACTER_NEW_SAVE, nonPlayerCharacterData),
	changeNonPlayerCharacterFilterText: (text: string) =>
		createAction(ASSETS_NONPLAYERCHARACTER_FILTER_TEXT_CHANGE, text),
	syncNonPlayerCharacterLastUpdate: (lastUpdate: number) =>
		createAction(ASSETS_NONPLAYERCHARACTER_LAST_UPDATE_SYNC, lastUpdate)
};

export type Actions = ActionsUnion<typeof Actions>;
