import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.css';
import { Character, NonPlayerCharacter } from '../../../models/Character';
import { Upload } from '../../../../models/Upload';
import CharacterImage from '../CharacterImage';
import AbilityScoreContainer from './AbilityScoreContainer';
import Skills from './Skills';
import Features from './Features';
import Actions from './Actions';
import Senses from './Senses';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
	editNonPlayerCharacter: (characterId: string) => void;
	character: NonPlayerCharacter;
	popout?: string;
	image: Upload;
}

export default class NonPlayerCharacterSheet extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character, editNonPlayerCharacter } = this.props;
		return (
			<div className={`column ${css.characterSheet} ${this.props.popout ? 'popout' : ''}`}>
				<div className="character-edit" onClick={e => editNonPlayerCharacter(character.id)}>
					EDIT
				</div>
				<div className={css.characterImageContainer}>
					<CharacterImage
						imageUrl={this.props.image ? this.props.image.downloadUrl : null}
						character={character}
						updateCharacter={this.props.updateNonPlayerCharacter}
					/>
				</div>
				<div className={css.characterName}>{character.name}</div>
				<div className={css.characterType}>
					{character.class}, {character.alignment}
				</div>
				<hr className={css.divider} />
				<div>
					<span className={css.boldHeading}>Armor Class</span>
					<span>
						{character.ac} ({character.acType})
					</span>
				</div>
				<div>
					<span className={css.boldHeading}>Hit Points</span>
					<span>{character.hpDice}</span>
				</div>
				<div>
					<span className={css.boldHeading}>Speed</span>
					<span>{(character.speed && character.speed.walk) || 0} ft.</span>
				</div>
				<hr className={css.divider} />
				<AbilityScoreContainer {...this.props} />
				<hr className={css.divider} />
				<Skills {...this.props} />
				<Senses {...this.props} />
				<div>
					<span className={css.boldHeading}>Languages</span>
					<span>{(character.languages || []).join(', ')}</span>
				</div>
				<div>
					<span className={css.boldHeading}>Challenge</span>
					<span>{character.cr}</span>
				</div>
				<hr className={css.divider} />
				<Features {...this.props} />
				<div className={css.subheading}>Actions</div>
				<Actions {...this.props} />
			</div>
		);
	}
}
