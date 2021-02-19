import * as Notifications from 'expo-notifications'
import { isAndroid, isiOS } from './platform'

// Expo Notifications docs:
// https://docs.expo.io/versions/latest/sdk/notifications
// https://github.com/expo/expo/tree/master/packages/expo-notifications

const CHANNEL_ID = 'udacity-flashcards-daily'

export async function setupNotifications() {
  if (isAndroid) {
    await createAndroidNotificationChannel()
  }

  if (isiOS) {
    await requestPermission()
  }

  // https://github.com/expo/fyi/blob/master/presenting-notifications-deprecated.md
  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }
    },
  })

  Notifications.getAllScheduledNotificationsAsync().then((notification) =>
    console.log('getAllScheduledNotificationsAsync', notification),
  )
}

async function createAndroidNotificationChannel() {
  const channels = await Notifications.getNotificationChannelsAsync()
  console.log('Notification channels', channels)
  const channelAlreadyCreated = channels.some((ch) => ch.id === CHANNEL_ID)
  console.log(
    `Notification channel ${CHANNEL_ID} already created:`,
    channelAlreadyCreated,
  )

  if (!channelAlreadyCreated) {
    // Create the notification channel
    console.log(`Creating channel with ID ${CHANNEL_ID}`)
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Daily notifications',
      importance: Notifications.AndroidImportance.HIGH,
    })
  }
}

async function requestPermission() {
  console.log('requestPermission()')
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!')
  }
  console.log('requestPermission() finalStatus:', finalStatus)
}

const ONE_DAY_IN_SECONDS = 60 * 60 * 24 // (60 s / 1 min) * (60 min / 1h) * (24 h / 1 day)

/**
 * Cancel all scheduled notifications and schedule a new one for the next day at
 * the current time.
 * @returns {Promise<void>}
 */
export async function scheduleNotification() {
  console.log('scheduleNotification()')
  await Notifications.cancelAllScheduledNotificationsAsync()
  return Notifications.scheduleNotificationAsync({
    content: {
      title: "It's time to refresh your knowledge! 🧠",
      body: 'Learn! Learn! Learn!',
    },
    // https://docs.expo.io/versions/latest/sdk/notifications/#notificationtriggerinput
    trigger: {
      seconds: ONE_DAY_IN_SECONDS,
      channelId: CHANNEL_ID,
      repeats: false,
    },
  }).then((response) => console.log('scheduleNotificationAsync', response))
}
