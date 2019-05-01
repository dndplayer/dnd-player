import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AbilityScoreContainer from './AbilityScoreContainer';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
	const props = {
		sendMessage: jest.fn(),
		character: {
			id: 1,
			name: 'Test'
		} as any
	};

	const enzymeWrapper = shallow(<AbilityScoreContainer {...props} />);

	return {
		props,
		enzymeWrapper
	};
}

describe('AbilityScoreContainer', () => {
	it('should have 6 AbilityScores"', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find('AbilityScore')).toHaveLength(6);
	});
});
