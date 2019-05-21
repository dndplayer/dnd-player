import React, { Component, ReactNode, ReactElement } from 'react';

import styles from './InitiativeTracker.module.scss';
import InitiativeToken from './InitiativeToken';
import { InitiativeRoller } from '../../models/Initiative';
import { Fab } from '@material-ui/core';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';
import { Upload } from '../../models/Upload';

import Unknown from './unknown.png';

interface Props {
	currentTurnId?: string;
	initiatives: InitiativeRoller[];
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	dm: boolean;
	images: Upload[];
	nextTurn: () => void;
	modifyHp: (pcId: string | null, npcId: string | null, newHp: number) => void;
}

export default class InitiativeTracker extends Component<Props> {
	render(): ReactNode {
		const {
			nonPlayerCharacters,
			playerCharacters,
			initiatives,
			images,
			currentTurnId,
			modifyHp
		} = this.props;

		return (
			<div className={styles.trackerWrapper}>
				<div className={styles.tokenWrapper}>
					{initiatives.map(
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
								<InitiativeToken
									key={x.id}
									isPc={!!x.pcId}
									isNpc={!!x.npcId}
									char={char}
									imageUrl={image ? image.downloadUrl : Unknown}
									initRoll={x.initiativeRoll}
									currentTurn={isTurn}
									modifyHp={modifyHp}
								/>
							);
						}
					)}
				</div>
				<div className={styles.backLine} />
				{this.props.dm && (
					<Fab
						color="secondary"
						size="small"
						aria-label="Next Turn"
						className={styles.nextButton}
						onClick={this.props.nextTurn}
					>
						<SkipNextIcon />
					</Fab>
				)}
			</div>
		);
	}
}
