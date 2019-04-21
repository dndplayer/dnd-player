import * as PIXI from 'pixi.js';

export interface MapObject {
	name: string;
	imageUrl: string;
	localTransform: PIXI.Matrix;
	assetId?: string; // For linking to a global asset <optional>
	svg?: string;
}

export interface MapLayer {
	mapObjects: object; // Key (Id) -> MapObject
}

export interface MapLayers {
	background: MapLayer;
	tokens: MapLayer;
	foreground: MapLayer;
	dm: MapLayer;
	lighting: MapLayer;
	Fx: MapLayer;
	all: MapLayer;
}

export interface MapData {
	id: string;
	name: string;
	creator: string;
	timestamp: string;
	scale: number;
	ordinal: number;
	layers: MapLayers;
}
