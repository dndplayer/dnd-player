import * as PIXI from 'pixi.js';

export default class MapObject extends PIXI.Container {
	layerName: string;
	mapObjectId: string;

	onUpdateObject: (data) => void; // An update callback to be used to update

	// TODO: Put a method here that can be called in applyProps to spread props in higher up
}
