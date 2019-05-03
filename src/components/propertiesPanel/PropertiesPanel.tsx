import React, { Component, ReactNode } from 'react';
import { MapData, MapObject } from '../../models/Map';

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
			<div style={wrapperStyle}>
				<div>
					<h1>Properties</h1>
					<h2>
						<input type="text" value={name} onChange={this.handleChange('name')} />
					</h2>
					<ul>
						<li>
							Position = ({object.position.x}, {object.position.y})
						</li>
						<li>Rotation</li>
						<input
							type="number"
							value={rotation}
							onChange={this.handleChange('rotation')}
						/>
						<li>Layer = {object.layer}</li>
						<select onChange={this.handleChange('layer')}>
							<option value={null}>---</option>
							{layers.map(x => (
								<option key={x.id} value={x.id}>
									{x.id} ({x.zIndex})
								</option>
							))}
						</select>

						<li>Scale X</li>
						<input
							type="number"
							value={scaleX}
							onChange={this.handleChange('scaleX')}
						/>

						<li>Scale Y</li>
						<input
							type="number"
							value={scaleY}
							onChange={this.handleChange('scaleY')}
						/>
					</ul>
					<button onClick={this.saveChanges}>Save</button>
				</div>
			</div>
		);
	}
}
