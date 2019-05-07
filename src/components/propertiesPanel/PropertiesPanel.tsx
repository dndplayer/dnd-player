import React, { Component, ReactNode } from 'react';
import { Rnd } from 'react-rnd';
import { Button, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { MapData, MapObject } from '../../models/Map';
import RotationSelector from './controls/RotationSelector';

const wrapperStyle = {
	position: 'absolute' as 'absolute',
	right: 0,
	width: '300px',
	top: 0,
	bottom: 0,
	backgroundColor: 'rgba(0, 0, 0, 0.5)'
};

interface Props {
	visible?: boolean;
	selected: string[];
	map: MapData;
	onUpdateObject: (data) => void;
	close: () => void;
}

interface State {
	objectId?: string;
	object?: MapObject;
	name?: string;
	rotation?: number;
	layer?: string;
	scaleX: number;
	scaleY: number;
	isPcAsset: boolean;
	isNpcAsset: boolean;
	layers: object[];
}

export default class PropertiesPanel extends Component<Props, State> {
	state = {
		objectId: null,
		object: null,
		name: '',
		rotation: 0.0,
		layer: null,
		isPcAsset: false,
		isNpcAsset: false,
		layers: [],
		scaleX: 1.0,
		scaleY: 1.0
	};

	handleChange = (propName): ((e) => void) => (e): void => {
		if (e.target.value === null) {
			return; // Ignore no change to select for example
		}

		this.setState({
			[propName]: e.target.value
		} as any);
	};

	saveChanges = (): void => {
		if (this.props.onUpdateObject) {
			if (!this.state.object || !this.state.objectId) {
				return;
			}

			this.props.onUpdateObject({
				mapObjectId: this.state.objectId,
				newData: {
					name: this.state.name,
					rotation: this.state.rotation,
					layer: this.state.layer,
					scale: {
						x: this.state.scaleX,
						y: this.state.scaleY
					}
				}
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
			name: object ? object.name : '',
			rotation: object ? object.rotation : 0.0,
			layer: object ? object.layer : null,
			isPcAsset,
			isNpcAsset,
			layers: layersArr,
			scaleX: object ? object.scale.x : 1.0,
			scaleY: object ? object.scale.y : 1.0
		});
	};

	render(): ReactNode {
		const { visible } = this.props;

		const { object, name, rotation, layers, scaleX, scaleY } = this.state;

		if (!visible) {
			return <div />;
		}

		if (!object) {
			return (
				<div style={wrapperStyle}>
					<h1>Nothing Selected</h1>
				</div>
			);
		}

		return (
			<Rnd
				default={{
					x: 5,
					y: 5,
					width: 250,
					height: 400
				}}
				minWidth={250}
				minHeight={400}
				dragHandleClassName="dragBar"
				bounds={'window'}
				enableResizing={{
					bottom: true,
					bottomLeft: true,
					bottomRight: true,
					left: true,
					right: false,
					top: false,
					topLeft: false,
					topRight: false
				}}
			>
				<div
					style={{
						backgroundColor: 'rgba(100, 100, 100, 0.8)',
						border: '2px solid #444',
						width: '100%',
						height: '100%',
						position: 'relative',
						padding: '5px'
					}}
				>
					<div
						className="dragBar"
						style={{
							cursor: 'grab',
							backgroundColor: '#444',
							height: '36px',
							width: 'calc(100% + 10px)', // This weird sizing causes the resize handles to be slightly offset
							margin: '-5px -5px'
						}}
					>
						<h1
							style={{
								display: 'inline-block',
								fontSize: '120%',
								textDecoration: 'underline'
							}}
						>
							Properties
						</h1>
						<div
							style={{
								padding: 2,
								backgroundColor: 'red',
								textAlign: 'center',
								// position: 'absolute' as 'absolute',
								// top: 0,
								// left: -42,
								float: 'right',
								display: 'inline-block',
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
					<div
						style={{
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						<div>
							<TextField value={name} onChange={this.handleChange('name')} />
						</div>
						<div>
							Position = ({object.position.x}, {object.position.y}) Rotation
							<input
								type="number"
								value={rotation}
								onChange={this.handleChange('rotation')}
							/>
							<RotationSelector
								diameter={64}
								initialRotationRad={rotation}
								rotationChanged={(rotDeg, rotRad) => {
									this.setState({
										rotation: rotRad
									});
								}}
							/>
						</div>
						<div>
							Layer = {object.layer}
							<select onChange={this.handleChange('layer')}>
								<option value={null}>---</option>
								{layers.map(x => (
									<option key={x.id} value={x.id}>
										{x.id} ({x.zIndex})
									</option>
								))}
							</select>
						</div>

						<div>
							<span style={{ marginRight: 5 }}>Scale X</span>
							<input
								type="number"
								value={scaleX}
								onChange={this.handleChange('scaleX')}
							/>
						</div>
						<div>
							<span style={{ marginRight: 5 }}>Scale Y</span>
							<input
								type="number"
								value={scaleY}
								onChange={this.handleChange('scaleY')}
							/>
						</div>

						<Button fullWidth variant="contained" onClick={this.saveChanges}>
							Save
							<SaveIcon />
						</Button>
					</div>
				</div>
			</Rnd>
		);
	}
}
