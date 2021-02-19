import {Linking} from 'react-native';
import {Auth} from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';

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

export const urlOpener = async (url, redirectUrl) => {
  await InAppBrowser.isAvailable();
  const {type, url: newUrl} = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
    headers: {
      'my-custom-header': 'my custom header value',
    },
  });

  if (type === 'success') {
    const splitUrl = `myapp://?${newUrl.split('#_=_')[0].split('?')[1] || ''}`;
    Linking.openURL(splitUrl).catch((e) => {
      console.log('Linking.openURL error', e);
    });
  }
};
