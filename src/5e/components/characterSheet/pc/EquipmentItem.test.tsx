import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EquipmentItem from './EquipmentItem';
import styles from './EquipmentItem.module.scss';

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
		},
		item: {
			name: 'Item1'
		}
	};

	const enzymeWrapper = shallow(<EquipmentItem {...props} />);

	return {
		props,
		enzymeWrapper
	};
}

describe('EquipmentItem', () => {
	it('should render self and subcomponents', () => {
		const { enzymeWrapper } = setup();

		expect(enzymeWrapper.find(`span.${styles.name}`).text()).toBe('Item1');
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
