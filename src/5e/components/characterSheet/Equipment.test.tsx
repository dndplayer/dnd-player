import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Equipment from './Equipment';

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

	const enzymeWrapper = shallow(<Equipment {...props} />);

	return {
		props,
		enzymeWrapper
	};
}

describe('Equipment', () => {
	it('should render self and subcomponents', () => {
		const { enzymeWrapper } = setup();

		expect(enzymeWrapper.find('EquipmentItem')).toHaveLength(2);
	});
});
