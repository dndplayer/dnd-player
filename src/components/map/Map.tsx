import React, { Component } from 'react';
import { Stage, Sprite, Text } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

import testImg from './test.png';

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
}

interface State {
	x: number;
	y: number;
	alpha: number;
	dragging: boolean;
	data: any;
}
export default class Map extends Component<Props, State> {
	constructor(props) {
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

	onDragStart(e) {
		this.setState({
			alpha: 0.5,
			dragging: true,
			data: e.data
		});
	}

	onDragEnd() {
		this.setState({
			alpha: 1.0,
			dragging: false,
			data: null
		});
	}

	onDragMove() {
		if (this.state.dragging) {
			const newPos = this.state.data.getLocalPosition(this.sprite.parent);
			this.setState({
				x: newPos.x,
				y: newPos.y
			});
		}
	}

	render() {
		const style = new PIXI.TextStyle({
			fill: '#fff'
		});
		return (
			<div>
				<Stage ref={cmpt => (this.stage = cmpt)} width={800} height={800}>
					<Text style={style} x={30} y={30} text="DND Player" />
					<Sprite
						ref={cmpt => (this.sprite = cmpt)}
						image={testImg}
						x={this.state.x}
						y={this.state.y}
						anchor={0.5}
						interactive={true}
						buttonMode={true}
						mousedown={this.onDragStart}
						mouseup={this.onDragEnd}
						mouseupoutside={this.onDragEnd}
						mousemove={this.onDragMove}
					/>
				</Stage>
			</div>
		);
	}
}
