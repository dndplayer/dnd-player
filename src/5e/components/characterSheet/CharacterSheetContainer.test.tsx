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
		editingCharacterSheets: [],
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
	it('should add a NonPlayerCharacterSheetWrapper for non player characters', () => {
		const props = getProps();
		props.nonPlayerCharacters.push({ id: 'test1' });
		props.popout = 'test1';
		const { enzymeWrapper } = setup(props);

		expect(enzymeWrapper.find('NonPlayerCharacterSheetWrapper')).toHaveLength(1);
		expect(enzymeWrapper.find('PlayerCharacterSheet')).toHaveLength(0);
	});
	it('should add a PlayerCharacterSheet for player characters', () => {
		const props = getProps();
		props.playerCharacters.push({ id: 'test2' });
		props.popout = 'test2';
		const { enzymeWrapper } = setup(props);

		expect(enzymeWrapper.find('PlayerCharacterSheet')).toHaveLength(1);
		expect(enzymeWrapper.find('NonPlayerCharacterSheetWrapper')).toHaveLength(0);
	});
});
