export interface Action<T extends string> {
	type: T;
}

export interface ActionWithPayload<T extends string, P> extends Action<T> {
	payload: P;
}

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createAction<T extends string, P>(type: T, payload?: P) {
	return payload === undefined ? { type } : { type, payload };
}
