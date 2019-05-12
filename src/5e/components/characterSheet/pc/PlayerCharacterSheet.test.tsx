import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CharacterSheet from './PlayerCharacterSheet';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
	const props = {
		character: {
			id: 1,
			name: 'Test',
			equipment: [
				{
					name: 'Item1'
				},
				{
					name: 'Item2'
				}
			]
		}
	};

	const enzymeWrapper = shallow(<CharacterSheet {...props} />);

	return {
		props,
		enzymeWrapper
	};
}

describe('CharacterSheet', () => {
	it('should add the popout class', () => {
		const { enzymeWrapper } = setup();

		expect(enzymeWrapper.find('div.character-sheet').hasClass('popout')).toBe(true);
	});
});
