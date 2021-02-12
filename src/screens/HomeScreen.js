import React from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import CustomStatusBar from '../components/CustomStatusBar'

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <CustomStatusBar />
      <SafeAreaView>
        <Text>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Text>Welcome</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DeckDetail', { deckId: '1' })}>
          <Text>Open Deck Detail</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}

export default HomeScreen
