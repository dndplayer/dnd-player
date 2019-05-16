import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import GeneralPanel from './GeneralPanel';
import { setDm } from '../../../../redux/actions/auth';
import { NonPlayerCharacter } from '../../../../5e/models/Character';
import { Actions } from '../../../../redux/actions/assets';
import { MapData } from '../../../../models/Map';
import { setActiveMap } from '../../../../redux/actions/globalState';
import { mapsUpdateBackgroundColour } from '../../../../redux/actions/maps';
import { getCurrentMapBackgroundColour } from '../../../../redux/selectors/maps';
import { State } from '../../../../redux/reducers';

interface StateProps {
	dm: boolean;
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

const mapStateToProps = (state: State): StateProps => ({
	backgroundColour: getCurrentMapBackgroundColour(state),
	dm: state.auth.dm,
	nonPlayerCharacters: state.assets.nonPlayerCharacters,
	maps: state.maps.maps,
	activeMapId: state.globalState.state.activeMapId
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	updateStageBackground: (mapId: string, colour: string) =>
		dispatch(mapsUpdateBackgroundColour(mapId, colour)),
	setDm: (val: boolean) => dispatch(setDm(val)),
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) =>
		dispatch(Actions.updateNonPlayerCharacter(characterId, character)),
	saveNewNonPlayerCharacter: (character: NonPlayerCharacter) =>
		dispatch(Actions.saveNewNonPlayerCharacter(character)),
	setActiveMap: (mapId: string) => dispatch(setActiveMap(mapId))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(GeneralPanelContainer);
