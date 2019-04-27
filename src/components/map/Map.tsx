import React, { Component, ReactNode, ReactElement } from 'react';
import { Stage, Sprite, Container, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import Viewport from 'pixi-viewport';

import { MapData } from '../../models/Map';
import DraggableSprite from './objects/DraggableSprite';

import { DropTarget } from 'react-dnd';
import types from '../../constants/dragdroptypes';

import TESTDATA from './testMap.json';
import { PlayerCharacterData, NonPlayerCharacterData } from '../../models/Asset';

const ViewportComponent = PixiComponent('Viewport', {
	create: props => {
		const v = new Viewport({
			screenWidth: window.innerWidth * 0.75,
			screenHeight: window.innerHeight,
			worldWidth: 1000,
			worldHeight: 1000

			// !TODO: This line is important and needed BUT we don't have app here!
			//interaction: app.renderer.plugins.interaction
		});

		v.drag({
			mouseButtons: 'right'
		})
			.pinch()
			.wheel()
			.decelerate();

		return v;
	}
});

interface CollectProps {
	connectDropTarget: any;
}

interface OwnProps {
	updateSpriteLocation: (sprite: Sprite) => void;
	mapData?: MapData;
	zoom?: number;
	testMap: any;
	playerCharacters: PlayerCharacterData[];
	nonPlayerCharacters: NonPlayerCharacterData[];
	onUpdateObject: (data) => void;
	onAddAssetToMap: (data) => void;
}

type Props = CollectProps & OwnProps;

interface State {}
class Map extends Component<Props, State> {
	state = {
		x: 300,
		y: 300,
		alpha: 1.0,
		dragging: false,
		data: null
	};

	private sprite: any;
	private app: any;
	private root: PIXI.Container;

	render(): ReactNode {
		const { playerCharacters, nonPlayerCharacters } = this.props;

		if (!this.props.testMap) {
			return <div>No Map</div>;
		}
		const { background, tokens } = this.props.testMap.layers;

		const { connectDropTarget } = this.props;

		// TODO: A-lot of the code below repeats for each layer, it's not very DRY.
		//       Creating a custom LayerContainer element would help encapsulate that
		//       logic.

		return connectDropTarget(
			<div>
				<Stage
					// onMount={this.onMapMount}
					width={window.innerWidth * 0.75}
					height={window.innerHeight}
				>
					<ViewportComponent>
						<Container name="layer-background">
							{Object.keys(background.children).map(
								(mapObjId): ReactElement => {
									const o = background.children[mapObjId];
									const pcAsset = o.pcId
										? playerCharacters.find(x => x.id === o.pcId)
										: null;
									const npcAsset = o.npcId
										? nonPlayerCharacters.find(x => x.id === o.npcId)
										: null;
									const imageUrl =
										pcAsset && pcAsset.imageUrl
											? pcAsset.imageUrl
											: npcAsset && npcAsset.imageUrl
											? npcAsset.imageUrl
											: o.imageUrl || 'http://placekitten.com/128/128';
									return (
										<DraggableSprite
											key={mapObjId}
											position={o.position}
											scale={o.scale}
											rotation={o.rotation}
											pivot={o.pivot}
											anchor={o.anchor}
											image={imageUrl}
											onUpdateObject={this.props.onUpdateObject}
											mapObjectId={mapObjId}
											layerName="background"
										/>
									);
								}
							)}
						</Container>
						<Container name="layer-tokens">
							{Object.keys(tokens.children).map(
								(mapObjId): ReactElement => {
									const o = tokens.children[mapObjId];
									const pcAsset = o.pcId
										? playerCharacters.find(x => x.id === o.pcId)
										: null;
									const npcAsset = o.npcId
										? nonPlayerCharacters.find(x => x.id === o.npcId)
										: null;
									const imageUrl =
										pcAsset && pcAsset.imageUrl
											? pcAsset.imageUrl
											: npcAsset && npcAsset.imageUrl
											? npcAsset.imageUrl
											: o.imageUrl || 'http://placekitten.com/128/128';
									return (
										<DraggableSprite
											key={mapObjId}
											position={o.position}
											scale={o.scale}
											rotation={o.rotation}
											pivot={o.pivot}
											anchor={o.anchor}
											image={imageUrl}
											onUpdateObject={this.props.onUpdateObject}
											mapObjectId={mapObjId}
											layerName="tokens"
										/>
									);
								}
							)}
						</Container>
					</ViewportComponent>
				</Stage>
			</div>
		);
	}
}

const mapTargetSpec = {
	canDrop(props, monitor) {
		return true;
	},
	hover(props, monitor, component) {},
	drop(props, monitor, component) {
		const item = monitor.getItem();
		console.log(`dropped [DROPPER]:`);
		console.log(item);
		// TODO: Send Action

		if (props.onAddAssetToMap) {
			props.onAddAssetToMap({ assetType: item.assetType, assetId: item.id });
		}
	}
};

function collect(connect, monitor): CollectProps {
	return {
		connectDropTarget: connect.dropTarget()
	};
}

export default DropTarget(types.PLAYER_CHARACTER_ASSET, mapTargetSpec, collect)(Map);
