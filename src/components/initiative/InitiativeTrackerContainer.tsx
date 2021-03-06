import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import InitiativeTracker from './InitiativeTracker';

import { orderInitiatives } from './InitiativeHelpers';
import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';
import { AppState } from '../../redux/reducers';
import { Upload } from '../../models/Upload';
import {
	setCurrentTurn,
	clearInitiatives,
	removeInitiative,
	updateInitiativeRoll
} from '../../redux/actions/initiative';
import { InitiativeData, InitiativeRoller } from '../../models/Initiative';
import { getCurrentInitiativeTurn } from '../../redux/selectors/initiative';
import { updatePlayerCharacter, updateNonPlayerCharacter } from '../../redux/actions/assets';
import { string } from 'prop-types';
import { MapData, MapObject } from '../../models/Map';
import { getCurrentMap } from '../../redux/selectors/maps';
import { mapsUpdateObject } from '../../redux/actions/maps';

interface StateProps {
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	map?: MapData;
	images: Upload[];
	initiatives: InitiativeData;
	currentTurnId: string;
	isDm: boolean;
	initiativeTrackerOpen: boolean;
	shiftPressed: boolean;
}
interface DispatchProps {
	setCurrentTurn: (id: string) => void;
	removeInitiative: (id: string) => void;
	clearInitiatives: () => void;
	updatePlayerCharacter: (id: string, data: PlayerCharacter) => void;
	updateNonPlayerCharacter: (id: string, data: NonPlayerCharacter) => void;
	updateToken: (mapId: string, tokenId: string, token: MapObject) => void;
	updateInitiativeRoll: (initiativeId: string, newVal: number) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class InitiativeTrackerContainer extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.nextTurn = this.nextTurn.bind(this);
		this.modifyHp = this.modifyHp.bind(this);
		this.modifyRoll = this.modifyRoll.bind(this);
	}

	nextTurn(): void {
		const rolls = orderInitiatives(
			this.props.initiatives,
			this.props.playerCharacters,
			this.props.nonPlayerCharacters
		);
		if (!rolls || rolls.length <= 1) {
			return;
		}

		let nextRollId = rolls[1].id;
		if (rolls.findIndex(x => x.id === this.props.currentTurnId) < 0) {
			nextRollId = rolls[0].id;
		}

		this.props.setCurrentTurn(nextRollId);
	}

	modifyHp(newHp: any, pcId?: string, npcTokenId?: string): void {
		if (pcId) {
			const char = this.props.playerCharacters.find(x => x.id === pcId);
			if (char) {
				this.props.updatePlayerCharacter(pcId, { ...char, hp: newHp.hp });
			}
		} else if (npcTokenId) {
			const token = this.props.map.objects[npcTokenId];

			this.props.updateToken(this.props.map.id, npcTokenId, {
				...token,
				hp: { value: newHp.hp, max: newHp.max || newHp.hp }
			});
		}
	}

	modifyRoll(initiativeId: string, newRoll: number): void {
		this.props.updateInitiativeRoll(initiativeId, newRoll);
	}

	render(): ReactNode {
		const { currentTurnId } = this.props;

		return (
			<InitiativeTracker
				currentTurnId={currentTurnId}
				initiatives={this.props.initiatives}
				playerCharacters={this.props.playerCharacters}
				nonPlayerCharacters={this.props.nonPlayerCharacters}
				map={this.props.map}
				images={this.props.images}
				nextTurn={this.nextTurn}
				clearInitiatives={this.props.clearInitiatives}
				modifyHp={this.modifyHp}
				modifyRoll={this.modifyRoll}
				dm={this.props.isDm}
				initiativeTrackerOpen={this.props.initiativeTrackerOpen}
				removeInitiative={this.props.removeInitiative}
				shiftPressed={this.props.shiftPressed}
			/>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => ({
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharacters: state.assets.nonPlayerCharacters,
	images: state.images.images,
	initiatives: state.initiative.rolls,
	currentTurnId: getCurrentInitiativeTurn(state),
	isDm: state.auth.dm,
	initiativeTrackerOpen: state.ui.initiativeTrackerOpen,
	map: getCurrentMap(state),
	shiftPressed: state.keys.shiftDown
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	setCurrentTurn: id => dispatch(setCurrentTurn(id)),
	clearInitiatives: () => dispatch(clearInitiatives()),
	updatePlayerCharacter: (id: string, data: PlayerCharacter) =>
		dispatch(updatePlayerCharacter(id, data)),
	updateNonPlayerCharacter: (id: string, data: NonPlayerCharacter) =>
		dispatch(updateNonPlayerCharacter(id, data)),
	removeInitiative: (id: string) => dispatch(removeInitiative(id)),
	updateToken: (mapId, tokenId, token) => dispatch(mapsUpdateObject(mapId, tokenId, token)),
	updateInitiativeRoll: (initiativeId: string, newRoll: number) =>
		dispatch(updateInitiativeRoll(initiativeId, newRoll))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(InitiativeTrackerContainer);
