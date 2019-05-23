import React, { Component, ReactNode, ReactElement, Ref } from 'react';

import styles from './InitiativeTracker.module.scss';
import InitiativeToken from './InitiativeToken';
import { InitiativeRoller, InitiativeData } from '../../models/Initiative';
import { Fab } from '@material-ui/core';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ClearIcon from '@material-ui/icons/Clear';
import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';
import { Upload } from '../../models/Upload';

import Unknown from './unknown.png';
import { orderInitiatives } from './InitiativeHelpers';
import { MapData } from '../../models/Map';
import { MapObject } from '../../models/Map';

interface Props {
	currentTurnId?: string;
	initiatives: InitiativeData;
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	map?: MapData;
	dm: boolean;
	images: Upload[];
	initiativeTrackerOpen: boolean;
	nextTurn: () => void;
	clearInitiatives: () => void;
	modifyHp: (newHp: any, pcId?: string, npcTokenId?: string) => void;
	removeInitiative: (id: string) => void;
}

export default class InitiativeTracker extends Component<Props> {
	private _activeRef: HTMLElement;

	componentDidUpdate(prevProps: Props, prevState) {
		if (prevProps.currentTurnId !== this.props.currentTurnId) {
			if (this._activeRef) {
				this._activeRef.scrollIntoView();
			}
		}
	}

	render(): ReactNode {
		const {
			nonPlayerCharacters,
			playerCharacters,
			initiatives,
			images,
			currentTurnId,
			modifyHp,
			dm,
			removeInitiative,
			map
		} = this.props;

		if (!initiatives || !initiatives.rolls) {
			return <div />;
		}

		const rolls = orderInitiatives(
			initiatives,
			this.props.playerCharacters,
			this.props.nonPlayerCharacters,
			true
		);

		return (
			<div
				className={[
					styles.trackerWrapper,
					this.props.dm ? styles.dm : '',
					this.props.initiativeTrackerOpen ? styles.hidden : ''
				].join(' ')}
			>
				<div className={styles.tokenWrapper}>
					{rolls.map(
						(x): ReactElement => {
							const npcToken: MapObject = x.npcTokenId
								? map.objects[x.npcTokenId] || null
								: null;

							const char = x.pcId
								? playerCharacters.find(y => y.id === x.pcId)
								: npcToken && npcToken.npcId
								? nonPlayerCharacters.find(y => y.id === npcToken.npcId)
								: null;

							if (!char) {
								// return <div key={x.id} />; // TODO: Handle this better
							}

							// THIS IS HACKY
							const image = char
								? images.find(x => x.filePath === char.imageRef)
								: null;

							const imageUrl = image
								? image.downloadUrl
								: char.imageRef && char.imageRef.startsWith('http')
								? char.imageRef
								: Unknown;

							const isTurn = currentTurnId === x.id;

							return (
								<div
									key={x.id}
									ref={r => {
										if (isTurn) {
											this._activeRef = r;
										}
									}}
								>
									<InitiativeToken
										// key={x.id}
										initId={x.id}
										isPc={!!x.pcId}
										isNpc={!!x.npcTokenId}
										char={char}
										npcTokenId={x.npcTokenId}
										npcToken={npcToken}
										imageUrl={imageUrl}
										initRoll={x.initiativeRoll}
										currentTurn={isTurn}
										modifyHp={modifyHp}
										dm={dm}
										removeInitiative={removeInitiative}
									/>
								</div>
							);
						}
					)}
				</div>
				<div className={styles.backLine} />
				{this.props.dm && (
					<div className={styles.buttonWrapper}>
						<Fab
							color="secondary"
							size="small"
							aria-label="Next Turn"
							className={styles.nextButton}
							onClick={this.props.nextTurn}
						>
							<SkipNextIcon />
						</Fab>
						<Fab
							color="primary"
							size="small"
							aria-label="Clear Initiative"
							className={styles.clearButton}
							onClick={this.props.clearInitiatives}
						>
							<ClearIcon />
						</Fab>
					</div>
				)}
			</div>
		);
	}
}
