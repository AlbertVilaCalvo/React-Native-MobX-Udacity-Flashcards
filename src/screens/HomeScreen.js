import React from 'react';
import {SafeAreaView, StatusBar, Text, TouchableOpacity} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Text>Welcome</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('DeckDetail', {deckId: '1'})}>
          <Text>Open Deck Detail</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
