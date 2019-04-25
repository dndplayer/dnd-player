import { all, fork } from 'redux-saga/effects';

import chat from './chat';
import auth from './auth';
import storage from './storage';
import images from './images';
import assets from './assets';
import testMap from './testMap';

export default function* rootSaga(): any {
	yield all([fork(chat), fork(auth), fork(storage), fork(images), fork(assets), fork(testMap)]);
}
