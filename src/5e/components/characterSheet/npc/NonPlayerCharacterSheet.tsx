import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.css';
import { Character, NonPlayerCharacter } from '../../../models/Character';
import { Upload } from '../../../../models/Upload';
import CharacterImage from '../CharacterImage';
import AbilityScoreContainer from './AbilityScoreContainer';
import Skills from './Skills';
import Traits from './Traits';
import Actions from './Actions';
import Senses from './Senses';
import { Icon } from '@mdi/react';
import { mdiFileDocumentEdit } from '@mdi/js';
import Rules from '../../../5eRules';
import Speeds from './Speeds';
import SavingThrows from './SavingThrows';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
	editNonPlayerCharacter?: (characterId: string) => void;
	character: NonPlayerCharacter;
	characterId: string;
	image: Upload;
	inline?: boolean;
}

export default class NonPlayerCharacterSheet extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character, editNonPlayerCharacter, characterId, inline } = this.props;
		return (
			<div className={`column ${css.characterSheet} ${inline ? css.inline : ''} popout`}>
				{!inline && (
					<div className={css.characterImageContainer}>
						<CharacterImage
							imageUrl={
								this.props.image ? this.props.image.downloadUrl : character.imageRef
							}
							character={character}
							characterId={characterId}
							updateCharacter={this.props.updateNonPlayerCharacter}
						/>
					</div>
				)}
				<div className={css.characterName + ' row'}>
					<span>{character.name}</span>
					{this.props.editNonPlayerCharacter && (
						<div
							onClick={() => editNonPlayerCharacter(characterId)}
							className={css.button}
						>
							<Icon path={mdiFileDocumentEdit} size={1} color={'#a6792d'} />
						</div>
					)}
				</div>
				<div className={css.characterType}>
					{Rules.getSizeName(character.size)} {character.class}, {character.alignment}
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
				<Speeds {...this.props} />
				<hr className={css.divider} />
				<AbilityScoreContainer {...this.props} />
				<hr className={css.divider} />
				<SavingThrows {...this.props} />
				<Skills {...this.props} />
				{character.damageResistances && (
					<div>
						<span className={css.boldHeading}>Damage Resistances</span>
						<span>{character.damageResistances}</span>
					</div>
				)}
				{character.damageImmunities && (
					<div>
						<span className={css.boldHeading}>Damage Immunities</span>
						<span>{character.damageImmunities}</span>
					</div>
				)}
				{character.conditionImmunities && (
					<div>
						<span className={css.boldHeading}>Condition Immunities</span>
						<span>{character.conditionImmunities}</span>
					</div>
				)}
				<Senses {...this.props} />
				<div>
					<span className={css.boldHeading}>Languages</span>
					<span>{character.languages}</span>
				</div>
				<div>
					<span className={css.boldHeading}>Challenge</span>
					<span>{character.cr}</span>
				</div>
				<hr className={css.divider} />
				<Traits {...this.props} />
				{character.actions && character.actions.length && (
					<div>
						<div className={css.subheading}>Actions</div>
						<Actions actionProperty="actions" {...this.props} />
					</div>
				)}
				{character.reactions && character.reactions.length && (
					<div>
						<div className={css.subheading}>Reactions</div>
						<Actions actionProperty="reactions" {...this.props} />
					</div>
				)}
				{character.legendaryActions && character.legendaryActions.length && (
					<div>
						<div className={css.subheading}>Legendary Actions</div>
						<div style={{ marginBottom: '8px' }}>{`The ${
							character.name
						} can take ${character.legendaryActionCount ||
							1} legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The ${
							character.name
						} regains spent legendary actions at the start of its turn.`}</div>
						<Actions actionProperty="legendaryActions" {...this.props} />
					</div>
				)}
			</div>
		);
	}
}
