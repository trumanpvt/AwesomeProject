import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {webClientId} from '../constants';

export const passwordSignIn = (username, password) => {
  return auth().signInWithEmailAndPassword(username, password);
};

export const signUp = (username, password) => {
  return auth().createUserWithEmailAndPassword(username, password);
};

export const googleSignIn = async () => {
  GoogleSignin.configure({
    webClientId,
  });

  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // console.log(testicle);
    return auth().signInWithCredential(googleCredential);
  } catch (e) {
    console.log('error!!!')
    // return throw new Error('test error');

    if (e.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('user cancelled the login flow');
    } else if (e.code === statusCodes.IN_PROGRESS) {
      console.log('operation (e.g. sign in) is in progress already');
    } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('play services not available or outdated');
    } else {
      console.log('login failed:', e);
    }
  }
};

// const authProviderSignInError = new Promise(function(resolve, reject) {
//
//   reject(e) {
//
//   }
// });

export const signOut = () => {
  return auth().signOut();
};
