import { types, PropertyPanelVisibilityAction, SidebarOpenPanelAction } from '../actions/ui';
import { OverlayPanelTypes } from '../../models/OverlayPanelTypes';

interface PropertyPanelState {
	visible: boolean;
}

interface State {
	propertyPanel: PropertyPanelState;
	sidebarOpen: boolean;
	sidebarPanel?: OverlayPanelTypes;
	initiativeTrackerOpen: boolean;
}

export const initialState: State = {
	propertyPanel: {
		visible: false
	},
	sidebarOpen: false,
	sidebarPanel: null,
	initiativeTrackerOpen: false
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
		case types.UI.INITIATIVE_TRACKER.OPEN:
			return {
				...state,
				initiativeTrackerOpen: true
			};
		case types.UI.INITIATIVE_TRACKER.CLOSE:
			return {
				...state,
				initiativeTrackerOpen: false
			};
		case types.UI.INITIATIVE_TRACKER.TOGGLE:
			return {
				...state,
				initiativeTrackerOpen: !state.initiativeTrackerOpen
			};
		default:
			return state;
	}
}
