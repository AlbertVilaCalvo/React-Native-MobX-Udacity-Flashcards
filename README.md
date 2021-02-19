# Udacity Flashcards

React Native project of the [Udacity React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019).

The app allows you to create decks with questions and answers of topics you want to learn about.

It sends you a notification every day to remind you to refresh your knowledge.

The app uses MobX for state management. Data is persisted on the device with AsyncStorage.

This project was created with `npx react-native init UdacityFlashcards`.


## Start bundler

`npx react-native start`


## Run instructions for iOS

`npx react-native run-ios`

or
- Open UdacityFlashcards/ios/UdacityFlashcards.xcworkspace in Xcode or run "xed -b ios"
- Hit the Run button


## Run instructions for Android

- Have an Android emulator running (quickest way to get started), or a device connected.
- `npx react-native run-android`


## Launch Android emulator

`${ANDROID_HOME}/emulator/emulator -avd Galaxy_Nexus_API_22_5.1_xhdpi_-_Google_APIs &`

Use `emulator -list-avds` to list the existing emulators.


## Reload code

- Android: double tap R on your keyboard.

- iOS: press Cmd + R in the simulator.


## Open debug menu

- Android: Press Cmd or Ctrl + M or shake your device.

- iOS: Press Cmd + D or shake your device (Cmd + Ctrl + Z).
