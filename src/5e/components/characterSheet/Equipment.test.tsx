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

	/*it('should call addTodo if length of text is greater than 0', () => {
		const { enzymeWrapper, props } = setup();
		const input = enzymeWrapper.find('TodoTextInput');
		input.props().onSave('');
		expect(props.addTodo.mock.calls.length).toBe(0);
		input.props().onSave('Use Redux');
		expect(props.addTodo.mock.calls.length).toBe(1);
	});*/
});
