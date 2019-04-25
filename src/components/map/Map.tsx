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

	onDragStart = (e: PIXI.interaction.InteractionEvent): void => {
		const inst = e.currentTarget;
		inst.alpha = 0.5;
		(inst as any).dragging = true;
		(inst as any).data = e.data;
	};

	onDragEnd = (e: PIXI.interaction.InteractionEvent): void => {
		const inst = e.currentTarget;
		inst.alpha = 1.0;
		(inst as any).dragging = false;
		(inst as any).data = null;
	};

	onDragMove = (e: PIXI.interaction.InteractionEvent): void => {
		const inst = e.currentTarget;
		if ((inst as any).dragging) {
			const newPos = (inst as any).data.getLocalPosition(e.currentTarget.parent);
			inst.x = newPos.x;
			inst.y = newPos.y;
		}
	};

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
