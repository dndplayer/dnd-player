const validateMapData = (data: any): boolean => {
	if (!data) {
		return false;
	}

	if (!data.layers || !data.layers.background) {
		return false;
	}

	if (!data.layers.background.children) {
		return false;
	}

	return true;
};

export const parseMap = (data: any) => {
	if (!validateMapData(data)) {
		return;
	}

	Object.keys(data.layers.background.children).forEach((x, idx) => {
		const xx = data.layers.background.children[x];
		console.log(xx);
	});
};
