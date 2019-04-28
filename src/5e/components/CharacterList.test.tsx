import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CharacterList } from './CharacterList';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
	const props = {
		characters: [{ id: 1, name: 'Test' }, { id: 2, name: 'Test2' }],
		openCharacterSheet: jest.fn()
	};

	const enzymeWrapper = shallow(<CharacterList {...props} />);

	return {
		props,
		enzymeWrapper
	};
}

describe('components', () => {
	describe('CharacterList', () => {
		it('should render self and subcomponents', () => {
			const { enzymeWrapper } = setup();

			expect(
				enzymeWrapper
					.find('div.character')
					.first()
					.text()
			).toBe('Test');
			expect(enzymeWrapper.find('div.character')).toHaveLength(2);
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
});
