import { all, fork, delay } from 'redux-saga/effects';

import rsf from '../rsf';
import { database, auth } from 'firebase';

function* updatePresenceSaga(): any {
	const a = auth(rsf.app);
	while (!a.currentUser) {
		yield delay(500);
	}

	const users = database(rsf.app).ref('/userPresence/' + a.currentUser.uid);
	const online = database(rsf.app).ref('/.info/connected');
	online.on('value', snapshot => {
		if (snapshot.val()) {
			users.onDisconnect().remove();
			users.set(true);
		}
	});
}

export default function* rootSaga() {
	yield all([fork(updatePresenceSaga)]);
}
