import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import CustomStatusBar from '../components/CustomStatusBar';

const DeckDetailScreen = ({route}) => {
  return (
    <>
      <CustomStatusBar />
      <SafeAreaView>
        <Text>Deck</Text>
        <Text>ID: {route.params.deckId}</Text>
      </SafeAreaView>
    </>
  );
};

export default DeckDetailScreen;
