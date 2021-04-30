import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';

import {webClientId} from '../constants';

export const passwordSignIn = (username: string, password: string) => {
  return auth().signInWithEmailAndPassword(username, password);
};

export const signUp = (username: string, password: string) => {
  return auth()
    .createUserWithEmailAndPassword(username, password)
    .then(() => {
      return sendEmailVerification();
    });
};

export const sendEmailVerification = () => {
  return auth().currentUser?.sendEmailVerification();
};

export const sendPasswordResetEmail = (email: string) => {
  return auth().sendPasswordResetEmail(email);
};

export const signOut = () => {
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
      e.message = 'user cancelled the login flow';
    } else if (e.code === statusCodes.IN_PROGRESS) {
      e.message = 'operation (e.g. sign in) is in progress already';
    } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      e.message = 'play services not available or outdated';
    }

    return Promise.reject(e);
  }
};

export const facebookSignIn = async (setCredential: {
  (credential: FirebaseAuthTypes.AuthCredential): void;
}) => {
  try {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      // throw 'User cancelled the login process';
      return Promise.reject('User cancelled the login process');
    }

    // Once signed in, get the users AccessToken
    const {accessToken} = await AccessToken.getCurrentAccessToken();

    if (!accessToken) {
      // throw 'Something went wrong obtaining access token';
      return Promise.reject('Something went wrong obtaining access token');
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

export const linkWithCredential = (
  credential: FirebaseAuthTypes.AuthCredential | null,
) => {
  return credential && auth().currentUser?.linkWithCredential(credential);
};

export const getCurrentUser = () => {
  return auth().currentUser;
};

export const reloadCurrentUser = () => {
  return auth().currentUser?.reload();
};
