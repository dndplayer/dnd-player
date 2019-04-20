export const types = {
	ASSETS: {
		SYNC: 'ASSETS.SYNC',
		SYNC_FAILED: 'ASSETS.SYNC_FAILED'
	}
};

export const syncAssets = assets => ({
	type: types.ASSETS.SYNC,
	assets
});

export const syncAssetsFailed = error => ({
	type: types.ASSETS.SYNC_FAILED,
	error
});
