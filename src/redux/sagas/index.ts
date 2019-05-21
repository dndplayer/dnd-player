import { all, fork, take } from 'redux-saga/effects';

import chat from './chat';
import auth from './auth';
import storage from './storage';
import images from './images';
import assets from './assets';
import maps from './maps';
import globalState from './globalState';
import mapPings from './mapPings';
import users from './users';
import initiative from './initiative';

export default function* rootSaga(): any {
	yield all([
		fork(chat),
		fork(auth),
		fork(storage),
		fork(images),
		fork(assets),
		fork(maps),
		fork(globalState),
		fork(mapPings),
		fork(users),
		fork(initiative)
	]);
}
