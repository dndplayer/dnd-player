import React, { Component, ReactNode, ReactElement } from 'react';
import { Stage, Sprite, Container, PixiComponent, AppConsumer, Graphics } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { v4 } from 'uuid';

import { MapData } from '../../models/Map';

import { DropTarget, DropTargetMonitor } from 'react-dnd';
import types from '../../constants/dragdroptypes';

import Token from './objects/Token';
import { Upload } from '../../models/Upload';
import { LinearProgress } from '@material-ui/core';
import Scenery from './objects/Scenery';
import { groupObjectsByLayer, calculateDistance, GroupedMapObject } from './MapUtils';
import { PlayerCharacter, NonPlayerCharacter, CharacterSize } from '../../5e/models/Character';
import { MapObjectVisibility } from './objects/MapObject';
import Ruler from './objects/Ruler';
import BasicFogLayer from './BasicFogLayer';

import styles from './Map.module.scss';
import { ViewportComponent } from './Viewport';
import { MapPing } from '../../models/MapPing';
import Ping from './objects/OldPing';
import EditablePolygon from './objects/editable/EditablePolygon';

// import Ping from './objects/NewPing';

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
	nonPlayerCharacters: NonPlayerCharacter[];
	onUpdateObject: (mapId, mapObjectId, newData) => void;
	onAddAssetToMap: (mapId, assetType, assetId, initialData) => void;
	onAddImageToMap: (mapId, imageRef, initialData) => void;
	onSelectObject: (mapObjectId) => void;
	images: Upload[];
	dm: boolean;
	user: firebase.User;
	sendPing: (ping: MapPing) => void;
	mapPings: MapPing[];
	toggleMeasureMode: (val?: boolean) => void;
	measureModeEnabled: boolean;
	fogEditMode: boolean;
	fogAddMode: boolean;
	onUpdateFogPolygon: (
		mapId: string,
		fogPolygonId: string,
		position: PIXI.Point,
		points?: number[]
	) => void;
}

type Props = CollectProps & OwnProps;

interface State {
	windowWidth: number;
	windowHeight: number;
	loadingAssets: boolean;
	loadProgress: number;
	app?: PIXI.Application;
	measuring: boolean;
	measureStart: PIXI.PointLike;
	measureEnd: PIXI.PointLike;
	measuredDistance: string; // Probably should be a number ultimately
	viewportZoom: number;
	newFogIndex?: string;
	newFogPosition?: PIXI.PointLike;
	newFogPoints?: number[];
}
class Map extends Component<Props, State> {
	state = {
		windowWidth: window.innerWidth,
		windowHeight: window.innerHeight,
		loadingAssets: true,
		loadProgress: 0,
		app: null,
		measuring: false,
		measureStart: null,
		measureEnd: null,
		measuredDistance: null,
		viewportZoom: 1,
		newFogIndex: null,
		newFogPosition: null,
		newFogPoints: null
	};

	private app: any;
	private root: PIXI.Container;

	public _viewport: Viewport;
	private _stage: any;
	private _mainWrapper: HTMLElement;

	private loader: PIXI.loaders.Loader = PIXI.loader;

	componentDidMount() {
		this.loadAssets(this.props, this.state, true);

		window.addEventListener('resize', this.handleWindowResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize);
	}

	componentDidUpdate(prevProps: Props, prevState: State): void {
		this.loadAssets(prevProps, prevState, false);

		if (this.props.measureModeEnabled !== prevProps.measureModeEnabled) {
			this.setState({
				measuring: this.props.measureModeEnabled
			});
		}

		if (this.props.fogAddMode && !prevProps.fogAddMode) {
			// Fog add enabled, prepare some local state.
			this.setState({
				newFogIndex: v4(),
				newFogPosition: new PIXI.Point(0, 0),
				newFogPoints: []
			});
		}
		if (!this.props.fogAddMode && prevProps.fogAddMode) {
			// Fog add disabled, cleanup local state and persist the new poly ?
			if (this.state.newFogPoints.length > 0) {
				this.props.onUpdateFogPolygon(
					this.props.mapData.id,
					this.state.newFogIndex,
					this.state.newFogPosition,
					this.state.newFogPoints
				);
			}

			this.setState({
				newFogIndex: null,
				newFogPosition: null,
				newFogPoints: null
			});
		}
	}

	handleWindowResize = () => {
		this.setState({
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		});
	};

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
				this.loader.add('__missing__', 'https://placekitten.com/128/128');
			}

			const mapAssetsToLoad = Object.keys(this.props.mapData.objects)
				.map(
					(x: string): any => {
						// TODO: CE - Really not loving this code to determine the image ref, revisit this
						const o = this.props.mapData.objects[x];
						const pc = o.pcId
							? this.props.playerCharacters.find(y => y.id === o.pcId)
							: null;
						const npc = o.npcId
							? this.props.nonPlayerCharacters.find(x => x.id === o.npcId)
							: null;
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
		// app.stage.hitArea = new PIXI.Rectangle(
		// 	0,
		// 	0,
		// 	app.renderer.width / app.renderer.resolution,
		// 	app.renderer.height / app.renderer.resolution
		// );
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

				if (this.props.fogAddMode) {
					const localPos = this._viewport.toLocal(e.data.global);
					//console.log(`TODO: Add new poly point @ ${localPos.x}, ${localPos.y}`);

					let newFogPos = this.state.newFogPosition;
					if (
						!this.state.newFogPosition ||
						(this.state.newFogPosition.x === 0 && this.state.newFogPosition.y === 0)
					) {
						this.setState({
							newFogPosition: localPos.clone()
						});

						newFogPos = localPos.clone();
					}

					// Make all new points offset from the first
					const newPointPos = new PIXI.Point(
						localPos.x - newFogPos.x,
						localPos.y - newFogPos.y
					);

					this.setState(state => ({
						newFogPoints: [...state.newFogPoints, newPointPos.x, newPointPos.y]
					}));
				}

				// WIP Ping testing
				if (!this.state.measuring && !this.props.fogAddMode) {
					const localPos = this._viewport.toLocal(e.data.global);
					this.props.sendPing({
						position: localPos.clone(),
						userId: this.props.user.uid
					});
				}
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
		const { dm } = this.props;

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
		const layerSortFunc = (a: GroupedMapObject, b: GroupedMapObject) => a.zIndex - b.zIndex;

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
							// onChange={e => this.setState({ measuring: e.target.checked })}
							onChange={e => this.props.toggleMeasureMode(e.target.checked)}
						/>
						<label htmlFor="squaredOne" />
					</div>
				</div>
				<div className={styles.controlStateOverlay}>
					{this.props.fogEditMode && (
						<span className={styles.controlState}>FOG EDIT MODE</span>
					)}
					{this.props.fogAddMode && (
						<span className={styles.controlState}>FOG ADD MODE</span>
					)}
				</div>
				<Stage
					ref={c => (this._stage = c as any)}
					onMount={this.onMapMount}
					width={this.state.windowWidth}
					height={this.state.windowHeight}
					options={{
						antialias: true,
						backgroundColor: backgroundColour
							? parseInt(backgroundColour.slice(1), 16)
							: 0xffffff
					}}
				>
					<AppConsumer>
						{(app): ReactNode => (
							<ViewportComponent
								name="viewport"
								ref={c => (this._viewport = c as any)}
								app={app}
								screenWidth={this.state.windowWidth}
								screenHeight={this.state.windowHeight}
								onZoom={x => this.setState({ viewportZoom: x })}
							>
								{/* <EditablePolygon
									editMode={false}
									polyPoints={[0, 0, 500, 500]}
									viewportZoom={this.state.viewportZoom}
								/> */}
								{groupedObjects.sort(layerSortFunc).map(
									(layer: GroupedMapObject): ReactNode => {
										return (
											<Container
												key={layer.name}
												name={`layer-${layer.name}`}
											>
												{layer.objects.map(o => {
													const isPc = !!o.pcId;
													const isNpc = !!o.npcId;
													const pcAsset = o.pcId
														? playerCharacters.find(
																x => x.id === o.pcId
														  )
														: null;
													const npcAsset = o.npcId
														? nonPlayerCharacters.find(
																x => x.id === o.npcId
														  )
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
													const dmOnly = o.dmOnly || false;
													const layer = o.layer;
													const visibility = dmOnly
														? dm
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
															isSelectable={
																dm &&
																!this.state.measuring &&
																!this.props.fogAddMode
															}
															onSelected={this.props.onSelectObject}
															mapObjectId={o.id}
															layerName={layer}
															visibility={visibility}
															viewportZoom={this.state.viewportZoom}
														/>
													) : (
														<Token
															key={o.id}
															resource={res}
															hp={
																o.hp ||
																(pcAsset
																	? {
																			value: pcAsset.hp,
																			max: pcAsset.maxHp
																	  }
																	: undefined)
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
															isSelectable={
																(pcAsset || dm) &&
																!this.state.measuring &&
																!this.props.fogAddMode
															}
															onSelected={this.props.onSelectObject}
															mapObjectId={o.id}
															layerName={layer}
															visibility={visibility}
															viewportZoom={this.state.viewportZoom}
														/>
													);
												})}
											</Container>
										);
									}
								)}
								<BasicFogLayer
									fogData={this.props.mapData && this.props.mapData.fog}
									dm={dm}
									editing={this.props.fogEditMode}
									viewportZoom={this.state.viewportZoom}
								/>
								{dm &&
									this.props.fogEditMode &&
									this.props.mapData &&
									Object.keys(this.props.mapData.fog.maskPolygons).length > 0 &&
									Object.keys(this.props.mapData.fog.maskPolygons).map(
										(xx, idx) => {
											const x = this.props.mapData.fog.maskPolygons[xx];
											return (
												<EditablePolygon
													key={idx}
													onUpdate={(position, points) => {
														this.props.onUpdateFogPolygon(
															this.props.mapData.id,
															xx,
															position,
															points
														);
													}}
													position={
														new PIXI.Point(x.position.x, x.position.y)
													}
													editMode={this.props.fogEditMode}
													polyPoints={x.points}
													viewportZoom={this.state.viewportZoom}
												/>
											);
										}
									)}
								<Ruler
									visible={this.state.measuring}
									measuring={this.state.measuring}
									start={this.state.measureStart}
									end={this.state.measureEnd}
									distance={this.state.measuredDistance}
									scale={this._viewport ? 1 / this._viewport.scale.x : 1}
									thickness={3}
								/>
								{Object.keys(this.props.mapPings).map(x => {
									const p = this.props.mapPings[x];
									return (
										<Ping
											key={x}
											// app={app}
											position={new PIXI.Point(p.position.x, p.position.y)}
											viewportZoom={this.state.viewportZoom}
										/>
									);
								})}
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
	drop(props: Props, monitor: DropTargetMonitor, component: Map) {
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
					const initialData: any = {
						position: { x: localCoords.x, y: localCoords.y }
					};
					if (item.assetType === 1) {
						const asset = props.nonPlayerCharacters.find(x => x.id === item.id);
						if (asset.hpDice) {
							const { DiceRoll } = require('rpg-dice-roller');
							const roll = Math.max(
								new DiceRoll(asset.hpDice.replace(/ /g, '')).total,
								1
							);

							initialData.hp = { value: roll, max: roll };
						}
					}
					props.onAddAssetToMap(props.mapData.id, item.assetType, item.id, initialData);
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
