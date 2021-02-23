import {Linking} from 'react-native';
import {Auth} from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
// import {useStores} from '../store';

export const passwordSignIn = (email, password) => {
  return Auth.signIn(email, password);
};

export const signUp = (email, password) => {
  return Auth.signUp({
    username: email,
    password,
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
  getCurrentAuthenticatedUser().then((user) => {
    if (user.attributes['custom:g_ac_token']) {
      const revokeUrl =
        'https://accounts.google.com/o/oauth2/revoke?token=' +
        user.attributes['custom:g_ac_token'];
      fetch(revokeUrl).catch((err) => {
        console.log('google revoke err', err);
      });
    }
    // if (user.attributes['custom:fb_ac_token']) {
    // }
  });
  return Auth.signOut();
};

export const forgotPassword = (username) => {
  return Auth.forgotPassword(username);
};

export const forgotPasswordSubmit = (username, code, newPassword) => {
  return Auth.forgotPasswordSubmit(username, code, newPassword);
};

export const updateUserAttributes = (user, attributeList) => {
  return user.updateAttributes(attributeList);
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
