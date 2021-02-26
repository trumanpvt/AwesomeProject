import auth from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {AccessToken} from 'react-native-fbsdk';

import {webClientId} from '../constants';

// import {useStores} from '../store';

export const passwordSignIn = (username, password) => {
  return auth().signInWithEmailAndPassword(username, password);
};

export const signUp = (username, password) => {
  return auth()
    .createUserWithEmailAndPassword(username, password)
    .then((res) => {
      console.log('new user', res);
      return res.user.sendEmailVerification();
    });
};

export const linkPasswordAccount = (password) => {
  const matchedData = auth().currentUser.providerData.find((item) => {
    return item.email;
  });

  const credential = auth.EmailAuthProvider.credential(
    matchedData.email,
    password,
  );

  return auth().currentUser.linkWithCredential(credential);
};

export const checkPasswordProvider = () => {
  return auth().currentUser.providerData.find((item) => {
    return item.providerId === 'password';
  });
};

export const confirmSignUp = (email, code) => {
  // return Auth.confirmSignUp(email, code);
};

export const resendConfirmationCode = (email) => {
  // return Auth.resendSignUp(email);
};

export const getCurrentAuthenticatedUser = () => {
  // return Auth.currentAuthenticatedUser();
};

export const socialSignIn = (provider) => {
  // return Auth.federatedSignIn({provider});
};

export const signOut = () => {
  return auth().signOut();
};

export const forgotPassword = (username) => {
  // return Auth.forgotPassword(username);
};

export const forgotPasswordSubmit = (username, code, newPassword) => {
  // return Auth.forgotPasswordSubmit(username, code, newPassword);
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

export const facebookSignIn = (error, result) => {
  if (error) {
    console.log('login has error: ' + result.error);
    return Promise.reject(result.error);
  } else if (result.isCancelled) {
    console.log('login is cancelled.');
    return Promise.reject(result.error);
  } else {
    AccessToken.getCurrentAccessToken().then((data) => {
      auth().signInWithCredential(data.accessToken);
    });
  }
};

export const unlinkAccount = (providerId) => {
  return auth().currentUser.unlink(providerId);
};
