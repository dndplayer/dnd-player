import { Action } from 'redux';
import { OverlayPanelTypes } from '../../models/OverlayPanelTypes';

export const types = {
	UI: {
		PROPERTY_PANEL: {
			VISIBILITY: 'UI.PROPERTY_PANEL.VISIBILITY'
		},
		SIDEBAR: {
			OPEN: 'UI.SIDEBAR.OPEN',
			CLOSE: 'UI.SIDEBAR.CLOSE',
			TOGGLE: 'UI.SIDEBAR.TOGGLE',
			OPEN_PANEL: 'UI.SIDEBAR.OPEN_PANEL'
		},
		INITIATIVE_TRACKER: {
			OPEN: 'UI.INITIATIVE_TRACKER.OPEN',
			CLOSE: 'UI.INITIATIVE_TRACKER.CLOSE',
			TOGGLE: 'UI.INITIATIVE_TRACKER.TOGGLE'
		}
	}
};

// -------------------------------------------------------------
// Action interfaces
// -------------------------------------------------------------

export interface PropertyPanelVisibilityAction extends Action {
	visible: boolean;
}

export interface SidebarOpenAction extends Action {}
export interface SidebarCloseAction extends Action {}
export interface SidebarToggleAction extends Action {}

export interface InitiativeTrackerOpenAction extends Action {}
export interface InitiativeTrackerCloseAction extends Action {}
export interface InitiativeTrackerToggleAction extends Action {}

export interface SidebarOpenPanelAction extends Action {
	panel: OverlayPanelTypes;
}

// -------------------------------------------------------------
// Action creators
// -------------------------------------------------------------

export const setPropertyPanelVisibility = (visible): PropertyPanelVisibilityAction => ({
	type: types.UI.PROPERTY_PANEL.VISIBILITY,
	visible
});

export const openSidebar = (): SidebarOpenAction => ({
	type: types.UI.SIDEBAR.OPEN
});

export const closeSidebar = (): SidebarCloseAction => ({
	type: types.UI.SIDEBAR.CLOSE
});

export const toggleSidebar = (): SidebarToggleAction => ({
	type: types.UI.SIDEBAR.TOGGLE
});

export const openInitiativeTracker = (): InitiativeTrackerOpenAction => ({
	type: types.UI.INITIATIVE_TRACKER.OPEN
});

export const closeInitiativeTracker = (): InitiativeTrackerCloseAction => ({
	type: types.UI.INITIATIVE_TRACKER.CLOSE
});

export const toggleInitiativeTracker = (): InitiativeTrackerToggleAction => ({
	type: types.UI.INITIATIVE_TRACKER.TOGGLE
});

export const openPanel = (panel: OverlayPanelTypes): SidebarOpenPanelAction => ({
	type: types.UI.SIDEBAR.OPEN_PANEL,
	panel
});
