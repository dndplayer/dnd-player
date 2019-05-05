import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Settings from './Settings';
import { logout } from '../../redux/actions/auth';
import { NonPlayerCharacter } from '../../5e/models/Character';
import { updateNonPlayerCharacter, saveNewNonPlayerCharacter } from '../../redux/actions/assets';
import { NonPlayerCharacterData } from '../../models/Asset';

interface StateProps {
	loggedIn: boolean;
	nonPlayerCharacters: NonPlayerCharacter[];
}
interface DispatchProps {
	logout: () => void;
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) => void;
	saveNewNonPlayerCharacter: (character: NonPlayerCharacter) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class SettingsContainer extends Component<Props> {
	render(): ReactNode {
		return (
			<Settings
				loggedIn={this.props.loggedIn}
				logout={this.props.logout}
				nonPlayerCharacters={this.props.nonPlayerCharacters}
				updateNonPlayerCharacter={this.props.updateNonPlayerCharacter}
				saveNewNonPlayerCharacter={this.props.saveNewNonPlayerCharacter}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	loggedIn: state.auth.loggedIn,
	nonPlayerCharacters: state.assets.nonPlayerCharacters
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	logout: () => dispatch(logout()),
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacterData) =>
		dispatch(updateNonPlayerCharacter(characterId, character)),
	saveNewNonPlayerCharacter: (character: NonPlayerCharacterData) =>
		dispatch(saveNewNonPlayerCharacter(character))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(SettingsContainer);
