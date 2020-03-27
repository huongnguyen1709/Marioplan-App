import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAc1RHb0d9sTy_ntiewPLH7f2k-9EzE84Q",
    authDomain: "marioplan-66b4a.firebaseapp.com",
    databaseURL: "https://marioplan-66b4a.firebaseio.com",
    projectId: "marioplan-66b4a",
    storageBucket: "marioplan-66b4a.appspot.com",
    messagingSenderId: "1002390649563",
    appId: "1:1002390649563:web:d927c93796f8cdf13a2afe",
    measurementId: "G-NDLKJ6V47C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore()

export default firebase