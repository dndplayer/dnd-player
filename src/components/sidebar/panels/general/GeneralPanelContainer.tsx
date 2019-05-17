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
	backgroundColour?: string;
	nonPlayerCharacters: NonPlayerCharacter[];
	maps: MapData[];
	activeMapId: string;
}
interface DispatchProps {
	setActiveMap: (mapId: string) => void;
	updateStageBackground: (mapId: string, colour: string) => void;
	setDm: (val: boolean) => void;
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) => void;
	saveNewNonPlayerCharacter: (character: NonPlayerCharacter) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class GeneralPanelContainer extends Component<Props> {
	render(): ReactNode {
		const {
			backgroundColour,
			updateStageBackground,
			dm,
			canBeDm,
			setDm,
			maps,
			setActiveMap,
			activeMapId
		} = this.props;

		const settings = JSON.parse(localStorage.getItem('firebaseConfig'));
		const roomUrl =
			document.location + `?projectId=${settings.projectId}&apiKey=${settings.apiKey}`;

		return (
			<GeneralPanel
				maps={maps}
				activeMapId={activeMapId}
				setActiveMap={setActiveMap}
				dm={dm}
				canBeDm={canBeDm}
				setDm={setDm}
				stageBackground={backgroundColour}
				updateStageBackground={updateStageBackground}
				roomUrl={roomUrl}
				nonPlayerCharacters={this.props.nonPlayerCharacters}
				updateNonPlayerCharacter={this.props.updateNonPlayerCharacter}
				saveNewNonPlayerCharacter={this.props.saveNewNonPlayerCharacter}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	backgroundColour: getCurrentMapBackgroundColour(state),
	dm: state.auth.dm,
	canBeDm: state.auth.canBeDm,
	nonPlayerCharacters: state.assets.nonPlayerCharacters,
	maps: state.maps.maps,
	activeMapId: state.globalState.state.activeMapId
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	updateStageBackground: (mapId: string, colour: string) =>
		dispatch(mapsUpdateBackgroundColour(mapId, colour)),
	setDm: (val: boolean) => dispatch(setDm(val)),
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) =>
		dispatch(updateNonPlayerCharacter(characterId, character)),
	saveNewNonPlayerCharacter: (character: NonPlayerCharacter) =>
		dispatch(saveNewNonPlayerCharacter(character)),
	setActiveMap: (mapId: string) => dispatch(setActiveMap(mapId))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(GeneralPanelContainer);
