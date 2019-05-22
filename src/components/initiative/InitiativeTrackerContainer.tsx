import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import InitiativeTracker from './InitiativeTracker';

import { GetDefaultTestData } from './TestData';
import { orderInitiatives } from './InitiativeHelpers';
import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';
import { AppState } from '../../redux/reducers';
import { Upload } from '../../models/Upload';
import { setCurrentTurn, clearInitiatives, removeInitiative } from '../../redux/actions/initiative';
import { InitiativeData, InitiativeRoller } from '../../models/Initiative';
import { getCurrentInitiativeTurn } from '../../redux/selectors/initiative';
import { updatePlayerCharacter, updateNonPlayerCharacter } from '../../redux/actions/assets';
import { string } from 'prop-types';

interface StateProps {
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	images: Upload[];
	initiatives: InitiativeData;
	currentTurnId: string;
	isDm: boolean;
	initiativeTrackerOpen: boolean;
}
interface DispatchProps {
	setCurrentTurn: (id: string) => void;
	removeInitiative: (id: string) => void;
	clearInitiatives: () => void;
	updatePlayerCharacter: (id: string, data: PlayerCharacter) => void;
	updateNonPlayerCharacter: (id: string, data: NonPlayerCharacter) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

interface State {}

class InitiativeTrackerContainer extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.nextTurn = this.nextTurn.bind(this);
		this.modifyHp = this.modifyHp.bind(this);
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

		this.props.setCurrentTurn(rolls[1].id);
	}

	modifyHp(newHp: number, pcId?: string, npcId?: string): void {
		if (pcId) {
			const char = this.props.playerCharacters.find(x => x.id === pcId);
			if (char) {
				this.props.updatePlayerCharacter(pcId, { ...char, hp: newHp });
			}
		} else if (npcId) {
			const char = this.props.nonPlayerCharacters.find(x => x.id === npcId);
			if (char) {
				this.props.updateNonPlayerCharacter(npcId, { ...char, hp: newHp });
			}
		}
	}

	render(): ReactNode {
		const { currentTurnId } = this.props;

		return (
			<InitiativeTracker
				currentTurnId={currentTurnId}
				initiatives={this.props.initiatives}
				playerCharacters={this.props.playerCharacters}
				nonPlayerCharacters={this.props.nonPlayerCharacters}
				images={this.props.images}
				nextTurn={this.nextTurn}
				clearInitiatives={this.props.clearInitiatives}
				modifyHp={this.modifyHp}
				dm={this.props.isDm}
				initiativeTrackerOpen={this.props.initiativeTrackerOpen}
				removeInitiative={this.props.removeInitiative}
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
	initiativeTrackerOpen: state.ui.initiativeTrackerOpen
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	setCurrentTurn: id => dispatch(setCurrentTurn(id)),
	clearInitiatives: () => dispatch(clearInitiatives()),
	updatePlayerCharacter: (id: string, data: PlayerCharacter) =>
		dispatch(updatePlayerCharacter(id, data)),
	updateNonPlayerCharacter: (id: string, data: NonPlayerCharacter) =>
		dispatch(updateNonPlayerCharacter(id, data)),
	removeInitiative: (id: string) => dispatch(removeInitiative(id))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(InitiativeTrackerContainer);
