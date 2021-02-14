// import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
// import {AccessToken} from 'react-native-fbsdk';

import {webClientId} from '../constants';

export const passwordSignIn = (email, password) => {
  // return auth().signInWithEmailAndPassword(email, password);
};

export const signUp = (email, password) => {
  // return auth().createUserWithEmailAndPassword(email, password);
};

export const linkPasswordAccount = (password) => {
  // const matchedData = auth().currentUser.providerData.find((item) => {
  //   return item.email;
  // });
  //
  // const credential = auth.EmailAuthProvider.credential(
  //   matchedData.email,
  //   password,
  // );
  //
  // return auth().currentUser.linkWithCredential(credential);
};

export const checkPasswordProvider = () => {
  // return auth().currentUser.providerData.find((item) => {
  //   return item.providerId === 'password';
  // });
};

export const googleSignIn = async () => {
  GoogleSignin.configure({
    webClientId,
  });

  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // return auth().signInWithCredential(googleCredential);
  } catch (e) {
    if (e.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('user cancelled the login flow');
      e.message = 'user cancelled the login flow';
    } else if (e.code === statusCodes.IN_PROGRESS) {
      console.log('operation (e.g. sign in) is in progress already');
      e.message = 'operation (e.g. sign in) is in progress already';
    } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('play services not available or outdated');
      e.message = 'play services not available or outdated';
    } else {
      console.log('googleSignIn error', e);
    }

    return Promise.reject(e);
  }
};

export const signOut = () => {
  // return auth().signOut();
};

export const unlinkAccount = (providerId) => {
  // return auth().currentUser.unlink(providerId);
};
