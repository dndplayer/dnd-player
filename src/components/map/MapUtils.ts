import * as PIXI from 'pixi.js';
import { MapData } from '../../models/Map';
import { MapObject } from '../../models/Map';

export interface GroupedMapObject {
	objects: MapObject[];
	zIndex: number;
	name: string;
}

const zIndexes = {
	background: 0,
	tokens: 1
};

export const groupObjectsByLayer = (map: MapData): GroupedMapObject[] => {
	if (!map || !map.objects) {
		return [];
	}
	return Object.keys(map.objects).reduce((prev: GroupedMapObject[], curr: string): any => {
		const l = map.objects[curr].layer;
		let layer = prev.find(x => x.name === l);
		if (!layer) {
			layer = { objects: [], zIndex: zIndexes[l], name: l };
			prev.push(layer);
		}
		layer.objects.push({
			...map.objects[curr],
			id: curr
		});
		return prev;
	}, []);
};

export const calculateDistance = (start: number[], end: number[], scale: number): string => {
	return (
		Math.pow(Math.pow(end[0] - start[0], 2) + Math.pow(end[1] - start[1], 2), 0.5) /
		scale /
		40
	).toFixed(1);
};

export const getMidpointOfPoints = (points: number[]): number[] => {
	if (points === null || points === undefined) {
		return null;
	}
	const avgs = points.reduce(
		(prev, curr, idx) => {
			const pointIdx = Math.floor(idx / 2);
			const isX = idx % 2 === 0;
			const p = isX ? prev.x : prev.y;
			const a = (p * pointIdx + curr) / (pointIdx + 1);
			return { ...prev, [isX ? 'x' : 'y']: a };
		},
		{ x: 0, y: 0 }
	);
	return [avgs.x, avgs.y];
};
