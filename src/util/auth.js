import {Linking} from 'react-native';
import {Auth} from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {CognitoUser} from 'amazon-cognito-identity-js';
// import {useStores} from '../store';

export const passwordSignIn = (email, password) => {
  return Auth.signIn(email, password);
};

export const signUp = (email, password, username) => {
  return Auth.signUp({
    username: email,
    password,
    attributes: {
      nickname: username,
    },
  });
};

export const confirmSignUp = (email, code) => {
  return Auth.confirmSignUp(email, code);
};

export const resendConfirmationCode = (email) => {
  return Auth.resendSignUp(email);
};

export const getCurrentAuthenticatedUser = () => {
  return Auth.currentAuthenticatedUser();
};

export const socialSignIn = (provider) => {
  return Auth.federatedSignIn({provider});
};

export const signOut = () => {
  return Auth.signOut();
};

export const createNewPassword = async (newPassword) => {
  const user = await Auth.currentAuthenticatedUser();
  console.log('createNewPassword user', user);
  user.getSignInUserSession();
  // user.getSignInUserSession();
  // return user.completeNewPasswordChallenge(
  //   newPassword,
  //   {},
  //   {
  //     onSuccess: function (result) {
  //       console.log('completeNewPasswordChallenge success', result);
  //     },
  //     onFailure: function (error) {
  //       console.error('completeNewPasswordChallenge error', error.message);
  //     },
  //   },
  // );

  console.log('getSession user', user);
  return Auth.completeNewPassword(user, newPassword);
};

export const urlOpener = async (url, redirectUrl) => {
  await InAppBrowser.isAvailable();
  const {type, url: newUrl} = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (type === 'success') {
    const fixedUrl = newUrl.replace('///', '//');
    console.log('fixedUrl', fixedUrl);
    Linking.openURL(fixedUrl)
      .then(() => {
        handleEventLinkedExternalUser(fixedUrl);
      })
      .catch((e) => {
        console.log('Linking.openURL error', e);
      });
  }
};

export const handleEventLinkedExternalUser = (eventUrl) => {
  const provider = eventUrl.split('Prov')[1];
  if (provider) {
    return Auth.federatedSignIn({provider});
  }
};
