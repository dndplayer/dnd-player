import { Asset } from '../../models/Asset';

export const types = {
	ASSETS: {
		SYNC: 'ASSETS.SYNC',
		SYNC_FAILED: 'ASSETS.SYNC_FAILED',
		NEW: {
			SAVE: 'ASSETS.NEW.SAVE'
		}
	}
};

export const saveNewAsset = (asset: Asset) => ({
	type: types.ASSETS.NEW.SAVE,
	asset
});

export const syncAssets = assets => ({
	type: types.ASSETS.SYNC,
	assets
});

export const syncAssetsFailed = error => ({
	type: types.ASSETS.SYNC_FAILED,
	error
});
