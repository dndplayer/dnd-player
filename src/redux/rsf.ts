import firebase from 'firebase';
import '@firebase/database';
import ReduxSagaFirebase from 'redux-saga-firebase';

const firebaseConfig = JSON.parse(localStorage.getItem('firebaseConfig'));

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.database();
const rsf = new ReduxSagaFirebase(firebaseApp);

export default rsf;
