import { types } from '../actions/map';

const initialState = {
	zoom: 1
};

export default function mapReducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case types.MAP.ZOOM.IN:
			return {
				...state,
				zoom: state.zoom *= 1.2
			};
		case types.MAP.ZOOM.OUT:
			return {
				...state,
				zoom: state.zoom *= 0.8
			};
		default:
			return state;
	}
}
