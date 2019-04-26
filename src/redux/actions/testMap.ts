export const types = {
	TESTMAP: {
		SYNC: 'TESTMAP.SYNC',
		SYNC_FAILED: 'TESTMAP.SYNC_FAILED',
		UPDATE: {
			OBJECT: 'TESTMAP.UPDATE.OBJECT'
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

export const testMapUpdateObject = ({ layerName, mapObjectId, newData }) => ({
	type: types.TESTMAP.UPDATE.OBJECT,
	layerName,
	mapObjectId,
	newData
});
