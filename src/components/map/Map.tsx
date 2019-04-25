import React, { Component, ReactNode, ReactElement } from 'react';
import { Stage, Sprite, Container, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import Viewport from 'pixi-viewport';

import { MapData } from '../../models/Map';
import DraggableSprite from './objects/DraggableSprite';

import TESTDATA from './testMap.json';

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

interface Props {
	updateSpriteLocation: (sprite: Sprite) => void;
	mapData?: MapData;
	zoom?: number;
	testMap: any;
	onUpdatePosition: (data) => void;
}

interface State {}
export default class Map extends Component<Props, State> {
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
		// const { background, tokens } = TESTDATA.layers;

		if (!this.props.testMap) {
			return <div>No Map</div>;
		}
		const { background, tokens } = this.props.testMap.layers;

		return (
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
									return (
										<DraggableSprite
											key={mapObjId}
											position={o.position}
											scale={o.scale}
											rotation={o.rotation}
											pivot={o.pivot}
											anchor={o.anchor}
											image={o.imageUrl}
											onUpdatePosition={this.props.onUpdatePosition}
											mapObjectId={mapObjId}
											layerName="background"
											// onUpdateScale={}
											// onUpdateRotation={}
											// onUpdateAnchor={}
											// onUpdatePivot={}
										/>
									);
								}
							)}
						</Container>
						<Container name="layer-tokens">
							{Object.keys(tokens.children).map(
								(mapObjId): ReactElement => {
									const o = tokens.children[mapObjId];
									return (
										<DraggableSprite
											key={mapObjId}
											position={o.position}
											scale={o.scale}
											rotation={o.rotation}
											pivot={o.pivot}
											anchor={o.anchor}
											image={o.imageUrl}
											onUpdatePosition={this.props.onUpdatePosition}
											mapObjectId={mapObjId}
											layerName="tokens"
											// onUpdatePosition={}
											// onUpdateScale={}
											// onUpdateRotation={}
											// onUpdateAnchor={}
											// onUpdatePivot={}
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
