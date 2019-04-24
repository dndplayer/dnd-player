import firebase from 'firebase';
// import '@firebase/firestore';
import '@firebase/database';
import ReduxSagaFirebase from 'redux-saga-firebase';

const firebaseConfig = JSON.parse(localStorage.getItem('firebaseConfig'));

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.database();
const rsf = new ReduxSagaFirebase(firebaseApp);

export default rsf;
