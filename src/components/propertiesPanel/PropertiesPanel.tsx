import React, { Component, ReactNode } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { MapData, MapObject } from '../../models/Map';
import RotationSelector from './controls/RotationSelector';
import InlineCharacterSheetContainer from '../../5e/components/characterSheet/InlineCharacterSheetContainer';
import { FormControlLabel, Switch, Button } from '@material-ui/core';

const wrapperStyle = {
	position: 'absolute' as 'absolute',
	right: 0,
	width: '300px',
	top: 0,
	bottom: 0,
	backgroundColor: 'rgba(0, 0, 0, 0.5)'
};

const PropertyRow = (props: any) => {
	return <div style={{ marginTop: '10px' }}>{props.children}</div>;
};

interface Props {
	visible?: boolean;
	selected: string[];
	map: MapData;
	dm: boolean; // Hide certain props
	onUpdateObject: (mapId, mapObjectId, data) => void;
	removeObject: (mapId, mapObjectId) => void;
	close: () => void;
}

interface State {
	objectId?: string;
	object?: MapObject;
	rotation?: number;
	layer?: string;
	scaleX: number;
	scaleY: number;
	isPcAsset: boolean;
	isNpcAsset: boolean;
	layers: object[];
	dmOnly: boolean;
}

export default class PropertiesPanel extends Component<Props, State> {
	state: State = {
		objectId: null,
		object: null,
		rotation: 0.0,
		layer: null,
		isPcAsset: false,
		isNpcAsset: false,
		layers: [],
		scaleX: 1.0,
		scaleY: 1.0,
		dmOnly: false
	};

	handleChange = (propName): ((e) => void) => (e): void => {
		if (e.target.value === null) {
			return; // Ignore no change to select for example
		}

		this.setState({
			[propName]: e.target.value
		} as any);
	};

	onChangeDmOnly = (e): void => {
		this.setState({ dmOnly: !!e.target.checked });
	};

	removeObject = (): void => {
		if (this.props.removeObject) {
			this.props.removeObject(this.props.map.id, this.state.objectId);
		}
	};

	saveChanges = (): void => {
		if (this.props.onUpdateObject) {
			if (!this.state.object || !this.state.objectId) {
				return;
			}

			this.props.onUpdateObject(this.props.map.id, this.state.objectId, {
				rotation: this.state.rotation,
				layer: this.state.layer,
				scale: {
					x: this.state.scaleX,
					y: this.state.scaleY
				},
				dmOnly: this.state.dmOnly
			});
		}
	};

	componentDidMount(): void {
		this.updateState(this.props);
	}

	componentDidUpdate(prevProps, prevState): void {
		if (this.props.map !== prevProps.map || this.props.selected !== prevProps.selected) {
			this.updateState(this.props);
		}
	}

	private updateState = (props: Props): void => {
		const { selected, map } = props;

		const firstSelected = selected.length > 0 ? selected[0] : null;
		const objectId = firstSelected;
		const object =
			objectId && map.objects.hasOwnProperty(objectId)
				? (map.objects[objectId] as MapObject)
				: null;

		const isPcAsset = object ? !!object.pcId : false;
		const isNpcAsset = object ? !!object.npcId : false;

		// Layers
		const layersArr =
			map && map.layers
				? Object.keys(map.layers).map(x => ({ ...map.layers[x], id: x }))
				: [];

		this.setState({
			objectId,
			object,
			rotation: object ? object.rotation : 0.0,
			layer: object ? object.layer : null,
			isPcAsset,
			isNpcAsset,
			layers: layersArr,
			scaleX: object ? object.scale.x : 1.0,
			scaleY: object ? object.scale.y : 1.0,
			dmOnly: object ? object.dmOnly || false : false
		});
	};

	render(): ReactNode {
		const { visible, dm } = this.props;

		const { object, rotation, layers, scaleX, scaleY } = this.state;

		if (!visible) {
			return <div />;
		}

		if (!object) {
			return <div />;
		}

		return (
			<div
				style={{
					backgroundColor: '#222',
					width: '400px',
					height: '100%',
					position: 'absolute',
					top: 0,
					left: 0,
					overflow: 'hidden scroll'
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					{object.npcId && (
						<InlineCharacterSheetContainer characterSheetId={object.npcId} />
					)}
					<PropertyRow>
						Rotation
						<input
							type="number"
							value={rotation}
							onChange={this.handleChange('rotation')}
						/>
						<RotationSelector
							diameter={64}
							style={{
								marginLeft: 'auto',
								marginRight: 'auto'
							}}
							initialRotationRad={rotation}
							rotationChanged={(rotDeg, rotRad) => {
								this.setState({
									rotation: rotRad
								});
							}}
						/>
					</PropertyRow>
					{dm && (
						<PropertyRow>
							Layer = {object.layer}
							<select value={object.layer} onChange={this.handleChange('layer')}>
								<option value={null}>---</option>
								{layers.map((x: any) => (
									<option key={x.id} value={x.id}>
										{x.id} ({x.zIndex})
									</option>
								))}
							</select>
						</PropertyRow>
					)}

					{!this.state.isNpcAsset && !this.state.isPcAsset && (
						<div>
							<PropertyRow>
								<span style={{ marginRight: 5 }}>Scale X</span>
								<input
									type="number"
									value={scaleX}
									onChange={this.handleChange('scaleX')}
								/>
							</PropertyRow>
							<PropertyRow>
								<span style={{ marginRight: 5 }}>Scale Y</span>
								<input
									type="number"
									value={scaleY}
									onChange={this.handleChange('scaleY')}
								/>
							</PropertyRow>
						</div>
					)}

					{dm && (
						<PropertyRow>
							<FormControlLabel
								control={
									<Switch
										checked={this.state.dmOnly}
										onChange={this.onChangeDmOnly}
									/>
								}
								label="DM Only"
							/>
						</PropertyRow>
					)}

					<Button
						fullWidth
						color="primary"
						variant="contained"
						onClick={this.saveChanges}
						style={{
							marginTop: '15px'
						}}
					>
						Save
						<SaveIcon />
					</Button>

					<Button
						fullWidth
						color="secondary"
						variant="contained"
						onClick={this.removeObject}
						style={{ marginTop: '15px' }}
					>
						Remove Object
						<DeleteIcon />
					</Button>
				</div>
				<div
					style={{
						padding: 2,
						backgroundColor: 'red',
						textAlign: 'center',
						top: 0,
						right: 0,
						position: 'absolute',
						width: 24,
						height: 24,
						cursor: 'pointer'
					}}
					onClick={() => this.props.close()}
				>
					<span style={{}}>
						<CloseIcon />
					</span>
				</div>
			</div>
		);
	}
}
