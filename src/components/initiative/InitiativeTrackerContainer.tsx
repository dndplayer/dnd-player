import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import InitiativeTracker from './InitiativeTracker';

import { GetDefaultTestData } from './TestData';
import { orderInitiatives } from './InitiativeHelpers';
import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';
import { AppState } from '../../redux/reducers';
import { Upload } from '../../models/Upload';
import { setCurrentTurn, clearInitiatives } from '../../redux/actions/initiative';
import { InitiativeData, InitiativeRoller } from '../../models/Initiative';
import { getCurrentInitiativeTurn } from '../../redux/selectors/initiative';

interface StateProps {
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	images: Upload[];
	initiatives: InitiativeData;
	currentTurnId: string;
	isDm: boolean;
}
interface DispatchProps {
	setCurrentTurn: (id: string) => void;
	clearInitiatives: () => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

interface State {
	orderedRolls: InitiativeRoller[];
}

class InitiativeTrackerContainer extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			orderedRolls: []
		};

		this.nextTurn = this.nextTurn.bind(this);
		this.modifyHp = this.modifyHp.bind(this);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.initiatives !== prevProps.initiatives) {
			this.setState({
				orderedRolls: orderInitiatives(this.props.initiatives)
			});
		}
	}

	nextTurn(): void {
		const rolls = orderInitiatives(this.props.initiatives);
		if (!rolls || rolls.length <= 1) {
			return;
		}

		this.props.setCurrentTurn(rolls[1].id);
	}

	modifyHp(): void {
		// TODO: Do some stuff!
	}

	render(): ReactNode {
		// TODO: Eventually replace this with data from Redux

		// const initiatives = orderInitiatives(GetDefaultTestData());
		// const currentTurnId = initiatives.length > 0 ? initiatives[0].id : null;

		const { currentTurnId } = this.props;
		const { orderedRolls } = this.state;

		return (
			<InitiativeTracker
				currentTurnId={currentTurnId}
				initiatives={orderedRolls}
				playerCharacters={this.props.playerCharacters}
				nonPlayerCharacters={this.props.nonPlayerCharacters}
				images={this.props.images}
				nextTurn={this.nextTurn}
				clearInitiatives={this.props.clearInitiatives}
				modifyHp={this.modifyHp}
				dm={this.props.isDm}
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
	isDm: state.auth.dm
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	setCurrentTurn: id => dispatch(setCurrentTurn(id)),
	clearInitiatives: () => dispatch(clearInitiatives())
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(InitiativeTrackerContainer);
