export const types = {
	MAP: {
		ZOOM: {
			IN: 'MAP.ZOOM.IN',
			OUT: 'MAP.ZOOM.OUT'
		}
	}
};

export const zoomIn = () => ({
	type: types.MAP.ZOOM.IN
});

export const zoomOut = () => ({
	type: types.MAP.ZOOM.OUT
});
