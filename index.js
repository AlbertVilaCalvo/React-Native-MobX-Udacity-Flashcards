/**
 * @format
 */

import 'react-native-gesture-handler'; // https://reactnavigation.org/docs/getting-started
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
