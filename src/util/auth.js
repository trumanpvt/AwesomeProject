import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk';

import {webClientId} from '../constants';

export const passwordSignIn = (username, password) => {
  return auth().signInWithEmailAndPassword(username, password);
};

export const signUp = (username, password) => {
  return auth()
    .createUserWithEmailAndPassword(username, password)
    .then((res) => {
      console.log('new user', res);
      return sendEmailVerification();
    });
};

export const sendEmailVerification = () => {
  return auth().currentUser.sendEmailVerification();
};

export const sendPasswordResetEmail = (email) => {
  return auth().sendPasswordResetEmail(email);
};

export const signOut = () => {
  // GoogleSignin.signOut();
  return auth().signOut();
};

export const googleSignIn = async () => {
  GoogleSignin.configure({
    webClientId,
  });

  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
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

export const facebookSignIn = async (setCredential) => {
  try {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const {accessToken} = await AccessToken.getCurrentAccessToken();

    if (!accessToken) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      accessToken,
    );
    setCredential(facebookCredential);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const linkWithCredential = (credential) => {
  return auth().currentUser.linkWithCredential(credential);
};

export const getCurrentUser = () => {
  return auth().currentUser;
};

export const reloadCurrentUser = () => {
  return auth().currentUser.reload();
};
