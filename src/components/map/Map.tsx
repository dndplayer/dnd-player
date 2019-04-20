import React, { Component, ReactNode } from 'react';
import { Stage, Sprite, Text } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

import testImg from './test.png';
import { MapData } from '../../models/Map';
import DraggableSprite from './DraggableSprite';

/**
 * TODO:
 *      This class is really just a proof of concept at the moment
 * as a-lot is hard-coded.
 *
 * [ ] - Change to load sprites from the redux store
 * [ ] - On Drag Move update the local redux store only
 * [ ] - On Drag End update the Firestore with the new position
 * [ ] - Load Sprite images from FireStorage (but first need a way to upload to it)
 * [ ] - Create a custom Pixi component that can represent imported images
 */

interface Props {
	updateSpriteLocation: (sprite: Sprite) => void;
	mapData?: MapData;
}

interface State {
	x: number;
	y: number;
	alpha: number;
	dragging: boolean;
	data: any;
}
export default class Map extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			x: 300,
			y: 300,
			alpha: 1.0,
			dragging: false,
			data: null
		};

		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.onDragMove = this.onDragMove.bind(this);
	}

	private sprite: any;
	private stage: any;

	onDragStart(e): void {
		this.setState({
			alpha: 0.5,
			dragging: true,
			data: e.data
		});
	}

	onDragEnd(): void {
		this.setState({
			alpha: 1.0,
			dragging: false,
			data: null
		});
	}

	onDragMove(): void {
		if (this.state.dragging) {
			const newPos = this.state.data.getLocalPosition(this.sprite.parent);
			this.setState({
				x: newPos.x,
				y: newPos.y
			});
		}
	}

	render(): ReactNode {
		const style = new PIXI.TextStyle({
			fill: '#fff'
		});
		return (
			<div>
				<Stage
					ref={cmpt => (this.stage = cmpt)}
					width={window.innerWidth}
					height={window.innerHeight}
				>
					<DraggableSprite
						ref={cmpt => (this.sprite = cmpt)}
						image="https://firebasestorage.googleapis.com/v0/b/dnd-player-a7776.appspot.com/o/uploads%2Fa240f2d0-622a-4a5a-bb96-b512a08c1317?alt=media&token=bae496e7-8ea7-4a1c-a502-301aeb99f8da"
						x={this.state.x}
						y={this.state.y}
						// anchor={0.5}
						// interactive={true}
						// buttonMode={true}
						// mousedown={this.onDragStart}
						// mouseup={this.onDragEnd}
						// mouseupoutside={this.onDragEnd}
						// mousemove={this.onDragMove}
					/>
				</Stage>
			</div>
		);
	}
}
