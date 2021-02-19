import PushNotification from 'react-native-push-notification'
import { Platform } from 'react-native'

// Docs: https://github.com/zo0r/react-native-push-notification

const ANDROID_CHANNEL_ID_DAILY_REMINDER = 'udacity-flashcards-daily-reminder'

export function configurePushNotifications() {
  configure()
  createChannel()
}

function configure() {
  console.log('PushNotification.configure')
  PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification)

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action)
      console.log('NOTIFICATION:', notification)

      // process the action
    },

    // Should the initial notification be popped automatically - default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: Platform.OS === 'ios',
  })
}

function createChannel() {
  PushNotification.getChannels(function (channel_ids) {
    console.log('channel_ids', channel_ids) // ['channel_id_1']
    if (!channel_ids.includes(ANDROID_CHANNEL_ID_DAILY_REMINDER)) {
      console.log('PushNotification.createChannel')
      PushNotification.createChannel(
        {
          channelId: ANDROID_CHANNEL_ID_DAILY_REMINDER, // (required)
          channelName: 'Daily reminder', // (required)
          channelDescription: 'A daily study reminder', // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) =>
          console.log(`PushNotification.createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      )
    }
  })
}

export function showNotification() {
  console.log('showNotification()')
  PushNotification.localNotification({
    channelId: ANDROID_CHANNEL_ID_DAILY_REMINDER,
    bigText: 'hola!',
  })
}
