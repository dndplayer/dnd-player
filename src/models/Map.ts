import * as PIXI from 'pixi.js';

export interface MapObject {
	id?: string;
	name: string;
	anchor: PIXI.PointLike;
	pivot: PIXI.PointLike;
	position: PIXI.PointLike;
	rotation: number;
	scale: PIXI.PointLike;
	type: string;
	imageRef?: string; // Override the image used by an asset (if it has one)
	pcId?: string; // References a PlayerCharacter asset
	npcId?: string; // References a NonPlayerCharacter asset
}

export interface MapLayer {
	mapObjects: object; // Key (Id) -> MapObject
}

export interface MapLayers {
	background: MapLayer;
	tokens: MapLayer;
	// foreground: MapLayer;
	// dm: MapLayer;
	// lighting: MapLayer;
	// Fx: MapLayer;
	// all: MapLayer;
}

export interface MapData {
	id: string;
	layers: MapLayers;
}
