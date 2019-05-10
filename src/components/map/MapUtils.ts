import { MapData } from '../../models/Map';
import { MapObject } from '../../models/Map';

interface GroupedMapObjects {
	background?: MapObject[];
	tokens?: MapObject[];
}

export const groupObjectsByLayer = (map: MapData): GroupedMapObjects => {
	if (!map || !map.objects) {
		return {};
	}
	return Object.keys(map.objects).reduce((prev: GroupedMapObjects, curr: string): any => {
		const l = map.objects[curr].layer;
		if (!prev[l]) {
			prev[l] = [];
		}
		prev[l].push({
			...map.objects[curr],
			id: curr
		});
		return prev;
	}, {});
};

export const calculateDistance = (
	start: PIXI.PointLike,
	end: PIXI.PointLike,
	scale: number
): string => {
	return (
		Math.pow(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2), 0.5) /
		scale /
		40
	).toFixed(1);
};
