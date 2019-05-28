import React, { Component, ReactNode } from 'react';
import * as PIXI from 'pixi.js';
import { GroupedMapObject } from './MapUtils';
import { MapData, MapObject } from '../../models/Map';
import { PlayerCharacter, NonPlayerCharacter, CharacterSize } from '../../5e/models/Character';
import Scenery from './objects/Scenery';
import Token from './objects/Token';
import { MapObjectVisibility } from './objects/MapObject';

interface Props {
	dm: boolean;
	object: MapObject;
	layerName: string;
	map: MapData;
	pc?: PlayerCharacter;
	npc?: NonPlayerCharacter;
	resource: PIXI.Texture;
	viewportZoom: number;
	isSelected: boolean;
	layerLocked: boolean;
	measuring: boolean;
	fogAddMode: boolean;
	keyShiftDown: boolean;
	onSelectObject: (mapObjectId: string) => void;
	onUpdateObject: (mapId: string, mapObjectId: string, data: any) => void;
	handleMultiDrag: (dX: number, dY: number, sourceMapObjectId: string) => void;
}

export default class MapLayerObject extends Component<Props> {
	render(): ReactNode {
		const {
			object,
			layerName,
			map,
			pc,
			npc,
			resource,
			viewportZoom,
			isSelected,
			layerLocked,
			dm,
			measuring,
			fogAddMode,
			keyShiftDown,
			onSelectObject,
			onUpdateObject,
			handleMultiDrag
		} = this.props;

		const dmOnly = object.dmOnly || false;

		const visibility = dmOnly
			? dm
				? MapObjectVisibility.DM_VISIBLE
				: MapObjectVisibility.HIDDEN
			: MapObjectVisibility.VISIBLE;

		const isToken = !!pc || !!npc;
		const asset = pc || npc;

		let scale = object.scale;
		if (asset) {
			const size = (asset.size || '').toString();
			switch (parseInt(size)) {
				case CharacterSize.Tiny:
					scale = new PIXI.Point(0.5, 0.5);
					break;
				case CharacterSize.Small:
					scale = new PIXI.Point(1, 1);
					break;
				case CharacterSize.Medium:
					scale = new PIXI.Point(1, 1);
					break;
				case CharacterSize.Large:
					scale = new PIXI.Point(2, 2);
					break;
				case CharacterSize.Huge:
					scale = new PIXI.Point(3, 3);
					break;
				case CharacterSize.Gargantuan:
					scale = new PIXI.Point(4, 4);
					break;
				default:
					scale = new PIXI.Point(1, 1);
			}
		}

		if (!isToken) {
			return (
				<Scenery
					key={object.id}
					position={object.position}
					scale={object.scale}
					rotation={object.rotation}
					pivot={object.pivot}
					anchor={object.anchor}
					resource={resource}
					onUpdateObject={(mapObjectId, newData): void =>
						onUpdateObject(map.id, mapObjectId, newData)
					}
					isSelected={isSelected}
					isSelectable={dm && !layerLocked && !measuring && !fogAddMode && !keyShiftDown}
					onSelected={onSelectObject}
					mapObjectId={object.id}
					layerName={layerName}
					visibility={visibility}
					viewportZoom={viewportZoom}
				/>
			);
		} else {
			return (
				<Token
					key={object.id}
					resource={resource}
					hp={
						object.hp ||
						(pc
							? {
									value: pc.hp,
									max: pc.maxHp
							  }
							: undefined)
					}
					ac={asset ? asset.ac || undefined : undefined}
					range={
						asset && asset.speed ? Math.max(...Object.values(asset.speed)) : undefined
					}
					position={object.position}
					scale={scale}
					rotation={object.rotation}
					pivot={object.pivot}
					anchor={object.anchor}
					onUpdateObject={(mapObjectId, newData): void =>
						onUpdateObject(map.id, mapObjectId, newData)
					}
					isSelected={isSelected}
					isSelectable={
						(pc || dm) && !layerLocked && !measuring && !fogAddMode && !keyShiftDown
					}
					onSelected={onSelectObject}
					mapObjectId={object.id}
					layerName={layerName}
					visibility={visibility}
					viewportZoom={viewportZoom}
					onMove={handleMultiDrag}
				/>
			);
		}
	}
}
