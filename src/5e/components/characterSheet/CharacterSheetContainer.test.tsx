import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CharacterSheetContainer } from './CharacterSheetContainer';

Enzyme.configure({ adapter: new Adapter() });

function getProps() {
	return {
		popout: '',
		sendPlayerCharacterUpdate: jest.fn(),
		sendNonPlayerCharacterUpdate: jest.fn(),
		sendMessage: jest.fn(),
		closeCharacterSheet: jest.fn(),
		openCharacterSheets: [],
		playerCharacters: [],
		nonPlayerCharacters: [],
		updatePlayerCharacter: jest.fn(),
		updateNonPlayerCharacter: jest.fn(),
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
	it('should add a NonPlayerCharacterSheet for non player characters', () => {
		const props = getProps();
		props.nonPlayerCharacters.push({ id: 'test1' });
		props.openCharacterSheets.push('test1');
		const { enzymeWrapper } = setup(props);

		expect(enzymeWrapper.find('NonPlayerCharacterSheet')).toHaveLength(1);
		expect(enzymeWrapper.find('PlayerCharacterSheet')).toHaveLength(0);
	});
	it('should add a PlayerCharacterSheet for player characters', () => {
		const props = getProps();
		props.playerCharacters.push({ id: 'test2' });
		props.openCharacterSheets.push('test2');
		const { enzymeWrapper } = setup(props);

		expect(enzymeWrapper.find('PlayerCharacterSheet')).toHaveLength(1);
		expect(enzymeWrapper.find('NonPlayerCharacterSheet')).toHaveLength(0);
	});
});
