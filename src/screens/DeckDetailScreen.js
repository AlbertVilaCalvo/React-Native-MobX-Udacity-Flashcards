import React from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

const DeckDetailScreen = ({route}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Deck</Text>
        <Text>ID: {route.params.deckId}</Text>
      </SafeAreaView>
    </>
  );
};

export default DeckDetailScreen;
