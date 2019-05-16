import { types, KeyDownShiftAction, KeyUpShiftAction } from '../actions/keys';

interface State {
	shiftDown: boolean;
}

const initialState: State = {
	shiftDown: false
};

export default function mapPingsReducer(state: State = initialState, action: any = {}): State {
	switch (action.type) {
		case types.KEYS.DOWN.SHIFT: {
			const a = action as KeyDownShiftAction;
			return {
				...state,
				shiftDown: true
			};
		}
		case types.KEYS.UP.SHIFT: {
			const a = action as KeyUpShiftAction;
			return {
				...state,
				shiftDown: false
			};
		}
		default:
			return state;
	}
}
