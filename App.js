/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, ScrollView, View, StatusBar, Text } from 'react-native'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import { Color } from './src/styles/Color'
import { isAndroid } from './src/utils/platform'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import DeckStoreContext from './src/deck/DeckStoreContext'
import deckStore from './src/deck/DeckStore'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import HomeScreen from './src/screens/HomeScreen'
import DeckDetailScreen from './src/screens/DeckDetailScreen'
import NewDeckScreen from './src/screens/NewDeckScreen'
import NewCardScreen from './src/screens/NewCardScreen'
import QuizScreen from './src/screens/QuizScreen'
import HeaderButton from './src/components/styled/HeaderButton'

StatusBar.setBarStyle('dark-content', false)
if (isAndroid) {
  StatusBar.setBackgroundColor(Color.primary, false)
}

const Stack = createStackNavigator()

const App: () => React$Node = () => {
  return (
    <DeckStoreContext.Provider value={deckStore}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerTintColor: 'white',
              headerStyle: { backgroundColor: Color.primary },
            }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation, route }) => ({
                title: 'Flashcards',
                headerRight: () => (
                  <HeaderButton
                    text="New Deck"
                    onPress={() => navigation.navigate('NewDeck')}
                  />
                ),
              })}
            />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen
              name="DeckDetail"
              component={DeckDetailScreen}
              options={({ navigation, route }) => ({
                title: 'Deck Detail',
                headerBackTitle: 'Home',
                headerLeft: (props) => (
                  <HeaderBackButton
                    {...props}
                    onPress={() => {
                      // If we've just created the deck, on back press we want to go
                      // to the Home without seeing the NewDeckScreen in between
                      navigation.navigate('Home')
                    }}
                  />
                ),
              })}
            />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen
              name="NewDeck"
              component={NewDeckScreen}
              options={{ title: 'Create New Deck', headerBackTitle: 'Home' }}
            />
            <Stack.Screen
              name="NewCard"
              component={NewCardScreen}
              options={{ title: 'Add Card' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </DeckStoreContext.Provider>
  )
}

const WelcomeScreen = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <Header />
      {global.HermesInternal == null ? null : (
        <View style={styles.engine}>
          <Text style={styles.footer}>Engine: Hermes</Text>
        </View>
      )}
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Step One</Text>
          <Text style={styles.sectionDescription}>
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>See Your Changes</Text>
          <Text style={styles.sectionDescription}>
            <ReloadInstructions />
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Debug</Text>
          <Text style={styles.sectionDescription}>
            <DebugInstructions />
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Learn More</Text>
          <Text style={styles.sectionDescription}>
            Read the docs to discover what to do next:
          </Text>
        </View>
        <LearnMoreLinks />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})

export default App
