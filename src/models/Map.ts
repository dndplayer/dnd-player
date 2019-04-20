import * as PIXI from 'pixi.js';

export interface Asset {
	name: string;
	imageUrl: string;
	localTransform: PIXI.Matrix;
}

export interface Layer {
	assets: object; // Key (Id) -> Asset
}

export interface MapLayers {
	dm: Layer;
	background: Layer;
	all: Layer;
}

export interface MapData {
	id: string;
	name: string;
	creator: string;
	timestamp: string;
	layers: MapLayers;
}
