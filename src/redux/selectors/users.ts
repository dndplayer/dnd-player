import { createSelector } from 'reselect';
import { AppState } from '../reducers';
import { User } from '../../models/User';

const users = (state: AppState) => state.users.users;
const currentUser = (state: AppState) => state.auth.user;

export const getAllUsers = createSelector(
	users,
	(users: any) =>
		Object.keys(users).map(x => ({
			id: x,
			...users[x]
		}))
);

export const getCurrentUser = createSelector(
	users,
	currentUser,
	(users: any, currentUser: firebase.User): { user: User; firebaseUser: firebase.User } => {
		return {
			user: users && currentUser ? users[currentUser.uid] : null,
			firebaseUser: currentUser
		};
	}
);

export const getUserColour = createSelector(
	users,
	currentUser,
	(users: any, currentUser: firebase.User) => {
		if (!currentUser) {
			return 0xff0000;
		}

		const u = users[currentUser.uid];
		if (u) {
			return u.colour || 0xff0000;
		}
	}
);

// export const getUserJournals = createSelector(
// 	users,
// 	currentUser,
// 	(users: any, currentUser: firebase.User) => {
// 		if (!currentUser) {
// 			return null;
// 		}

// 		const u = users[currentUser.uid];
// 		return u
// 			? {
// 					private: u.privateJournal,
// 					public: u.publicJournal
// 			  }
// 			: null;
// 	}
// );
