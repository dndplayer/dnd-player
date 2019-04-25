export const types = {
	TESTMAP: {
		SYNC: 'TESTMAP.SYNC',
		SYNC_FAILED: 'TESTMAP.SYNC_FAILED',
		UPDATE: {
			POSITION: 'TESTMAP.UPDATE.POSITION'
		}
	}
};

export const syncTestMap = map => ({
	type: types.TESTMAP.SYNC,
	map
});

export const syncTestMapFailed = error => ({
	type: types.TESTMAP.SYNC_FAILED,
	error
});

export const testMapUpdatePosition = ({ layerName, mapObjectId, newPosition }) => ({
	type: types.TESTMAP.UPDATE.POSITION,
	layerName,
	mapObjectId,
	newPosition
});
