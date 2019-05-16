/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { OverlayPanelTypes } from '../../models/OverlayPanelTypes';
import { ActionsUnion } from '../types';
import { createAction } from '../actionHelper';

export const UI_PROPERTY_PANEL_VISIBILITY = 'UI.PROPERTY_PANEL.VISIBILITY';
export const UI_SIDEBAR_CLOSE = 'UI.SIDEBAR.CLOSE';
export const UI_SIDEBAR_OPEN = 'UI.SIDEBAR.OPEN';
export const UI_SIDEBAR_TOGGLE = 'UI.SIDEBAR.TOGGLE';
export const UI_SIDEBAR_OPEN_PANEL = 'UI.SIDEBAR.OPEN_PANEL';

export const Actions = {
	setPropertyPanelVisibility: (visible: boolean) =>
		createAction(UI_PROPERTY_PANEL_VISIBILITY, visible),
	openSidebar: () => createAction(UI_SIDEBAR_OPEN),
	closeSidebar: () => createAction(UI_SIDEBAR_CLOSE),
	toggleSidebar: () => createAction(UI_SIDEBAR_TOGGLE),
	openPanel: (panel: OverlayPanelTypes) => createAction(UI_SIDEBAR_OPEN_PANEL, panel)
};

export type Actions = ActionsUnion<typeof Actions>;
