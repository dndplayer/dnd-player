import React, { Component, ReactNode } from 'react';
import { Stage, Sprite, Container } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import Viewport from 'pixi-viewport';

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
	zoom?: number;
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

	onMapMount = (app: PIXI.Application): void => {
		const viewport = new Viewport({
			screenWidth: window.innerWidth * 0.75,
			screenHeight: window.innerHeight,
			worldWidth: 1000,
			worldHeight: 1000,
			interaction: app.renderer.plugins.interaction
		});

		app.renderer.autoResize = true;
		app.renderer.view.style.position = 'absolute';
		app.renderer.view.style.display = 'block';
		app.renderer.resize(window.innerWidth * 0.75, window.innerHeight);

		app.stage.addChild(viewport);

		viewport
			.drag({
				mouseButtons: 'right'
			})
			.pinch()
			.wheel()
			.decelerate();

		// var sprite = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE));
		var sprite = viewport.addChild(
			PIXI.Sprite.fromImage(
				'https://firebasestorage.googleapis.com/v0/b/dnd-player-a7776.appspot.com/o/uploads%2F5e9a7b59-678a-477c-a18b-4739c9cb197a?alt=media&token=73ec57e9-87e2-44ca-9b08-4243d584cd91'
			)
		);
		// sprite.tint = 0xff0000;
		sprite.width = sprite.height = 100;
		sprite.anchor.set(0.5, 0.5);
		sprite.position.set(100, 100);
		sprite.interactive = true;
		sprite.cursor = 'pointer';
		sprite.on('mousedown', this.onDragStart);
		sprite.on('mousemove', this.onDragMove);
		sprite.on('mouseup', this.onDragEnd);
		sprite.on('mouseupoutside', this.onDragEnd);
		sprite.on(
			'mouseover',
			(event: PIXI.interaction.InteractionEvent): void => {
				const x = event.currentTarget as PIXI.Sprite;
				if (x) {
					x.tint = 0xff0000;
				}
			}
		);
		sprite.on(
			'mouseout',
			(event: PIXI.interaction.InteractionEvent): void => {
				const x = event.currentTarget as PIXI.Sprite;
				if (x) {
					x.tint = 0xffffff;
				}
			}
		);

		var s2 = viewport.addChild(
			PIXI.Sprite.fromImage(
				'https://firebasestorage.googleapis.com/v0/b/dnd-player-a7776.appspot.com/o/uploads%2F8b58cc32-ae8f-4ed9-ba32-21a23087050c?alt=media&token=cf5989aa-73c7-4c96-9aaa-95ab11649fa5'
			)
		);
		s2.width = s2.height = 150;
		s2.position.set(350, 400);
		s2.anchor.set(0.5, 0.5);
		s2.interactive = true;
		s2.cursor = 'pointer';
	};

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
		return (
			<div>
				<Stage
					onMount={this.onMapMount}
					width={window.innerWidth * 0.75}
					height={window.innerHeight}
				>
					{/* <DraggableSprite image="https://firebasestorage.googleapis.com/v0/b/dnd-player-a7776.appspot.com/o/uploads%2Fa240f2d0-622a-4a5a-bb96-b512a08c1317?alt=media&token=bae496e7-8ea7-4a1c-a502-301aeb99f8da" /> */}
				</Stage>
			</div>
		);
	}
}
