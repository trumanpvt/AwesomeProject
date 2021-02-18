/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Amplify from 'aws-amplify';
import awsExports from './src/aws-exports';
import {urlOpener} from './src/util/auth';
Amplify.configure({
  ...awsExports,
  oauth: {
    ...awsExports.oauth,
    urlOpener,
  },
});
// Amplify.configure(awsExports);

import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
