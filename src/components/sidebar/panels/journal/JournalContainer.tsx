import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Journal from './Journal';
import { getCurrentUser } from '../../../../redux/selectors/users';
import { User, Journal as JournalModel } from '../../../../models/User';
import { updatePublicJournal, updatePrivateJournal } from '../../../../redux/actions/users';
// import { getUserJournals } from '../../../../redux/selectors/users';

interface StateProps {
	user: { user: User; firebaseUser: firebase.User };
}
interface DispatchProps {
	updatePrivateJournal: (userId: string, journal: JournalModel) => void;
	updatePublicJournal: (userId: string, journal: JournalModel) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class JournalContainer extends Component<Props> {
	render(): ReactNode {
		const { updatePrivateJournal, updatePublicJournal } = this.props;

		const u = (this.props.user && this.props.user.user) || null;
		if (!u) {
			return <div>Loading...</div>;
		}

		const privateJournal = u.journal && u.journal.private;
		const publicJournal = u.journal && u.journal.public;

		return (
			<Journal
				privateJournal={privateJournal}
				publicJournal={publicJournal}
				updatePrivateJournal={(journal: JournalModel): void =>
					updatePrivateJournal(this.props.user.firebaseUser.uid, journal)
				}
				updatePublicJournal={(journal: JournalModel): void =>
					updatePublicJournal(this.props.user.firebaseUser.uid, journal)
				}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	user: getCurrentUser(state)
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	updatePrivateJournal: (userId: string, journal: JournalModel) =>
		dispatch(updatePrivateJournal(userId, journal)),
	updatePublicJournal: (userId: string, journal: JournalModel) =>
		dispatch(updatePublicJournal(userId, journal))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(JournalContainer);
