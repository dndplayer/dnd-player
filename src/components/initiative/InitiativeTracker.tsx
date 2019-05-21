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

interface Props {
	currentTurnId?: string;
	initiatives: InitiativeData;
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	dm: boolean;
	images: Upload[];
	initiativeTrackerOpen: boolean;
	nextTurn: () => void;
	clearInitiatives: () => void;
	modifyHp: (newHp: number, pcId?: string, npcId?: string) => void;
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
			removeInitiative
		} = this.props;

		if (!initiatives || !initiatives.rolls) {
			return <div />;
		}

		const rolls = Object.keys(initiatives.rolls)
			.map(x => ({
				...initiatives.rolls[x],
				id: x
			}))
			.sort((a, b) => b.initiativeRoll - a.initiativeRoll);

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
							const char = x.pcId
								? playerCharacters.find(y => y.id === x.pcId)
								: x.npcId
								? nonPlayerCharacters.find(y => y.id === x.npcId)
								: null;

							if (!char) {
								return <div key={x.id} />; // TODO: Handle this better
							}

							const image = images.find(x => x.filePath === char.imageRef);

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
										isNpc={!!x.npcId}
										char={char}
										imageUrl={image ? image.downloadUrl : Unknown}
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
