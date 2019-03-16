import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import config from './config';

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseRaces = firebaseDB.ref('races');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseRiders = firebaseDB.ref('riders');

export { firebase, firebaseRaces, firebasePromotions, firebaseRiders, firebaseDB };
