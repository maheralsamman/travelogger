import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from './secrets';
import { store } from "./redux/store";
import { setUser } from "./redux/userSlice"

firebase.initializeApp(firebaseConfig);

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/signedIn',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    }
};

firebase.auth().onAuthStateChanged(user => {
    store.dispatch(setUser(user));
});

export default { client: firebase, uiConfig };