import firebase from 'firebase/app'
import 'firebase/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAdBGsSdhv8tIODVl0Zkj-2ZPq1JHY8YWQ",
    authDomain: "indus-action-assesment.firebaseapp.com",
    databaseURL: "https://indus-action-assesment-default-rtdb.firebaseio.com",
    projectId: "indus-action-assesment",
    storageBucket: "indus-action-assesment.appspot.com",
    messagingSenderId: "1084372273388",
    appId: "1:1084372273388:web:52e29c1d6ffb43b6df7dc9",
    measurementId: "G-ZG15Q81D0V"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;