import { CharacterSize } from '../../5e/models/Character';

export const GetDefaultTestData = (): any => [
	{
		currentTurn: false,
		initiativeRoll: 6,
		character: {
			id: '123123',
			name: 'test',
			imageRef: 'https://placekitten.com/128/128',
			size: CharacterSize.Medium,
			strength: 0,
			dexterity: 0,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0,
			speed: {
				walk: 60
			}
		}
	},
	{
		currentTurn: true,
		initiativeRoll: 19,
		character: {
			id: '999999',
			name: 'someone else',
			imageRef: 'https://placekitten.com/64/64',
			size: CharacterSize.Large,
			strength: 0,
			dexterity: 0,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0,
			speed: {
				walk: 60
			}
		}
	},
	{
		currentTurn: false,
		initiativeRoll: 9,
		character: {
			id: '222222',
			name: 'test c',
			imageRef: 'https://placekitten.com/96/96',
			size: CharacterSize.Gargantuan,
			strength: 0,
			dexterity: 0,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0,
			speed: {
				walk: 60
			}
		}
	}
];
