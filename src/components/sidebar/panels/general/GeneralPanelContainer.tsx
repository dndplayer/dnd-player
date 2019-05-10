import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import GeneralPanel from './GeneralPanel';
import { setIsDm } from '../../../../redux/actions/auth';
import { NonPlayerCharacter } from '../../../../5e/models/Character';
import {
	updateNonPlayerCharacter,
	saveNewNonPlayerCharacter
} from '../../../../redux/actions/assets';
import { MapData } from '../../../../models/Map';
import { setActiveMap } from '../../../../redux/actions/globalState';
import { getCurrentMap, mapsUpdateBackgroundColour } from '../../../../redux/actions/maps';

interface StateProps {
	isDm: boolean;
	backgroundColour?: string;
	nonPlayerCharacters: NonPlayerCharacter[];
	maps: MapData[];
	activeMapId: string;
}
interface DispatchProps {
	setActiveMap: (mapId: string) => void;
	updateStageBackground: (mapId: string, colour: string) => void;
	setIsDm: (val: boolean) => void;
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
			isDm,
			setIsDm,
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
				isDm={isDm}
				setIsDm={setIsDm}
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
	backgroundColour: getCurrentMap(state).backgroundColour,
	isDm: state.auth.isDm,
	nonPlayerCharacters: state.assets.nonPlayerCharacters,
	maps: state.maps.maps,
	activeMapId: state.globalState.state.activeMapId
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	updateStageBackground: (mapId: string, colour: string) =>
		dispatch(mapsUpdateBackgroundColour(mapId, colour)),
	setIsDm: (val: boolean) => dispatch(setIsDm(val)),
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
