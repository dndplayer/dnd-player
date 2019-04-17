import { all, fork } from 'redux-saga/effects';

import chat from './chat';
import auth from './auth';
import storage from './storage';
import images from './images';

export default function* rootSaga(): any {
	yield all([fork(chat), fork(auth), fork(storage), fork(images)]);
}
