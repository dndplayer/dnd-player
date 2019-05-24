import {
	types,
	PropertyPanelVisibilityAction,
	SidebarOpenPanelAction,
	SoundsMuteAction
} from '../actions/ui';
import { OverlayPanelTypes } from '../../models/OverlayPanelTypes';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface PropertyPanelState {
	visible: boolean;
}

interface State {
	propertyPanel: PropertyPanelState;
	sidebarOpen: boolean;
	sidebarPanel?: OverlayPanelTypes;
	initiativeTrackerOpen: boolean;
	userListOpen: boolean;
	soundsMuted: boolean;
}

export const initialState: State = {
	propertyPanel: {
		visible: false
	},
	sidebarOpen: false,
	sidebarPanel: null,
	initiativeTrackerOpen: false,
	userListOpen: true,
	soundsMuted: false
};

function uiReducer(state = initialState, action: any = {}) {
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
		case types.UI.USER_LIST.OPEN:
			return {
				...state,
				userListOpen: true
			};
		case types.UI.USER_LIST.CLOSE:
			return {
				...state,
				userListOpen: false
			};
		case types.UI.USER_LIST.TOGGLE:
			return {
				...state,
				userListOpen: !state.userListOpen
			};
		case types.UI.SOUNDS.MUTE: {
			const a = action as SoundsMuteAction;
			return {
				...state,
				soundsMuted: a.val !== undefined && a.val !== null ? a.val : true
			};
		}
		case types.UI.SOUNDS.UNMUTE:
			return {
				...state,
				soundsMuted: false
			};
		case types.UI.SOUNDS.TOGGLE_MUTED:
			return {
				...state,
				soundsMuted: !state.soundsMuted
			};
		default:
			return state;
	}
}

const persistConfig = {
	key: 'ui',
	storage
};
export default persistReducer(persistConfig, uiReducer);
