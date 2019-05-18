import * as PIXI from 'pixi.js';

export interface MapObject {
	id?: string;
	name: string;
	anchor: PIXI.PointLike;
	pivot: PIXI.PointLike;
	position: PIXI.PointLike;
	rotation: number;
	scale: PIXI.PointLike;
	dmOnly: boolean;
	type: string;
	layer: string;
	imageRef?: string; // Override the image used by an asset (if it has one)
	pcId?: string; // References a PlayerCharacter asset
	npcId?: string; // References a NonPlayerCharacter asset
	hp?: { value: number; max: number };
}

export interface MapLayer {
	name: string;
	visibleTo?: string[]; // Group visibility in the future
	zIndex?: number;
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

export interface MaskPolygon {
	points: number[];
	position: { x: number; y: number };
}

export interface FogData {
	colour?: string;
	maskPolygons?: MaskPolygon[];
}

export interface MapData {
	id: string;
	layers: MapLayers;
	// objects: MapObject[];
	objects: object;
	backgroundColour?: string;
	fog: FogData;
}
