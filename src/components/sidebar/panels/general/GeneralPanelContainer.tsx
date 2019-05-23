import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import GeneralPanel from './GeneralPanel';
import { NonPlayerCharacter, CharacterSpell } from '../../../../5e/models/Character';
import {
	updateNonPlayerCharacter,
	saveNewNonPlayerCharacter
} from '../../../../redux/actions/assets';
import { setDm, logout } from '../../../../redux/actions/auth';
import { updateSpell, saveNewSpell } from '../../../../redux/actions/spells';

interface StateProps {
	dm: boolean;
	canBeDm: boolean;
	nonPlayerCharacters: NonPlayerCharacter[];
	spells: CharacterSpell[];
}
interface DispatchProps {
	setDm: (val: boolean) => void;
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) => void;
	saveNewNonPlayerCharacter: (character: NonPlayerCharacter) => void;
	updateSpell: (spellId: string, spell: CharacterSpell) => void;
	saveNewSpell: (spell: CharacterSpell) => void;
	logout: () => void;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class GeneralPanelContainer extends Component<Props> {
	render(): ReactNode {
		const { dm, canBeDm, setDm } = this.props;

		const settings = JSON.parse(localStorage.getItem('firebaseConfig'));
		const roomUrl =
			document.location + `?projectId=${settings.projectId}&apiKey=${settings.apiKey}`;

		return (
			<GeneralPanel
				dm={dm}
				canBeDm={canBeDm}
				setDm={setDm}
				roomUrl={roomUrl}
				nonPlayerCharacters={this.props.nonPlayerCharacters}
				spells={this.props.spells}
				updateNonPlayerCharacter={this.props.updateNonPlayerCharacter}
				saveNewNonPlayerCharacter={this.props.saveNewNonPlayerCharacter}
				updateSpell={this.props.updateSpell}
				saveNewSpell={this.props.saveNewSpell}
				logout={this.props.logout}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	dm: state.auth.dm,
	canBeDm: state.auth.canBeDm,
	nonPlayerCharacters: state.assets.nonPlayerCharacters,
	spells: state.spells.spells
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	setDm: (val: boolean) => dispatch(setDm(val)),
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) =>
		dispatch(updateNonPlayerCharacter(characterId, character)),
	saveNewNonPlayerCharacter: (character: NonPlayerCharacter) =>
		dispatch(saveNewNonPlayerCharacter(character)),
	updateSpell: (spellId: string, spell: CharacterSpell) => dispatch(updateSpell(spellId, spell)),
	saveNewSpell: (spell: CharacterSpell) => dispatch(saveNewSpell(spell)),
	logout: () => dispatch(logout())
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(GeneralPanelContainer);
