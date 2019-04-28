import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CharacterSheet from './CharacterSheet';

Enzyme.configure({ adapter: new Adapter() });

function setup(popout: boolean) {
	const props = {
		popout: popout ? 'popout' : '',
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
	it('should add the popout class if props.popout == "popout"', () => {
		const { enzymeWrapper } = setup(true);

		expect(enzymeWrapper.find('div.character-sheet').hasClass('popout')).toBe(true);
	});
	it('should not add the popout class if props.popout != "popout"', () => {
		const { enzymeWrapper } = setup(false);

		expect(enzymeWrapper.find('div.character-sheet').hasClass('popout')).toBe(false);
	});
});
