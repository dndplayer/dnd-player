import { OverlayPanelTypes } from '../../models/OverlayPanelTypes';
import {
	UI_PROPERTY_PANEL_VISIBILITY,
	Actions,
	UI_SIDEBAR_OPEN,
	UI_SIDEBAR_CLOSE,
	UI_SIDEBAR_TOGGLE,
	UI_SIDEBAR_OPEN_PANEL
} from '../actions/ui';

interface PropertyPanelState {
	visible: boolean;
}

interface State {
	propertyPanel: PropertyPanelState;
	sidebarOpen: boolean;
	sidebarPanel: OverlayPanelTypes;
}

const initialState: State = {
	propertyPanel: {
		visible: false
	},
	sidebarOpen: false,
	sidebarPanel: null
};

export default function uiReducer(state = initialState, action: Actions): State {
	switch (action.type) {
		case UI_PROPERTY_PANEL_VISIBILITY:
			return {
				...state,
				propertyPanel: {
					...state.propertyPanel,
					visible: action.payload
				}
			};
		case UI_SIDEBAR_OPEN:
			return {
				...state,
				sidebarOpen: true
			};
		case UI_SIDEBAR_CLOSE:
			return {
				...state,
				sidebarOpen: false
			};
		case UI_SIDEBAR_TOGGLE:
			return {
				...state,
				sidebarOpen: !state.sidebarOpen
			};
		case UI_SIDEBAR_OPEN_PANEL: {
			return {
				...state,
				sidebarPanel: action.payload
			};
		}
		default:
			return state;
	}
}
