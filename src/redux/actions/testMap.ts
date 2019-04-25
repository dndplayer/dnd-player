export const types = {
	TESTMAP: {
		SYNC: 'TESTMAP.SYNC',
		SYNC_FAILED: 'TESTMAP.SYNC_FAILED'
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
