import { types, PropertyPanelVisibilityAction, SidebarOpenPanelAction } from '../actions/ui';
import { OverlayPanelTypes } from '../../models/OverlayPanelTypes';

interface PropertyPanelState {
	visible: boolean;
}

interface State {
	propertyPanel: PropertyPanelState;
	sidebarOpen: boolean;
	sidebarPanel?: OverlayPanelTypes;
}

export const initialState: State = {
	propertyPanel: {
		visible: false
	},
	sidebarOpen: false,
	sidebarPanel: null
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
		case types.UI.SIDEBAR.OPEN:
			return {
				...state,
				sidebarOpen: true
			};
		case types.UI.SIDEBAR.CLOSE:
			return {
				...state,
				sidebarOpen: false
			};
		case types.UI.SIDEBAR.TOGGLE:
			return {
				...state,
				sidebarOpen: !state.sidebarOpen
			};
		case types.UI.SIDEBAR.OPEN_PANEL: {
			const a = action as SidebarOpenPanelAction;
			return {
				...state,
				sidebarPanel: a.panel
			};
		}
		default:
			return state;
	}
}
