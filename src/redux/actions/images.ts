export const types = {
	IMAGES: {
		SYNC: 'IMAGES.SYNC',
		SYNC_FAILED: 'IMAGES.SYNC_FAILED'
	}
};

export const syncImages = images => ({
	type: types.IMAGES.SYNC,
	images
});

export const syncImagesFailed = error => ({
	type: types.IMAGES.SYNC_FAILED,
	error
});
