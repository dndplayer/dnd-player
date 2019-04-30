import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AssetListItem from './AssetListItem';
import { AssetType } from '../../models/AssetType';
import css from './AssetListItem.module.css';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
	const props = {
		asset: { id: 'testId', name: 'testAsset' },
		assetType: AssetType.PlayerCharacter,
		images: [],
		openCharacterSheet: jest.fn()
	};

	const enzymeWrapper = shallow(<AssetListItem {...props} />);

	return {
		props,
		enzymeWrapper
	};
}

describe('AssetListItem', () => {
	it('should call openCharacterSheet with the asset id on click', () => {
		const { enzymeWrapper } = setup();
		enzymeWrapper.find(`div.${css.title}`).simulate('click');
		expect(enzymeWrapper.instance().props.openCharacterSheet).toHaveBeenCalledWith('testId');
	});
	it('should contain the asset name', () => {
		const { enzymeWrapper } = setup();
		expect(enzymeWrapper.find(`div.${css.title}`).text()).toBe('testAsset');
	});
});
