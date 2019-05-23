import React, { ReactNode } from 'react';

import { ChatMessageData, RollData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.scss';
import { NonPlayerCharacter } from '../../../models/Character';
import { Upload } from '../../../../models/Upload';
import CharacterImage from '../CharacterImage';
import AbilityScoreContainer from './AbilityScoreContainer';
import Skills from './Skills';
import Traits from './Traits';
import Actions from './Actions';
import Senses from './Senses';
import { Icon } from '@mdi/react';
import { mdiFileDocumentEdit, mdiSwordCross } from '@mdi/js';
import Rules from '../../../5eRules';
import Speeds from './Speeds';
import SavingThrows from './SavingThrows';
import InlineCalculator from '../../../../components/util/InlineCalculator';
import { DiceRoll } from 'rpg-dice-roller';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) => void;
	editNonPlayerCharacter?: (characterId: string) => void;
	character: NonPlayerCharacter;
	characterId: string;
	image: Upload;
	inline?: boolean;
	tokenId?: string;
}

export default class NonPlayerCharacterSheet extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character, editNonPlayerCharacter, characterId, inline } = this.props;
		return (
			<div className={`${css.column} ${css.characterSheet} ${inline ? css.inline : ''}`}>
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
				<div className={`${css.characterName} ${css.row}`}>
					<span>{character.name}</span>
					<div onClick={(): void => this.rollInitiative(0)} className={css.button}>
						<Icon path={mdiSwordCross} size={1} color={'#a6792d'} />
					</div>
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
					{(character.maxHp && (
						<span className={css.row}>
							<InlineCalculator
								value={character.hp}
								onEnter={v =>
									this.props.updateNonPlayerCharacter(this.props.characterId, {
										...this.props.character,
										hp: v
									})
								}
							/>{' '}
							/{' '}
							<InlineCalculator
								value={character.maxHp}
								onEnter={v =>
									this.props.updateNonPlayerCharacter(this.props.characterId, {
										...this.props.character,
										maxHp: v
									})
								}
							/>
						</span>
					)) || <span>{character.hpDice}</span>}
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

	rollInitiative(advantage: number): void {
		const modifier = Rules.getInitiativeModifier(this.props.character);
		const modifierStr = (modifier < 0 ? '' : '+') + modifier;
		const roll = new DiceRoll('d20' + modifierStr);

		const data: RollData = {
			pcId: null,
			npcTokenId: this.props.tokenId,
			type: 'roll',
			characterName: this.props.character.name,
			rollType: 'Initiative',
			rollName: 'Initiative',
			modifier: modifierStr,
			roll1Total: roll.total,
			roll1Details: roll.toString().match(/.*?: (.*?) =/)[1],
			roll1CritSuccess: roll.rolls[0][0] === 20,
			roll1CritFail: roll.rolls[0][0] === 1
		};

		if (advantage) {
			const roll2 = new DiceRoll('d20' + modifierStr);
			data.rollAdvantageType = advantage;
			data.roll2Total = roll2.total;
			data.roll2Details = roll2.toString().match(/.*?: (.*?) =/)[1];
			data.roll2CritSuccess = roll2.rolls[0][0] === 20;
			data.roll2CritFail = roll2.rolls[0][0] === 1;
		}

		this.props.sendMessage('', data);
	}
}
