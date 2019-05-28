import React, { Component, ReactNode } from 'react';
import * as PIXI from 'pixi.js';
import { Container } from '@inlet/react-pixi';
import { MapLayer as MapLayerModel, MapData } from '../../models/Map';
import { GroupedMapObject } from './MapUtils';
import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';
import MapLayerObject from './MapLayerObject';

interface Props {
	layer: GroupedMapObject;
	map: MapData;
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	dm: boolean;
	viewportZoom: number;
	selectedObjects: string[];
	fogAddMode: boolean;
	measuring: boolean;
	keyShiftDown: boolean;
	onSelectObject: (mapObjectId: string) => void;
	onUpdateObject: (mapId: string, mapObjectId: string, data: any) => void;
	handleMultiDrag: (dX: number, dY: number, sourceMapObjectId: string) => void;
}

export default class MapLayer extends Component<Props> {
	render(): ReactNode {
		const {
			layer,
			map,
			playerCharacters,
			nonPlayerCharacters,
			dm,
			viewportZoom,
			selectedObjects,
			fogAddMode,
			measuring,
			keyShiftDown,
			onSelectObject,
			onUpdateObject,
			handleMultiDrag
		} = this.props;

		const mapLayer = map.layers[layer.name] as MapLayerModel;

		const layerLocked = mapLayer ? mapLayer.locked : false;

		return (
			<Container key={layer.name} name={`layer-${layer.name}`}>
				{layer.objects.map(obj => {
					const pcAsset = obj.pcId ? playerCharacters.find(x => x.id === obj.pcId) : null;
					const npcAsset = obj.npcId
						? nonPlayerCharacters.find(x => x.id === obj.npcId)
						: null;

					const imageUrl =
						pcAsset && pcAsset.imageRef
							? pcAsset.imageRef
							: npcAsset && npcAsset.imageRef
							? npcAsset.imageRef
							: obj.imageRef || '__missing__';

					const resource =
						PIXI.loader.resources[imageUrl] && PIXI.loader.resources[imageUrl].texture;

					const isSelected = !!selectedObjects.find(x => x === obj.id);

					return (
						<MapLayerObject
							key={obj.id}
							map={map}
							layerName={layer.name}
							object={obj}
							pc={pcAsset}
							npc={npcAsset}
							resource={resource}
							viewportZoom={viewportZoom}
							isSelected={isSelected}
							dm={dm}
							fogAddMode={fogAddMode}
							measuring={measuring}
							keyShiftDown={keyShiftDown}
							layerLocked={layerLocked}
							onSelectObject={onSelectObject}
							onUpdateObject={onUpdateObject}
							handleMultiDrag={handleMultiDrag}
						/>
					);
				})}
			</Container>
		);
	}
}
