import React, { Component, ReactNode, ReactElement } from 'react';
import { Stage, Sprite, Container, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import Viewport from 'pixi-viewport';

import { MapData } from '../../models/Map';

import { DropTarget, DropTargetMonitor } from 'react-dnd';
import types from '../../constants/dragdroptypes';

import TESTDATA from './testMap.json';
import { PlayerCharacterData, NonPlayerCharacterData } from '../../models/Asset';
import Token from './objects/Token';
import { Upload } from '../../models/Upload';
import { withStyles, WithStyles, LinearProgress } from '@material-ui/core';
import Scenery from './objects/Scenery';

const ViewportComponent = PixiComponent('Viewport', {
	create: props => {
		const v = new Viewport({
			screenWidth: window.innerWidth * 0.75,
			screenHeight: window.innerHeight,
			worldWidth: 1000,
			worldHeight: 1000

			// !TODO: This line is important and needed BUT we don't have app here!
			//interaction: app.renderer.plugins.interaction
		});

		v.drag({
			mouseButtons: 'right'
		})
			.pinch()
			.wheel()
			.decelerate();

		return v;
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
	}
});

interface CollectProps {
	connectDropTarget: any;
	itemType: typeof types;
}

interface OwnProps extends WithStyles<typeof styles> {
	updateSpriteLocation: (sprite: Sprite) => void;
	mapData?: MapData;
	zoom?: number;
	// testMap: any;
	playerCharacters: PlayerCharacterData[];
	nonPlayerCharacters: NonPlayerCharacterData[];
	onUpdateObject: (data) => void;
	onAddAssetToMap: (data) => void;
	onAddImageToMap: (data) => void;
	images: Upload[];
}

type Props = CollectProps & OwnProps;

interface State {
	loadingAssets: boolean;
	loadProgress: number;
}
class Map extends Component<Props, State> {
	state = {
		loadingAssets: true,
		loadProgress: 0
	};

	private app: any;
	private root: PIXI.Container;

	private loader: PIXI.loaders.Loader = PIXI.loader;

	/**
	 * Loader:
	 *  * [ ] At map first load, load all the images used in the map
	 *  * [ ] When new assets are added to the map they need to be loaded too
	 *  * [-] Load resources with name->downloadUrl mapping
	 *    * [-] This then means we need to use name refs in asset / mapObjects, then
	 *      the loader would look these up in the images database and add them to
	 *      the loader.add array.
	 *  * [-] Change Assets image ref to use name or filePath? (Name may not be unique)
	 * 	  * [-] Perhaps make the file path upload/{name}/{guid} so refs are still somewhat readable
	 **/

	componentDidUpdate(prevProps, prevState): void {
		// This errors currently as it's run multiple times and tries to load the
		// same asset multiple times.

		if (this.props.images != prevProps.images) {
			// TODO: Instead of loading ALL images EVERY time the props.images changes,
			//       only load those in use on this map
			// const loader = PIXI.loader;
			if (!this.loader.resources['__missing__']) {
				this.loader.add('__missing__', 'http://placekitten.com/128/128');
			}

			this.setState({ loadingAssets: true });

			const assetsToLoad = this.props.images
				.map(
					(x): any => {
						const alreadyExists = !!this.loader.resources[x.filePath];
						if (alreadyExists) return null;
						return {
							name: x.filePath,
							url: x.downloadUrl,
							loadType: 2 //PIXI.loaders.LOAD_TYPE.IMAGE
						};
					}
				)
				.filter((x): any => x); // Remove Nulls I.E. already loaded
			this.loader.add(assetsToLoad);
			this.loader.load(
				(): void => {
					this.setState({ loadingAssets: false });
				}
			);

			this.loader.onProgress.add(x => this.setState({ loadProgress: x.progress }));
		}
	}

	render(): ReactNode {
		const { classes, playerCharacters, nonPlayerCharacters } = this.props;

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
		const { background, tokens } = this.props.mapData.layers;

		const { connectDropTarget } = this.props;

		// TODO: A-lot of the code below repeats for each layer, it's not very DRY.
		//       Creating a custom LayerContainer element would help encapsulate that
		//       logic.

		return connectDropTarget(
			<div>
				<Stage
					// onMount={this.onMapMount}
					width={window.innerWidth * 0.75}
					height={window.innerHeight}
				>
					<ViewportComponent>
						<Container name="layer-background">
							{Object.keys(background.mapObjects).map(
								(mapObjId): ReactElement => {
									const o = background.mapObjects[mapObjId];
									const pcAsset = o.pcId
										? playerCharacters.find(x => x.id === o.pcId)
										: null;
									const npcAsset = o.npcId
										? nonPlayerCharacters.find(x => x.id === o.npcId)
										: null;
									const imageUrl =
										pcAsset && pcAsset.imageRef
											? pcAsset.imageRef
											: npcAsset && npcAsset.imageRef
											? npcAsset.imageRef
											: o.imageRef || '__missing__';
									const res = PIXI.loader.resources[imageUrl].texture;
									return (
										<Scenery
											key={mapObjId}
											position={o.position}
											scale={o.scale}
											rotation={o.rotation}
											pivot={o.pivot}
											anchor={o.anchor}
											resource={res}
											onUpdateObject={this.props.onUpdateObject}
											mapObjectId={mapObjId}
											layerName="background"
										/>
									);
								}
							)}
						</Container>
						<Container name="layer-tokens">
							{tokens &&
								tokens.mapObjects &&
								Object.keys(tokens.mapObjects).map(
									(mapObjId): ReactElement => {
										const o = tokens.mapObjects[mapObjId];
										const isPc = !!o.pcId;
										const isNpc = !!o.npcId;
										const pcAsset = isPc
											? playerCharacters.find(x => x.id === o.pcId)
											: null;
										const npcAsset = isNpc
											? nonPlayerCharacters.find(x => x.id === o.npcId)
											: null;
										const imageUrl =
											pcAsset && pcAsset.imageRef
												? pcAsset.imageRef
												: npcAsset && npcAsset.imageRef
												? npcAsset.imageRef
												: o.imageRef || '__missing__';
										const res = PIXI.loader.resources[imageUrl].texture;
										return (
											<Token
												key={mapObjId}
												resource={res}
												hp={o.hp || { value: 30, max: 60 }}
												position={o.position}
												scale={o.scale}
												rotation={o.rotation}
												pivot={o.pivot}
												anchor={o.anchor}
												onUpdateObject={this.props.onUpdateObject}
												mapObjectId={mapObjId}
												layerName="tokens"
											/>
										);
									}
								)}
						</Container>
					</ViewportComponent>
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
		console.log(`dropped [DROPPER]:`);
		console.log(item);

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
		itemType: monitor.getItemType() as any
	};
}

export default DropTarget(
	[types.PLAYER_CHARACTER_ASSET, types.UPLOAD_IMAGE],
	mapTargetSpec,
	collect
)(withStyles(styles)(Map));
