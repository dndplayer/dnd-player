import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import GeneralPanel from './GeneralPanel';
import { NonPlayerCharacter } from '../../../../5e/models/Character';
import {
	updateNonPlayerCharacter,
	saveNewNonPlayerCharacter
} from '../../../../redux/actions/assets';
import { MapData } from '../../../../models/Map';
import { setActiveMap } from '../../../../redux/actions/globalState';
import { mapsUpdateBackgroundColour } from '../../../../redux/actions/maps';
import { getCurrentMapBackgroundColour } from '../../../../redux/selectors/maps';
import { setDm } from '../../../../redux/actions/auth';

interface StateProps {
	dm: boolean;
	canBeDm: boolean;
	nonPlayerCharacters: NonPlayerCharacter[];
}
interface DispatchProps {
	setDm: (val: boolean) => void;
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) => void;
	saveNewNonPlayerCharacter: (character: NonPlayerCharacter) => void;
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
				updateNonPlayerCharacter={this.props.updateNonPlayerCharacter}
				saveNewNonPlayerCharacter={this.props.saveNewNonPlayerCharacter}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	dm: state.auth.dm,
	canBeDm: state.auth.canBeDm,
	nonPlayerCharacters: state.assets.nonPlayerCharacters
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	setDm: (val: boolean) => dispatch(setDm(val)),
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) =>
		dispatch(updateNonPlayerCharacter(characterId, character)),
	saveNewNonPlayerCharacter: (character: NonPlayerCharacter) =>
		dispatch(saveNewNonPlayerCharacter(character))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(GeneralPanelContainer);
