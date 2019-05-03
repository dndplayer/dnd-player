import { types, PropertyPanelVisibilityAction } from '../actions/ui';

interface PropertyPanelState {
	visible: boolean;
}

interface State {
	propertyPanel: PropertyPanelState;
}

const initialState: State = {
	propertyPanel: {
		visible: false
	}
};

export default function uiReducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case types.UI.PROPERTY_PANEL.VISIBILITY:
			const a = action as PropertyPanelVisibilityAction;
			return {
				...state,
				propertyPanel: {
					...state.propertyPanel,
					visible: a.visible
				}
			};
		default:
			return state;
	}
}
