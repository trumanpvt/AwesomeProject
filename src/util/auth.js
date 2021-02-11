import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {webClientId} from '../constants';

export const passwordSignIn = (username, password) => {
  return auth().signInWithEmailAndPassword(username, password);
};

export const signUp = (username, password) => {
  return auth().createUserWithEmailAndPassword(username, password);
};

export const googleSignIn = new Promise(async function (resolve, reject) {
  GoogleSignin.configure({
    webClientId,
  });

  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // console.log(testicle);
    resolve(auth().signInWithCredential(googleCredential));
  } catch (e) {
    let errorMessage;

    if (e.code === statusCodes.SIGN_IN_CANCELLED) {
      errorMessage = 'user cancelled the login flow';
    } else if (e.code === statusCodes.IN_PROGRESS) {
      errorMessage = 'operation (e.g. sign in) is in progress already';
    } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      errorMessage = 'play services not available or outdated';
    } else {
      errorMessage = e;
    }

    reject(errorMessage);
  }
});

export const signOut = () => {
  return auth().signOut();
};
