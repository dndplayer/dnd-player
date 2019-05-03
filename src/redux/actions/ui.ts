import { Action } from 'redux';

export const types = {
	UI: {
		PROPERTY_PANEL: {
			VISIBILITY: 'UI.PROPERTY_PANEL.VISIBILITY'
		}
	}
};

// -------------------------------------------------------------
// Action interfaces
// -------------------------------------------------------------

export interface PropertyPanelVisibilityAction extends Action {
	visible: boolean;
}

// -------------------------------------------------------------
// Action creators
// -------------------------------------------------------------

export const setPropertyPanelVisibility = (visible): PropertyPanelVisibilityAction => ({
	type: types.UI.PROPERTY_PANEL.VISIBILITY,
	visible
});
