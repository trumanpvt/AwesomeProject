/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

import App from './src/App';
import {name as appName} from './src/app.json';

AppRegistry.registerComponent(appName, () => App);
