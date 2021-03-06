import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CharacterSheetContainer } from './CharacterSheetContainer';

Enzyme.configure({ adapter: new Adapter() });

function getProps() {
	return {
		activeCharacterSheetId: null,
		sendPlayerCharacterUpdate: jest.fn(),
		sendNonPlayerCharacterUpdate: jest.fn(),
		sendMessage: jest.fn(),
		editingCharacterSheets: [],
		playerCharacters: [],
		nonPlayerCharacters: [],
		nonPlayerCharactersIndex: [],
		updatePlayerCharacter: jest.fn(),
		updateNonPlayerCharacter: jest.fn(),
		loadFullNonPlayerCharacter: jest.fn(),
		images: []
	};
}

function setup(props?) {
	props = props || getProps();
	const enzymeWrapper = shallow(<CharacterSheetContainer {...props} />);

	return {
		props,
		enzymeWrapper
	};
}

describe('CharacterSheetContainer', () => {
	it('should add a WindowPortal for non player characters', () => {
		const props = getProps();
		props.nonPlayerCharacters.push({ id: 'test1' });
		props.nonPlayerCharactersIndex.push({ id: 'test1' });
		props.activeCharacterSheetId = 'test1';
		const { enzymeWrapper } = setup(props);

		expect(enzymeWrapper.find('WindowPortal')).toHaveLength(1);
	});
	it('should add a WindowPortal for player characters', () => {
		const props = getProps();
		props.playerCharacters.push({ id: 'test2' });
		props.activeCharacterSheetId = 'test2';
		const { enzymeWrapper } = setup(props);

		expect(enzymeWrapper.find('WindowPortal')).toHaveLength(1);
	});
});
