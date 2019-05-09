import React, { Component, ReactNode, ReactElement } from 'react';
import { Stage, Sprite, Container, PixiComponent, AppConsumer, Graphics } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import Viewport from 'pixi-viewport';

import { MapData } from '../../models/Map';

import { DropTarget, DropTargetMonitor } from 'react-dnd';
import types from '../../constants/dragdroptypes';

import Token from './objects/Token';
import { Upload } from '../../models/Upload';
import { withStyles, WithStyles, LinearProgress } from '@material-ui/core';
import Scenery from './objects/Scenery';
import { groupObjectsByLayer } from './MapUtils';
import { PlayerCharacter, NonPlayerCharacter, CharacterSize } from '../../5e/models/Character';
import { MapObjectVisibility } from './objects/MapObject';
import Ruler from './objects/Ruler';

interface ViewportComponentProps {
	app?: PIXI.Application;
	name?: string;
}
const ViewportComponent = PixiComponent<ViewportComponentProps, Viewport>('Viewport', {
	create: props => {
		const v = new Viewport({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
			worldWidth: 1000,
			worldHeight: 1000,
			divWheel: props.app
				? props.app.renderer.plugins.interaction.interactionDOMElement
				: null,
			interaction: props.app ? props.app.renderer.plugins.interaction : null
		});

		v.name = props.name || 'viewport';

		v.drag({
			mouseButtons: 'right'
		})
			.pinch()
			.wheel({ smooth: 5 })
			.decelerate();

		return v;
	},
	applyProps: (instance, oldProps, newProps) => {
		if (oldProps.app !== newProps.app) {
		}
	}
});

const styles = theme => ({
	loadingWrapper: {
		position: 'absolute' as 'absolute', // Avoid type widening
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, 0)'
	},
	loadingText: {
		fontSize: '200%'
	},
	dragAddObjectWrapper: {
		position: 'absolute' as 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: 'rgba(0,0,0,0.4)'
	},
	dragAddObjectText: {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		color: 'white',
		transform: 'translate(-50%, -50%)',
		fontSize: 120
	}
});

interface CollectProps {
	connectDropTarget: any;
	itemType: typeof types;
	isHovering: boolean;
}

interface OwnProps extends WithStyles<typeof styles> {
	updateSpriteLocation: (sprite: Sprite) => void;
	mapData?: MapData;
	zoom?: number;
	selectedObjects: string[];
	// testMap: any;
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	onSelectObject: (data) => void;
	onUpdateObject: (data) => void;
	onAddAssetToMap: (data) => void;
	onAddImageToMap: (data) => void;
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
}
class Map extends Component<Props, State> {
	state = {
		loadingAssets: true,
		loadProgress: 0,
		app: null,
		measuring: false,
		measureStart: null,
		measureEnd: null
	};

	private app: any;
	private root: PIXI.Container;

	private _viewport: Viewport;
	private _stage: any;
	private _mainWrapper: HTMLElement;

	private loader: PIXI.loaders.Loader = PIXI.loader;

	componentDidUpdate(prevProps: Props, prevState: State): void {
		// This errors currently as it's run multiple times and tries to load the
		// same asset multiple times.

		if (prevState.loadingAssets && !this.state.loadingAssets) {
			if (this._viewport) {
				this._viewport.fitWorld();
			}
		}

		if (
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
						const npc = o.npcId
							? this.props.nonPlayerCharacters.find(y => y.id === o.npcId)
							: null;
						const imgRef =
							o && o.imageRef
								? o.imageRef
								: pc
								? pc.imageRef
								: npc
								? npc.imageRef
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
	}

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
				if (this.props.onSelectObject) {
					this.props.onSelectObject({ mapObjectId: null });
				}

				if (this.state.measuring) {
					this.setState({
						measureStart: e.data.global.clone(),
						measureEnd: e.data.global.clone()
					});
				}

				// TODO: Possibly also trigger a close of the sidebar if it's open
			}
		);
		app.stage.on(
			'mousemove',
			(e): void => {
				if (this.state.measuring && this.state.measureStart) {
					this.setState({ measureEnd: e.data.global.clone() });
				}
			}
		);
		app.stage.on(
			'mouseup',
			(e): void => {
				if (this.state.measuring) {
					this.setState({ measureStart: null, measureEnd: null });
				}
			}
		);
	};

	render(): ReactNode {
		const { classes, playerCharacters, nonPlayerCharacters, selectedObjects } = this.props;

		if (this.state.loadingAssets) {
			return (
				<div className={classes.loadingWrapper}>
					<div className={classes.loadingText}>LOADING...</div>
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
				<div className={classes.dragAddObjectWrapper}>
					<div className={classes.dragAddObjectText}>+</div>
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
				<input
					type="checkbox"
					checked={this.state.measuring}
					onChange={e => this.setState({ measuring: e.target.checked })}
					style={{ position: 'absolute', top: 0, left: 0 }}
				/>
				{this.state.measureEnd && (
					<div style={{ position: 'absolute', top: 0, left: '30px' }}>
						{(
							Math.pow(
								Math.pow(this.state.measureEnd.x - this.state.measureStart.x, 2) +
									Math.pow(
										this.state.measureEnd.y - this.state.measureStart.y,
										2
									),
								0.5
							) /
							this._viewport.scale.x /
							25
						).toFixed(1) + ' ft.'}
					</div>
				)}
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
																scale = { x: 0.25, y: 0.25 };
																break;
															case CharacterSize.Small:
																scale = { x: 0.5, y: 0.5 };
																break;
															case CharacterSize.Medium:
																scale = { x: 0.5, y: 0.5 };
																break;
															case CharacterSize.Large:
																scale = { x: 1, y: 1 };
																break;
															case CharacterSize.Huge:
																scale = { x: 1.5, y: 1.5 };
																break;
															case CharacterSize.Gargantuan:
																scale = { x: 2, y: 2 };
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
															onUpdateObject={
																this.props.onUpdateObject
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
															position={o.position}
															scale={scale}
															rotation={o.rotation}
															pivot={o.pivot}
															anchor={o.anchor}
															onUpdateObject={
																this.props.onUpdateObject
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
	drop(props, monitor: DropTargetMonitor, component) {
		const item = monitor.getItem();
		const type = monitor.getItemType();
		// console.log(`dropped [DROPPER]:`);
		// console.log(item);

		switch (type) {
			case types.PLAYER_CHARACTER_ASSET:
				if (props.onAddAssetToMap) {
					props.onAddAssetToMap({ assetType: item.assetType, assetId: item.id });
				}
				break;
			case types.UPLOAD_IMAGE:
				if (props.onAddImageToMap) {
					props.onAddImageToMap({ imageRef: item.imageRef });
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
)(withStyles(styles)(Map));
