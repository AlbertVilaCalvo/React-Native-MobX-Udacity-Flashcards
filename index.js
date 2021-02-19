/**
 * @format
 */

import 'react-native-gesture-handler' // https://reactnavigation.org/docs/getting-started
import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { configure } from 'mobx'
import { configurePushNotifications } from './src/utils/notification'

// MobX config - https://mobx.js.org/configuration.html
configure({
  useProxies: 'ifavailable',
})

configurePushNotifications()

AppRegistry.registerComponent(appName, () => App)
