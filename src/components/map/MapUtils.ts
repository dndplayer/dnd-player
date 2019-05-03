import { MapData } from '../../models/Map';
import { MapObject } from '../../models/Map';

interface GroupedMapObjects {
	background?: MapObject[];
	tokens?: MapObject[];
}

export const groupObjectsByLayer = (map: MapData): GroupedMapObjects => {
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
