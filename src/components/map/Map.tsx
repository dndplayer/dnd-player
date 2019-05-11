import React, { Component, ReactNode, ReactElement } from 'react';
import { Stage, Sprite, Container, PixiComponent, AppConsumer, Graphics } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

import { MapData } from '../../models/Map';

import { DropTarget, DropTargetMonitor } from 'react-dnd';
import types from '../../constants/dragdroptypes';

import Token from './objects/Token';
import { Upload } from '../../models/Upload';
import { LinearProgress } from '@material-ui/core';
import Scenery from './objects/Scenery';
import { groupObjectsByLayer, calculateDistance } from './MapUtils';
import { PlayerCharacter, NonPlayerCharacter, CharacterSize } from '../../5e/models/Character';
import { MapObjectVisibility } from './objects/MapObject';
import Ruler from './objects/Ruler';

import styles from './Map.module.scss';
import { ViewportComponent } from './Viewport';

interface CollectProps {
	connectDropTarget: any;
	itemType: typeof types;
	isHovering: boolean;
}

interface OwnProps {
	updateSpriteLocation: (sprite: Sprite) => void;
	mapData?: MapData;
	selectedObjects: string[];
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: { [key: string]: NonPlayerCharacter };
	onUpdateObject: (mapId, mapObjectId, newData) => void;
	onAddAssetToMap: (mapId, assetType, assetId, initialData) => void;
	onAddImageToMap: (mapId, imageRef, initialData) => void;
	onSelectObject: (mapObjectId) => void;
	images: Upload[];
	isUserDm: boolean;
}

type Props = CollectProps & OwnProps;

interface State {
	loadingAssets: boolean;
	loadProgress: number;
	app?: PIXI.Application;
	measuring: boolean;
	measureStart: PIXI.PointLike;
	measureEnd: PIXI.PointLike;
	measuredDistance: string; // Probably should be a number ultimately
}
class Map extends Component<Props, State> {
	state = {
		loadingAssets: true,
		loadProgress: 0,
		app: null,
		measuring: false,
		measureStart: null,
		measureEnd: null,
		measuredDistance: null
	};

	private app: any;
	private root: PIXI.Container;

	public _viewport: Viewport;
	private _stage: any;
	private _mainWrapper: HTMLElement;

	private loader: PIXI.loaders.Loader = PIXI.loader;

	componentDidMount() {
		this.loadAssets(this.props, this.state, true);
	}

	componentDidUpdate(prevProps: Props, prevState: State): void {
		this.loadAssets(prevProps, prevState, false);
	}

	loadAssets = (prevProps: Props, prevState: State, forceLoad: boolean): void => {
		if (prevState.loadingAssets && !this.state.loadingAssets) {
			if (this._viewport) {
				this._viewport.fitWorld();
			}
		}

		if (
			forceLoad ||
			(this.props.mapData && !prevProps.mapData) ||
			(this.props.mapData && this.props.mapData.objects !== prevProps.mapData.objects)
		) {
			if (!this.loader.resources['__missing__']) {
				this.loader.add('__missing__', 'http://placekitten.com/128/128');
			}

			const mapAssetsToLoad = Object.keys(this.props.mapData.objects)
				.map(
					(x: string): any => {
						// TODO: CE - Really not loving this code to determine the image ref, revisit this
						const o = this.props.mapData.objects[x];
						const pc = o.pcId
							? this.props.playerCharacters.find(y => y.id === o.pcId)
							: null;
						const npc = o.npcId ? this.props.nonPlayerCharacters[o.npcId] : null;
						const imgRef =
							o && o.imageRef
								? o.imageRef
								: pc
								? pc.imageRef
								: npc
								? npc.imageRef || '__missing__'
								: '__missing__';
						const alreadyExists = !!this.loader.resources[imgRef];
						if (alreadyExists) return null;
						const img = this.props.images.find(y => y.filePath === imgRef);
						if (!img) {
							// This could be a remote image
						}

						return {
							name: imgRef,
							url: img ? img.downloadUrl : imgRef,
							loadType: 2 //PIXI.loaders.LOAD_TYPE.IMAGE
						};
					}
				)
				.filter(x => x);

			const distinctAssetsToLoad = Array.from(new Set(mapAssetsToLoad.map(x => x.name))).map(
				name => {
					return {
						...mapAssetsToLoad.find(x => x.name === name)
					};
				}
			);

			this.loader.add(distinctAssetsToLoad);
			this.loader.load(
				(): void => {
					this.setState({ loadingAssets: false });
				}
			);

			this.loader.onProgress.add(x => this.setState({ loadProgress: x.progress }));
		}
	};

	onMapMount = (app: PIXI.Application): void => {
		this.setState({ app: app });
		app.stage.hitArea = new PIXI.Rectangle(
			0,
			0,
			app.renderer.width / app.renderer.resolution,
			app.renderer.height / app.renderer.resolution
		);
		app.stage.interactive = true;
		// Any free space click should de-select the currently selected object.
		// for this to work any objects on the stage the implement .on('mouseup')
		// need to ensure they call e.stopPropagation(); or the event will also get here!
		app.stage.on(
			'mousedown',
			(e): void => {
				// console.log(e);
				if (e.target.name !== this._viewport.name) {
					return;
				}
				if (
					!this.state.measuring &&
					this.props.onSelectObject &&
					this.props.selectedObjects.length > 0
				) {
					this.props.onSelectObject(null);
				}

				if (this.state.measuring) {
					this.setState({
						measureStart: e.data.global.clone(),
						measureEnd: e.data.global.clone(),
						measuredDistance: '0'
					});
				}

				// TODO: Possibly also trigger a close of the sidebar if it's open
			}
		);
		app.stage.on(
			'mousemove',
			(e): void => {
				if (this.state.measuring && this.state.measureStart) {
					this.setState({
						measureEnd: e.data.global.clone(),
						measuredDistance: `${calculateDistance(
							this.state.measureStart,
							this.state.measureEnd,
							this._viewport.scale.x
						)} ft.`
					});
				}
			}
		);
		app.stage.on(
			'mouseup',
			(e): void => {
				if (this.state.measuring) {
					this.setState({ measureStart: null, measureEnd: null, measuredDistance: null });
				}
			}
		);
	};

	render(): ReactNode {
		const { playerCharacters, nonPlayerCharacters, selectedObjects } = this.props;

		if (this.state.loadingAssets) {
			return (
				<div className={styles.loadingWrapper}>
					<div className={styles.loadingText}>LOADING...</div>
					<LinearProgress variant="determinate" value={this.state.loadProgress} />
				</div>
			);
		}

		if (!this.props.mapData) {
			return <div>No Map</div>;
		}

		const { objects, backgroundColour } = this.props.mapData;
		const { background, tokens } = this.props.mapData.layers;
		const { isUserDm } = this.props;

		const { connectDropTarget, isHovering } = this.props;

		let overlay = null;
		if (isHovering) {
			overlay = (
				<div className={styles.dragAddObjectWrapper}>
					<div className={styles.dragAddObjectText}>+</div>
				</div>
			);
		}

		// TODO: Order this (maybe make it an array not an object) so layer zIndex is obeyed.
		const groupedObjects = groupObjectsByLayer(this.props.mapData);
		const layerSortFunc = (a, b) =>
			groupedObjects[a].zIndex < groupedObjects[b].zIndex
				? -1
				: groupedObjects[a].zIndex > groupedObjects[b].zIndex
				? 1
				: 0;

		return connectDropTarget(
			<div ref={c => (this._mainWrapper = c)}>
				{overlay}
				<div className={styles.measureToolWrapper}>
					<div className={styles.squaredOne}>
						<span>Measure Tool</span>
						<input
							type="checkbox"
							value="None"
							id="squaredOne"
							name="check"
							checked={this.state.measuring}
							onChange={e => this.setState({ measuring: e.target.checked })}
						/>
						<label htmlFor="squaredOne" />
					</div>
				</div>
				<Stage
					ref={c => (this._stage = c as any)}
					onMount={this.onMapMount}
					width={window.innerWidth}
					height={window.innerHeight}
					options={{
						antialias: true,
						backgroundColor: backgroundColour
							? parseInt(backgroundColour.slice(1), 16)
							: 0xffffff
					}}
				>
					<AppConsumer>
						{app => (
							<ViewportComponent
								name="viewport"
								ref={c => (this._viewport = c as any)}
								app={app}
							>
								{Object.keys(groupedObjects)
									.sort(layerSortFunc)
									.reverse()
									.map((layerName: string) => {
										const l = groupedObjects[layerName];
										return (
											<Container key={layerName} name={`layer-${layerName}`}>
												{l.map(o => {
													const isPc = !!o.pcId;
													const isNpc = !!o.npcId;
													const pcAsset = o.pcId
														? playerCharacters.find(
																x => x.id === o.pcId
														  )
														: null;
													const npcAsset = o.npcId
														? nonPlayerCharacters[o.npcId]
														: null;
													const imageUrl =
														pcAsset && pcAsset.imageRef
															? pcAsset.imageRef
															: npcAsset && npcAsset.imageRef
															? npcAsset.imageRef
															: o.imageRef || '__missing__';
													const res =
														PIXI.loader.resources[imageUrl] &&
														PIXI.loader.resources[imageUrl].texture;
													const isSelected = !!selectedObjects.find(
														x => x === o.id
													);
													const isDmOnly = o.dmOnly || false;
													const userIsDm = isUserDm || false;
													const layer = o.layer;
													const visibility = isDmOnly
														? userIsDm
															? MapObjectVisibility.DM_VISIBLE
															: MapObjectVisibility.HIDDEN
														: MapObjectVisibility.VISIBLE;
													const isToken = isPc || isNpc;
													const asset = pcAsset || npcAsset;
													let scale = o.scale;
													if (asset) {
														const size = (asset.size || '').toString();
														switch (parseInt(size)) {
															case CharacterSize.Tiny:
																scale = { x: 0.5, y: 0.5 };
																break;
															case CharacterSize.Small:
																scale = { x: 1, y: 1 };
																break;
															case CharacterSize.Medium:
																scale = { x: 1, y: 1 };
																break;
															case CharacterSize.Large:
																scale = { x: 2, y: 2 };
																break;
															case CharacterSize.Huge:
																scale = { x: 3, y: 3 };
																break;
															case CharacterSize.Gargantuan:
																scale = { x: 4, y: 4 };
																break;
														}
													}
													return !isToken ? (
														<Scenery
															key={o.id}
															position={o.position}
															scale={o.scale}
															rotation={o.rotation}
															pivot={o.pivot}
															anchor={o.anchor}
															resource={res}
															onUpdateObject={(
																mapObjectId,
																newData
															) =>
																this.props.onUpdateObject(
																	this.props.mapData.id,
																	mapObjectId,
																	newData
																)
															}
															isSelected={isSelected}
															isSelectable={!this.state.measuring}
															onSelected={this.props.onSelectObject}
															mapObjectId={o.id}
															layerName={layer}
															visibility={visibility}
														/>
													) : (
														<Token
															key={o.id}
															resource={res}
															hp={
																pcAsset
																	? {
																			value: pcAsset.hp,
																			max: pcAsset.maxHp
																	  }
																	: undefined
															}
															ac={
																asset
																	? asset.ac || undefined
																	: undefined
															}
															position={o.position}
															scale={scale}
															rotation={o.rotation}
															pivot={o.pivot}
															anchor={o.anchor}
															onUpdateObject={(
																mapObjectId,
																newData
															) =>
																this.props.onUpdateObject(
																	this.props.mapData.id,
																	mapObjectId,
																	newData
																)
															}
															isSelected={isSelected}
															isSelectable={!this.state.measuring}
															onSelected={this.props.onSelectObject}
															mapObjectId={o.id}
															layerName={layer}
															visibility={visibility}
														/>
													);
												})}
											</Container>
										);
									})}
								<Ruler
									visible={this.state.measuring}
									measuring={this.state.measuring}
									start={this.state.measureStart}
									end={this.state.measureEnd}
									distance={this.state.measuredDistance}
									thickness={
										this._viewport ? (1 / this._viewport.scale.x) * 15 : 20
									}
									color={0xff0000}
								/>
							</ViewportComponent>
						)}
					</AppConsumer>
				</Stage>
			</div>
		);
	}
}

const mapTargetSpec = {
	canDrop(props, monitor) {
		return true;
	},
	hover(props, monitor, component) {},
	drop(props, monitor: DropTargetMonitor, component: Map) {
		const item = monitor.getItem();
		const type = monitor.getItemType();
		// console.log(`dropped [DROPPER]:`);
		// console.log(item);

		const dropPos = monitor.getClientOffset();
		const localCoords = component._viewport.toLocal(new PIXI.Point(dropPos.x, dropPos.y));

		// console.log(`Drop World coords: ${JSON.stringify(localCoords)}`);

		switch (type) {
			case types.PLAYER_CHARACTER_ASSET:
				if (props.onAddAssetToMap && props.mapData) {
					props.onAddAssetToMap(props.mapData.id, item.assetType, item.id, {
						position: { x: localCoords.x, y: localCoords.y }
					});
				}
				break;
			case types.UPLOAD_IMAGE:
				if (props.onAddImageToMap && props.mapData) {
					props.onAddImageToMap(props.mapData.id, item.imageRef, {
						position: { x: localCoords.x, y: localCoords.y }
					});
				}
		}
	}
};

function collect(connect, monitor: DropTargetMonitor): CollectProps {
	return {
		connectDropTarget: connect.dropTarget(),
		itemType: monitor.getItemType() as any,
		isHovering: monitor.isOver()
	};
}

export default DropTarget(
	[types.PLAYER_CHARACTER_ASSET, types.UPLOAD_IMAGE],
	mapTargetSpec,
	collect
)(Map);
